/* eslint-disable no-useless-escape */
export const nameValidation = (value) => {
  const regex = /^[a-zA-ZÁ-ÿ\u00f1\u00d1\s]{2,30}$/;
  return regex.test(value);
};

export const usernameValidation = (value) => {
  const regex = /^([a-zA-Z0-9]|[-._](?![-._])){5,20}$/;
  return regex.test(value);
};

export const emailValidation = (value) => {
  const regex =
    /^[a-zA-Z0-9À-ÿ\u00f1\u00d1\-\_]+@[a-zA-Z0-9Á-ÿ\u00f1\u00d1\-\_]+\.[a-zA-Z0-9Ä-ÿ\u00f1\u00d1\-\_]+$/;
  return regex.test(value);
};

export const phoneValidation = (value) => {
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return regex.test(value);
};

export const passwordValidation = (value) => {
  const regex = /^.{8,30}$/;
  return regex.test(value);
};

export const biographyValidation = (value) => {
  const regex = /^.{0,300}$/;
  return regex.test(value);
};

export const locationValidation = (value) => {
  const regex = /^[a-zA-ZÁ-ÿ\u00f1\u00d1\s]{0,30}$/;
  return regex.test(value);
};
