const DAudit = artifacts.require("./DAudit.sol");
const AuditAssignments = artifacts.require("./AuditAssignments.sol");
const AuditEnrollments = artifacts.require("./AuditEnrollments.sol");

module.exports = function (deployer) {
  deployer.deploy(DAudit,AuditEnrollments.address,AuditAssignments.address)
  .then(() => DAudit.deployed())
  .then(_instance => console.log('export const DAuditaddress = "'+_instance.address+'"'));
};

