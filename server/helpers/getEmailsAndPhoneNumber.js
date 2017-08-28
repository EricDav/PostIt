/**
 * @param  {array} users 
 * @description get the emails and phone numbers from a user object
 * @return {void} no returns
 */
const getEmails = (users) => {
  let emails = '';
  const phoneNumbers = [];
  users.forEach((user) => {
    emails = `${user.email}`;
    phoneNumbers.push(user.phoneNumber);
  });
  return [emails, phoneNumbers];
};

export default getEmails;