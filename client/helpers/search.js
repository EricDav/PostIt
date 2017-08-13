const search = (searchStr, users, currentUser) => {
  const matchUsers = [];
  users.forEach((user) => {
    const matchValue = new RegExp(searchStr.toLowerCase());
    if (matchValue.test(user.fullname.toLowerCase()) && currentUser !== user.fullname) {
      matchUsers.push(user);
    }
  });
  return matchUsers;
};

export default search;
