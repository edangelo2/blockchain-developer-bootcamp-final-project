const AuditItem = artifacts.require("./AuditItem.sol");
const DAudit = artifacts.require("./DAudit.sol");

module.exports = function (deployer) {
  deployer.deploy(AuditItem,DAudit.address)
  .then(() => AuditItem.deployed())
  .then(_instance => console.log('export const auditItemAddress = "'+_instance.address+'"'));
};

