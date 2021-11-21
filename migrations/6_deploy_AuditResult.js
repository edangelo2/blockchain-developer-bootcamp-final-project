const AuditResult = artifacts.require("./AuditResult.sol");
const DAudit = artifacts.require("./DAudit.sol");

module.exports = function (deployer) {
  deployer.deploy(AuditResult,DAudit.address)
  .then(() => AuditResult.deployed())
  .then(_instance => console.log('export const auditResult = "'+_instance.address+'"'));
};

