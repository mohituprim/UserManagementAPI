// load the things we need
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
const userAccountSchema = mongoose.Schema({
  local: {
    email: String,
    password: String,
  },
  facebook: {
    id: String,
    token: String,
    name: String,
    email: String,
  },
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String,
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
  userName: String, // extracted from username
  role: String, // default role is customer other role could be guide, associates
  service: String, // default service is none other could be stay, food, medical, mechanics
  contactInfo: { // will be updated when user login successfully first time
    primaryMobileNo: String,
    secondaryMobileNo: String,
    address: String,
  },
  paymentInfo: String, // updated by user(optional)
  accountImageUrl: String, // after uploading Account image
  reference_id: String, // if user is joining us through referal programme
  isActive: Boolean, // provide the option of deactivating the Account
}, { timestamps: true });

// methods ======================
userAccountSchema.methods.intializeAccount = function (user) {
  this.userName = user.local.email;
  this.role = 'customer';
  return null;
};

userAccountSchema.methods.updateAccount = function (Account) {
  this.name = Account.name;
  return null;
};

userAccountSchema.methods.activateAccount = function () {
  this.isActive = true;
  return null;
};

userAccountSchema.methods.deActivateAccount = function () {
  this.isActive = false;
  return null;
};

userAccountSchema.methods.deleteAccount = function () {
  this.isActive = false;
  return null;
};
// generating a hash
userAccountSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userAccountSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};
// create the model for users and expose it to our app
module.exports = mongoose.model('UserAccounts', userAccountSchema);
