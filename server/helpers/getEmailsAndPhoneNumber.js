const getEmails = (users) => {
  let emails = '';
  const phoneNumbers = [];
  users.forEach((user, index) => {
    if (index === 0) {
      emails = `${user.email}`;
      phoneNumbers.push(user.phoneNumber);
    } else {
      emails = `${emails}, ${user.email}`;
    }
  });
  return [emails, phoneNumbers];
};

export default getEmails;
