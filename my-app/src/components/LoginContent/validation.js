export function isEmail(value) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
}

export function hasLetterAndNumber(value) {
    return /^(?=.*[a-zA-Z])(?=.*\d)/.test(value);
}

export function hasMinLength(value) {
  return value.length >= 8;
}