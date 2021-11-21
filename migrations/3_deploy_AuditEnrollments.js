const AuditEnrollments = artifacts.require("./AuditEnrollments.sol");

module.exports = function (deployer) {
  deployer.deploy(AuditEnrollments)
  .then(() => AuditEnrollments.deployed())
  .then(_instance => console.log('export const auditEnrollments = "',_instance.address));
};

