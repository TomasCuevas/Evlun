export const nameRegex = /^(?!^\s)(?!.*\s$)[a-zA-ZÁ-ÿ\u00f1\u00d1\s]{2,30}$/;

export const usernameRegex = /^(?!.*[_]{2})[a-zA-Z][a-zA-Z0-9_]{2,14}$/;

export const emailRegex =
  /^[a-zA-Z0-9À-ÿ\u00f1\u00d1\-\._]+@[a-zA-Z0-9Á-ÿ\u00f1\u00d1\-\_]+\.[a-zA-Z0-9Ä-ÿ\u00f1\u00d1\-\_]+$/;

export const phoneRegex =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

export const postRegex = /^.[\s\S]{1,249}$/;

export const passwordRegex = /^.{8,30}$/;

export const biographyRegex = /^.{0,300}$/;

export const locationRegex = /^[\p{L}\d\s.,-áéíóúÁÉÍÓÚñÑüÜ]{1,30}$/;
