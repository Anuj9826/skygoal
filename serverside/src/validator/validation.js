const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

// function for check data is empty or not
const isValidRequest = function (data) {
  if (Object.keys(data).length == 0) {
    return false;
  }
  return true;
};

// function for check data is valid or not
const isValidString = function (value) {
  if (typeof value == undefined || value == null) return false;
  if (typeof value == "string" && value.trim().length == 0) return false;
  return true;
};

// function for check name is valid or not
const isValidName = function (name) {
  return /^[a-zA-Z\s]+$/.test(name);
};

// function for check name maxlength should be 50 characters
const isValidLength = function (value) {
  const maxLength = 50;
  return value.length <= maxLength;
};

// function for email verification
const isValidMail = function (email) {
  return /^([0-9a-z]([-_\\.]*[0-9a-z]+)*)@([a-z]([-_\\.]*[a-z]+)*)[\\.]([a-z]{2,9})+$/.test(email);
};

// function for password verification
const isValidPassword = function (password) {
  return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(password);
};

// function for confirm password
const isConfirmPasswordMatch = function(password, confirmPassword) {
  return password === confirmPassword;
}

// function for convent the password into the hash password
const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

// function for verifying valid mobile number
const isValidPhone = function (phone) {
  return /^((\+91(-| )+)|0)?[6-9][0-9]{9}$/.test(phone);
};

const isValidId = function (id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return false;
  }
  return true;
};

module.exports = {
  isValidRequest,
  isValidString,
  isValidName,
  isValidLength,
  isValidMail,
  isValidPassword,
  isConfirmPasswordMatch,
  hashPassword,
  isValidPhone,
  isValidId,
};