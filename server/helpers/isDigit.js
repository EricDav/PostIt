/**
 * @param  {string} str
 * @description checks if the string pass in is a digit. Means all the charcters are digit
 * @return {boolean} true or false
 */
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
