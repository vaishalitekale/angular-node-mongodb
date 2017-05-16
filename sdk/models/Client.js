var mongoose = require('mongoose');
//mongoose.connect('mongodb://graspuuser:noguess21@ds115411.mlab.com:15411/graspu');

var ClientSchema = new mongoose.Schema({
  parentId: {
    required: true,
    type: String
  },
  firstName: String,
  lastName: String,
  email: String,
  username: {
    required: true,
    type: String
  },
  company: {
    type: String
  },
  status: String,
  password: String,
  graspersQuantity: Number,
  role: String,
  typeOfBusiness: String,
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
  resellerTerms: String,
  profileImageURL: {
    type: String
  },
  companyLogoURL: {
    type: String
  }
});

ClientSchema.pre('save', function(next) {
  console.log("I am in clientSchema.pre('save'");
  var client = this;
  client.role = "CLIENT";
  next();

});

module.exports = mongoose.model('Client', ClientSchema);
