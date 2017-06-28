const isText = (str) => {
  if (str.length === 0) {
    return false;
  }
  for (let i = 0; i < str.length; i++) {
    if (/[a-z A-Z ' ']/.test(str[i]) === false) {
      return false;
    }
  }
  return true;
};
export default isText;
