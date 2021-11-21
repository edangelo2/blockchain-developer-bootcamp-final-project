const AuditAssignments = artifacts.require("./AuditAssignments.sol");
const AuditEnrollments = artifacts.require("./AuditEnrollments.sol");
const AuditResult = artifacts.require("./AuditResult.sol");
const DAudit = artifacts.require("./DAudit.sol");
const AuditItem = artifacts.require("./AuditItem.sol");

module.exports = function (deployer) {
  console.log('export const auditAssignments = "'+AuditAssignments.address+'"');
  console.log('export const auditEnrollments = "'+AuditEnrollments.address+'"');
  console.log('export const auditResult = "'+AuditResult.address+'"');
  console.log('export const auditItem = "'+AuditItem.address+'"');
  console.log('export const DAudit = "'+DAudit.address+'"');
};

