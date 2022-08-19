/* eslint-disable no-useless-escape */
const nameValidation = (value) => {
  const regex = /^[a-zA-ZÁ-ÿ\u00f1\u00d1\s]{2,30}$/;
  return regex.test(value);
};

const usernameValidation = (value) => {
  const regex = /^([a-zA-Z0-9]|[-._](?![-._])){5,20}$/;
  return regex.test(value);
};

const emailValidation = (value) => {
  const regex =
    /^[a-zA-Z0-9À-ÿ\u00f1\u00d1\-\_]+@[a-zA-Z0-9Á-ÿ\u00f1\u00d1\-\_]+\.[a-zA-Z0-9Ä-ÿ\u00f1\u00d1\-\_]+$/;
  return regex.test(value);
};

const phoneValidation = (value) => {
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return regex.test(value);
};

const passwordValidation = (value) => {
  const regex = /^.{8,30}$/;
  return regex.test(value);
};

const biographyValidation = (value) => {
  const regex = /^.{0,300}$/;
  return regex.test(value);
};

const locationValidation = (value) => {
  const regex = /^[a-zA-ZÁ-ÿ\u00f1\u00d1\s]{0,30}$/;
  return regex.test(value);
};

module.exports = {
  biographyValidation,
  emailValidation,
  locationValidation,
  nameValidation,
  passwordValidation,
  phoneValidation,
  usernameValidation,
};
