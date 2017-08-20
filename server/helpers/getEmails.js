const getEmails = (users) => {
  let emails = '';
  users.forEach((user, index) => {
    if (index === 0) {
      emails = `${user.email}`;
    } else {
      emails = `${emails}, ${user.email}`;
    }
  });
  return emails;
};

export default getEmails;
