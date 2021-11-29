const DAudit = artifacts.require("./DAudit.sol");
const AuditAssignments = artifacts.require("./AuditAssignments.sol");
const AuditEnrollments = artifacts.require("./AuditEnrollments.sol");
const AuditItem = artifacts.require("./AuditItem.sol");
/* 
* Main test cases of Descentralized Audits
* Deployment, Creatio of Audit Items, Errolling Auditors, Assigning Auditors
*/
contract("DAudit", function (accounts) {
  const [contractOwner,auditor1Addr,auditor2Addr, auditor3Addr, auditor4Addr ] = accounts;
  
  beforeEach( async()=>{
    auditAssignments = await AuditAssignments.new();
    auditEnrollments = await AuditEnrollments.new();
    dAudit = await DAudit.new(auditEnrollments.address,auditAssignments.address);
    auditItem = await AuditItem.new(dAudit.address);
    
  });

  it("Should get Listing Fee ", async function () { 

    let listingFee = await dAudit.getListingFee.call();
    console.log('Listing Fee= ');
    console.log(web3.utils.fromWei(listingFee));
    
    console.log('Listing AuditFee= ');
    let auditFee = web3.utils.toWei('0.01','ether');
    console.log(web3.utils.fromWei(auditFee))    
    
    let payFee = web3.utils.toBN(auditFee).add(listingFee);
    console.log('Pay Fee= ');
    console.log(web3.utils.fromWei(payFee)); 
    
    assert.equal("0.002", web3.utils.fromWei(listingFee));
  })

  it("Should Mint two Audit Items ", async function () { 

    let listingFee = await dAudit.getListingFee.call();
    let auditFee = web3.utils.toWei('0.01','ether');
    let payFee = web3.utils.toBN(auditFee).add(listingFee);
    payFeeStr = payFee.toString()

    /* Create two tokens representing the Audit Items (documents to audit) */
    const trxT1 = await auditItem.createToken("https://www.mytokenlocation.com")
    const trxT2 = await auditItem.createToken("https://www.mytokenlocation2.com")
    
    assert.isTrue(trxT1.logs.length > 0, "Emit at least one event");
    assert.equal("Transfer", trxT1.logs[0].event);
    assert.equal('1', trxT1.logs[0].args.tokenId.toString());

    assert.isTrue(trxT2.logs.length > 0, "Emit at least one event");
    assert.equal("Transfer", trxT2.logs[0].event);
    assert.equal('2', trxT2.logs[0].args.tokenId.toString());

    // console.log('Audit Items minted successfully');
  })

  it("Should Create Two Audit items with minted NFTs", async function () { 

    let listingFee = await dAudit.getListingFee.call();
    let auditFee = web3.utils.toWei('0.01','ether');
    let payFee = web3.utils.toBN(auditFee).add(listingFee);
    payFeeStr = payFee.toString()

    /* Create two tokens representing the Audit Items (documents to audit) */
    const trxT1 = await auditItem.createToken("https://www.mytokenlocation.com")
    const trxT2 = await auditItem.createToken("https://www.mytokenlocation2.com")
    
    // console.log('Audit Items minted successfully');

    /* Submits two Audit Items for auditing */
    const trxAItem1 = await dAudit.createAuditItem(auditItem.address, 1, auditFee, 3, { value: payFeeStr })
    const trxAItem2 =await dAudit.createAuditItem(auditItem.address, 2, auditFee, 3, { value: payFeeStr })  
 
    // console.log('Audit Items created successfully');

    assert.isTrue(trxAItem1.logs.length > 0, "Emit at least one event");
    assert.equal("AuditItemCreated", trxAItem1.logs[0].event);
    assert.equal('1', trxAItem1.logs[0].args.tokenId.toString());

    assert.isTrue(trxAItem2.logs.length > 0, "Emit at least one event");
    assert.equal("AuditItemCreated", trxAItem2.logs[0].event);
    assert.equal('2', trxAItem2.logs[0].args.tokenId.toString());

  })

  it("Should retrive pending items", async function () { 

    let listingFee = await dAudit.getListingFee.call();
    let auditFee = web3.utils.toWei('0.01','ether');
    let payFee = web3.utils.toBN(auditFee).add(listingFee);
    payFeeStr = payFee.toString()

    /* Create two tokens representing the Audit Items (documents to audit) */
    const trxT1 = await auditItem.createToken("https://www.mytokenlocation.com")
    const trxT2 = await auditItem.createToken("https://www.mytokenlocation2.com")
    
    // console.log('Audit Items minted successfully');

    /* Submits two Audit Items for auditing */
    const trxAItem1 = await dAudit.createAuditItem(auditItem.address, 1, auditFee, 3, { value: payFeeStr })
    const trxAItem2 =await dAudit.createAuditItem(auditItem.address, 2, auditFee, 3, { value: payFeeStr })  
 
    // console.log('Audit Items created successfully');

    /* Query and return the audit items in pending status */
    let items = await dAudit.fetchPendingAudits()
    items = await Promise.all(items.map(async i => {
        const tokenUri = await auditItem.tokenURI(i.tokenId)
        let item = {
          price: i.auditFee.toString(),
          tokenId: i.tokenId.toString(),
          seller: i.producer,
          owner: i.owner,
          tokenUri
        }
        return item
      }))
    console.log('List of pending Audit Items');
    console.log('items: ', items)

    assert.equal(2,items.length);

  })

    it("Should enroll Auditors", async function () {

      let listingFee = await dAudit.getListingFee.call();
      let auditFee = web3.utils.toWei('0.01','ether');
      let payFee = web3.utils.toBN(auditFee).add(listingFee);
      payFeeStr = payFee.toString()
      const trxT1 = await auditItem.createToken("https://www.mytokenlocation.com")
      const trxT2 = await auditItem.createToken("https://www.mytokenlocation2.com")
      
      // The create token function emits a Transfer Event returning the tokenId
      // for the NFT representing the Audit Item
      let AItem1 = trxT1.logs[0].args.tokenId.toNumber();
      let AItem2 = trxT2.logs[0].args.tokenId.toNumber();

      /* Submits two Audit Items for auditing */
      tx1 = await dAudit.createAuditItem(auditItem.address, AItem1, auditFee, 2, { value: payFeeStr })
      tx2 = await dAudit.createAuditItem(auditItem.address, AItem2, auditFee, 3, { value: payFeeStr })
  
    // Enroll Auditors
    // Enrollment pay no fees, just gas
    payFeeStr = '0'

    // Gets the list of addresses and creates enrollment arrays for the two items submitted for auditing
    const auditorsEnrolled1 = new Array(auditor2Addr, auditor3Addr, auditor4Addr);
    const auditorsEnrolled2 = new Array(auditor1Addr, auditor2Addr);

    /* Add Auditors Enrollments  for Audit Item 1*/
    // console.log('Enrolling Auditors for Audit Item 1')
    const tx3 = await auditEnrollments.insertAuditEnrollment(AItem1,auditorsEnrolled1,{value:payFeeStr})
    
    assert.isTrue(tx3.logs.length > 0, "Emit at least one event");
    assert.equal("LogNewAuditEnrollment", tx3.logs[0].event);
    assert.equal(AItem1.toString(), tx3.logs[0].args.auditId.toString());

    
    /* Get Auditors enrolled for Audit Item 1 */
    console.log('List of auditors enrolled for Audit Item 1: ')
    let AuditData1 = await auditEnrollments.getAuditEnrollment(AItem1)
    console.log(AD2JSON(AuditData1))

    /* Add Auditors Enrollments  for Audit Item 2*/
    // console.log('Enrolling Auditors for Audit Item 2')
    const tx4 = await auditEnrollments.insertAuditEnrollment(AItem2,auditorsEnrolled2, {value:payFeeStr})

    assert.isTrue(tx4.logs.length > 0, "Emit at least one event");
    assert.equal("LogNewAuditEnrollment", tx4.logs[0].event);
    assert.equal(AItem2.toString(), tx4.logs[0].args.auditId.toString());

    /* Get Auditors enrolled for Audit Item 2 */
    console.log('List of Auditors enrolled for Audit Item 2: ')
    let AuditData2 = await auditEnrollments.getAuditEnrollment(AItem2)
    console.log(AD2JSON(AuditData2))

    })

    it("Should assign Auditors", async function () {

      let listingFee = await dAudit.getListingFee.call();
      let auditFee = web3.utils.toWei('0.01','ether');
      let payFee = web3.utils.toBN(auditFee).add(listingFee);
      payFeeStr = payFee.toString()
      const trxT1 = await auditItem.createToken("https://www.mytokenlocation.com")
      const trxT2 = await auditItem.createToken("https://www.mytokenlocation2.com")
      let AItem1 = trxT1.logs[0].args.tokenId.toNumber();
      let AItem2 = trxT2.logs[0].args.tokenId.toNumber();
      tx1 = await dAudit.createAuditItem(auditItem.address, AItem1, auditFee, 2, { value: payFeeStr })
      tx2 = await dAudit.createAuditItem(auditItem.address, AItem2, auditFee, 3, { value: payFeeStr })
      payFeeStr = '0'
      const auditorsEnrolled1 = new Array(auditor2Addr, auditor3Addr, auditor4Addr);
      const auditorsEnrolled2 = new Array(auditor1Addr, auditor2Addr);
      const tx3 = await auditEnrollments.insertAuditEnrollment(AItem1,auditorsEnrolled1,{value:payFeeStr})
      let AuditData1 = await auditEnrollments.getAuditEnrollment(AItem1)
      const tx4 = await auditEnrollments.insertAuditEnrollment(AItem2,auditorsEnrolled2, {value:payFeeStr})
      let AuditData2 = await auditEnrollments.getAuditEnrollment(AItem2)

      /* Assign Auditors for Audit Item 1 */
      // console.log('Assign auditors for Audit Item 1: ')
      const tx5 = await dAudit.assignAuditors(AItem1, { value: 0 })

      /* Get Auditors assigned for Audit Item 1 */
      console.log('Auditors assigned for Audit Item 1 ')
      let AuditData1Assigned = await auditAssignments.getAuditAssignment(AItem1)
      assignedAuditors = AuditData1Assigned.auditors
      console.log(AD2JSON(AuditData1Assigned)) 

      assert.isTrue(assignedAuditors.length > 0, "Assigned at least one auditor");
      
    })

    it("Should not assign Auditors if it is not the owner", async function () {
      let listingFee = await dAudit.getListingFee.call();
      let auditFee = web3.utils.toWei('0.01','ether');
      let payFee = web3.utils.toBN(auditFee).add(listingFee);
      payFeeStr = payFee.toString()
      const trxT1 = await auditItem.createToken("https://www.mytokenlocation.com")
      const trxT2 = await auditItem.createToken("https://www.mytokenlocation2.com")
      let AItem1 = trxT1.logs[0].args.tokenId.toNumber();
      let AItem2 = trxT2.logs[0].args.tokenId.toNumber();
      tx1 = await dAudit.createAuditItem(auditItem.address, AItem1, auditFee, 2, { value: payFeeStr })
      tx2 = await dAudit.createAuditItem(auditItem.address, AItem2, auditFee, 3, { value: payFeeStr })
      payFeeStr = '0'
      const auditorsEnrolled1 = new Array(auditor2Addr, auditor3Addr, auditor4Addr);
      const auditorsEnrolled2 = new Array(auditor1Addr, auditor2Addr);
      const tx3 = await auditEnrollments.insertAuditEnrollment(AItem1,auditorsEnrolled1,{value:payFeeStr})
      let AuditData1 = await auditEnrollments.getAuditEnrollment(AItem1)
      const tx4 = await auditEnrollments.insertAuditEnrollment(AItem2,auditorsEnrolled2, {value:payFeeStr})
      let AuditData2 = await auditEnrollments.getAuditEnrollment(AItem2)

      try {
        const tx5 = await dAudit.assignAuditors(AItem1, {from : auditor2Addr})
        assert.fail("Must fail");
      }
      catch (error) {
        checkErrorType(error.data, 'revert', 'Ownable: caller is not the owner');
      }
    })

})

// Transform Audit Data to JSON object 
function AD2JSON (AuditData1) {
  return  {
    index: AuditData1.index.toString(),
    auditId: AuditData1.auditId.toString(),
    auditors: AuditData1.auditors
  }
}


// Helper function to check error reasons
//
function checkErrorType(data, error, reason) {
  for (var n in data) {
    if (n.startsWith('0x')) {
      var errorInfo = data[n];
      assert.equal(error, errorInfo.error);
      assert.equal(reason, errorInfo.reason);
      return;
    }
  }
}
