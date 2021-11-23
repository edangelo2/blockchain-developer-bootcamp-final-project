# Final Project Functional Description
## Decentralized Audits

A distributed system for auditing things that require human interaction and manual procedures in the process of auditing.

### Main Entities of the system:

#### - Audit Items
Product, Process, Tasks, Activities that require to be audited by the community.
####  - Producers
  The person responsible for producing the audit item
#### - Auditors
  Members of the community with the ability to audit the items submitted by the producers
#### - Community Member
  The general public interested on controlling the items audit processes 

### How does it work

#### 1. Audits are required for Producers
The producers are required to perform an audit to the things they produce in order to comply with the rules of the community. (e.g.: audit the tax statement from a politician, enviromental impact reports, etc.)
A portion of the producing cost is allocated to getting audits done on the processes and things they produce.
#### 2. Auditors are qualified and get paid for their work
The auditors are members of the community qualified to perform audit reports and submitting the results on a given auditable item. 
The auditors get paid for producing auditing reports and informing the results.
#### 3. The Audit Request
The producer submit an Request for Audit to the system indicating the following:
- Audit Item
	- Audit Name/Description  - Description of the audit request for a given Item
	- Audit Item - Elements of the auditable things that will be provided for the audit
	- Audit Fee - Amount that all the auditors will receive for performing the audit 
	- Number of Auditors Required
#### 4. The Auditors apply for auditing items
The auditors will review the current available items submitted for auditing by the producers and will enroll to the ones that they wish to participate performing the audit.
#### 5. The System randomly assigns the auditors  
When the period for assigning the auditors ends and there are enough auditors enrolled the System will randomly select and assign the auditors for performing the audit.
#### 6. The producers submit the auditable assets
The Producers will submit and sign the documents associated to the audit item.
#### 7. The producers deposit the audit fees
The producers will deposit the Audit Fee at the beginning of the audit. The system will lock the funds. 
#### 8. The Auditors submit the audit results 
Auditors will submit and sign the Audit Results to the system.
The Audit Results will contain the documents with evidence of the audit process and an overall outcome: Passed or Failed.
#### 9. The System pays the auditors
The system will distribute the fees evenly between the participants and release the funds to the auditors wallets.
#### 10. Community Members will review the Audit Progress
The community members will be able to review evolution of the process and evidence at anytime in the system.
#### Anonymity 
The auditors and producers information is kept hidden through all the process they don't know each other, any piece of information submitted and revealed to the system must maintain the anonymity of the producers and the auditors.

### Example 1 - Tax Statements

**Auditable Item:** Tax Statement

**Producers:** Politically Expossed Person

**Auditors:** Citizens that can review tax statements

**Audit Results:** Documents with the results of evaluating the tax statement is correct and the observations

**Community Members** People in general

### Example 2 - Puchase Process

**Auditable Item:** Purchase Order

**Producers:** Goverment Entity Purchase Department

**Auditors:** Citizens that can review purchase orders processes

**Audit Results:** Documents with the results of evaluating that the steps of processing the purchase orders was correct

**Community Members** People in general

# Project Technical Details and Sumbmission requirements

## Directory Structure
    .
    ├── contracts				# Smart Contracts source code
    ├── dapp-site				# Dapp pages and site configuration files
    ├── migrations				# Truffle deployment scripts
    ├── test				# Truffle test scripts
    ├── README.md				# Final project description (this file)
    ├── deployed_address.txt		# Addresses of the smart contracts deployed in the public network
    ├── design_pattern_decisions.md		# Description of design patterns
    └── avoiding_common_attacks.md		# Description of security measures  
    
## Running the Tests

### Dependencies 
Bellow are the dependencies that need to be installed before running the tests.
#### Truffle + Ganache
##### - Truffle installation
`sudo npm install -g truffle`
##### - Ganache installation
`sudo npm install -g ganache-cli`
#### Open Zeppeling Contracts
`npm install @openzeppelin/contracts`

### Steps for running the tests

After git clone the repository cd into the directory you've just cloned it. 

The truffe config file is set with this parameters for the development environment:
```
develop: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
     network_id: "1337",       // Any network (default: none)
     }
```

Run the following commands:

`truffle develop`

`truffle migrate --network develop`

`truffle test`


## Smart Contracts Deployments

The smart contracts are deployed in the Ropsten Network in the following addresses:
```
auditEnrollments = "0x7364B83Df2FB101b69c2137790411Cb5e011262d"
auditAssignments = "0xf5426Bf7cbE8F19E8390F68bb4D033d45e012855"
DAuditaddress = "0x5344ef29Ac1875A9BbbcD70B21dDeF7403EcacfD"
auditItemAddress = "0x6345423b2869ed0367D60078930c45E91cb9013D"
auditResultAddress = "0x98BcDAe1fE42ee106DF1A6aa4221363928a86aE2"
```

## Dapp Site URL
The Dapp is hosted in Netifly in the following URL: https://quirky-leavitt-985d0f.netlify.app

## Dapp Description and instrucctions to install it and run it locally

The Dapp is a React/Next Web3 application. Although the Dapp is hosted in Netifly as required for the project, if you want to install it and run it locally below are the steps to perform the installation.

**Note:** I have very basic knowledge working with this technology but I managed to create the Dapp and deploy it.

### Next.js
`npx create-next-app dapp`
This command will create the directory for the dapp client, install the react/next dependencies and a basic example.
After creating the dapp we need to install additional components for the dapp in the directory we´ve just created:
`cd dapp` and install the following:
### Ethers, IPFS, Axios
`npm install ethers ipfs-http-client@50.1.2 axios web3modal`
### Tailwind CCS
`npm install -D tailwindcss@latest postcss@latest autoprefixer@latest`

### Replace pages with the DAudit App
The Dapp Site contains the pages for the DAudit App, configuration files and contracts.json files.
These files need to be copied into the dapp directory. 
The following command will work for copying the files from the dapp directory:
`cp -R ../dapp-site/ .`

### Running the Dapp
#### Ensure that the Smart contracts are up-and-running
`truffle develop`
`truffle migrate`
#### Setup the config.js with the addresses of the smart contracts 
`config.js` file must point to the addresses of the smart contract on the network you want the dapp to work.
Should it be localhost then you can obtain these addresses from console when running `truffle migrate`. Just copy and paste it in the file.
#### Start the Dapp
`npm run dev` will do the work
#### Access the Dapp from the browser
Access the browser URL and ensure you are in the correct network and port in Metamask.

## Ethereum account to receive your certification as an NFT
0x745E9390F6Fdcc932AB5b41850aB94C87f224974
