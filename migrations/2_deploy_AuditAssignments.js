const AuditAssignments = artifacts.require("./AuditAssignments.sol");

module.exports = function (deployer) {
  deployer.deploy(AuditAssignments)
  .then(() => AuditAssignments.deployed())
  .then(_instance => console.log('export const auditAssignments = "'+_instance.address+'"'));
};

