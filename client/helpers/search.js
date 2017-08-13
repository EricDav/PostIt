const search = (searchStr, users) => {
  const matchUsers = [];
  users.forEach((user) => {
    const matchValue = new RegExp(searchStr.toLowerCase());
    if (matchValue.test(user.fullname.toLowerCase())) {
      matchUsers.push(user);
    }
  });
  return matchUsers;
};

export default search;
