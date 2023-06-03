export const nameValidation = (value: string): boolean => {
  const regex = /^(?!^\s)(?!.*\s$)[a-zA-ZÁ-ÿ\u00f1\u00d1\s]{2,30}$/;
  return regex.test(value);
};

export const usernameValidation = (value: string): boolean => {
  const regex = /^(?!.*[_]{2})[a-zA-Z][a-zA-Z0-9_]{2,14}$/;
  return regex.test(value);
};

export const emailValidation = (value: string): boolean => {
  const regex =
    /^[a-zA-Z0-9À-ÿ\u00f1\u00d1\-\_]+@[a-zA-Z0-9Á-ÿ\u00f1\u00d1\-\_]+\.[a-zA-Z0-9Ä-ÿ\u00f1\u00d1\-\_]+$/;
  return regex.test(value);
};

export const phoneValidation = (value: string): boolean => {
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return regex.test(value);
};

export const passwordValidation = (value: string): boolean => {
  const regex = /^.{8,30}$/;
  return regex.test(value);
};

export const biographyValidation = (value: string): boolean => {
  const regex = /^.{0,300}$/;
  return regex.test(value);
};

export const locationValidation = (value: string): boolean => {
  const regex = /^[\p{L}\d\s.,-áéíóúÁÉÍÓÚñÑüÜ]{1,30}$/;
  return regex.test(value);
};

export const postValidation = (value: string): boolean => {
  const regex = /^.[\s\S]{1,249}$/;
  return regex.test(value);
};
