/**
 *@description checks if a field is null, undefined or empty
 * 
 * @param  {type} fieldData
 * @return {boolean} true or false
 */
const inValidField = (fieldData) => {
  if (typeof (fieldData) !== 'string' || fieldData.length === 0) {
    return true;
  }
  let hasValue = false;
  fieldData.split().forEach((value) => {
    if (value !== ' ') {
      hasValue = true;
    }
  });
  if (!hasValue) {
    return true;
  }
  return false;
};

export default inValidField;
