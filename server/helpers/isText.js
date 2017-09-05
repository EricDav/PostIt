
/**
 *@description checks if the string pass in is a text. Means all the charcters are alphabet
 *
 * @param  {string} str
 * @return {boolean} true or false
 */
const isText = (str) => {
  if (str.length === 0) {
    return false;
  }
  for (let i = 0; i < str.length; i += 1) {
    if (/[a-z A-Z ' ']/.test(str[i]) === false) {
      return false;
    }
  }
  return true;
};
export default isText;
