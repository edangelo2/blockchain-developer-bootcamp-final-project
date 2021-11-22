# Dependencies that need to be installed to run the tests
## Truffle + Ganache
### - Truffle installation
`sudo npm install -g truffle`
### - Ganache installation
`sudo npm install -g ganache-cli`
## Open Zeppeling Contracts
`npm install @openzeppelin/contracts`

## Dapp

The Dapp is a React/Next Dapp. Although the Dapp is hosted in Netifly as required for the project, if you want to install it and run it locally below are the steps to follow.

Note: I have very basics knowledge working with this technology but I managed to create the Dapp and deploy it.

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
These files need to be copied in to the dapp directory. 
The following command will work for copying the files from the dapp directory:
`cp -R ../dapp-site/ .`

### Running the Dapp
#### Ensure that the Smart contracts are up-and-running
`Truffle Develop`
`Truffle Migrate`
#### Setup the config.js with the addresses of the smart contracts 
config.js file must point to the addresses of the smart contract on the network you want the dapp to work.
Should it be localhost then you can obtain these addresses from the Truffle migrate console which console.logs the addresses.
Just copy and paste it in the file.
#### Start the Dapp
`npm run dev` will do the work
#### Access the Dapp from the browser
Access the browser URL and ensure you are in the correct network and port in Metamask.
