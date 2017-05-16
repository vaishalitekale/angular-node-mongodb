var mongoose = require('mongoose');
//mongoose.connect('mongodb://graspuuser:noguess21@ds115411.mlab.com:15411/graspu');

var ResellerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  userName: String,
  conpanyName: String,
  status: String,
  password: String,
  role: String,
  typeOfBusiness: String,
  industrySpecialization: String,
  contractTerm: String,
  physicalAddress: {
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String
  },
  mailingAddress: {
    sameAsPhysicalAddress: Boolean,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String
  },
  bilingAddress: {
    sameAsMailingAddress: Boolean,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String
  },
  decisionMaker: Array,
  billingAdministrator: Array,
  contractExpirationDate: String,
  pricing: Number,
  discount: Number,
  profileImageURL: String,
  companyLogoURL: String
});

ResellerSchema.pre('save', function(next) {
  console.log("I am in ResellerSchema.pre('save'");
  var reseller = this;
  reseller.role = "RESELLER";
  next();
});

module.exports = mongoose.model('Reseller', ResellerSchema);
