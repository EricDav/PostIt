const isDigit = (str) => {
  if (str.length === 0) {
    return false;
  }
  for (let i = 0; i < str.length; i++) {
    if (/[0-9]/.test(str[i]) === false) {
      return false;
    }
  }
  return true;
};
export default isDigit;
