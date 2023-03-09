let officers = null;
let owners = null;
let violations = null;
try {
  officers = require("./schemes/officers");
  owners = require("../models/schemes/owners");
  violations = require("../models/schemes/violations");
} catch (err) {
  console.log(err);
  officers = require("./schemes/officers");
  owners = require("../models/schemes/owners");
  violations = require("../models/schemes/violations");
}

module.exports = {
  Officers: officers,
  Owners: owners,
  Violations: violations
};
