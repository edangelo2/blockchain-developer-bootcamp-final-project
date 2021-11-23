const DAudit = artifacts.require("./DAudit.sol");
const AuditAssignments = artifacts.require("./AuditAssignments.sol");
const AuditEnrollments = artifacts.require("./AuditEnrollments.sol");
const AuditItem = artifacts.require("./AuditItem.sol");
const AuditResult = artifacts.require("./AuditResult.sol");

/* 
* Test Cases for uploading the audit results and paying to auditors 
*/
contract("DAudit Results", function (accounts) {

  const [contractOwner,auditor1Addr,auditor2Addr, auditor3Addr, auditor4Addr ] = accounts;

  beforeEach( async()=>{
    auditAssignments = await AuditAssignments.new();
    auditEnrollments = await AuditEnrollments.new();
    dAudit = await DAudit.new(auditEnrollments.address,auditAssignments.address);
    auditItem = await AuditItem.new(dAudit.address);
    auditResult = await AuditResult.new(dAudit.address);

  });

  it("Create two Audit Items Results and Pay auditors", async function () {

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
    const tx3 = await auditEnrollments.insertAuditEnrollment(AItem1,auditorsEnrolled2,{value:payFeeStr})
    let AuditData1 = await auditEnrollments.getAuditEnrollment(AItem1)
    const tx4 = await auditEnrollments.insertAuditEnrollment(AItem2,auditorsEnrolled1, {value:payFeeStr})
    let AuditData2 = await auditEnrollments.getAuditEnrollment(AItem2)
    console.log('Assign auditors for Audit Item 1: ')
    const tx5 = await dAudit.assignAuditors(AItem1, { value: 0 })
    console.log('Auditors assigned for Audit Item 1 ')
    let AuditData1Assigned = await auditAssignments.getAuditAssignment(AItem1)
    console.log(AD2JSON(AuditData1Assigned))

        /* Create two Audit Results */
        console.log('/* Create two Audit Results */')    
        tx8 = await auditResult.createToken("https://www.mytokenlocation.com", {from: auditor1Addr}) 
        tx9 = await auditResult.createToken("https://www.mytokenlocation2.com", {from: auditor2Addr})
    
        // The create token function emits a Transfer Event returned in the rec
        console.log('/* Audit Results */')
        idTokenResult1 = tx8.logs[0].args.tokenId.toNumber();
        console.log('idTokenResult1: ',idTokenResult1)
        idTokenResult2 = tx9.logs[0].args.tokenId.toNumber();
        console.log('idTokenResult2: ', idTokenResult2)
    
        /* Submit audit results with auditors signers of results 1 and 2*/
        console.log('/* Submit Audit Results - Auditor 1 */')
        const tx10 = await dAudit.createAuditResult(auditResult.address, AItem1, idTokenResult1, 0, {from : auditor1Addr});
        
        assert.isTrue(tx10.logs.length > 0, "Emit at least one event");
        assert.equal("AuditResultCreated", tx10.logs[0].event);
        assert.equal('1', tx10.logs[0].args.tokenIdResult.toString());

        console.log('/* Submit Audit Results - Auditor 2 */')
        const tx11 = await dAudit.createAuditResult(auditResult.address, AItem1, idTokenResult2, 0, {from : auditor2Addr});
        
        assert.isTrue(tx11.logs.length > 0, "Emit at least one event");
        assert.equal("AuditResultCreated", tx11.logs[0].event);
        assert.equal('2', tx11.logs[0].args.tokenIdResult.toString());

        previousBalance = await web3.eth.getBalance(accounts[0]);
        // Pay auditors with the smart contract owner, should run successfully
        console.log('/* Pay auditors with the smart contract owner */')
        txPay = await dAudit.payAuditors(AItem1 , {
           from: contractOwner,
           value: 0
         });

         
        currentBalance = await web3.eth.getBalance(accounts[0]);
        
        console.log('Previous Balance Wei',previousBalance)
        console.log('Previous Balance Eth',web3.utils.fromWei(previousBalance))
        console.log('Current Balance Wei', currentBalance)
        console.log('Current Balance Eth', web3.utils.fromWei(currentBalance))

        
        // After paying the auditors the balance of the SmartContract must be lower
        assert.isTrue(previousBalance > currentBalance, "The current balance must be lower than previous balance")
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

