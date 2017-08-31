const search = (searchStr, users, currentUser) => {
  if (searchStr === '' || searchStr === ' ') {
    return [];
  }
  const matchUsers = [];
  users.forEach((user) => {
    const matchValue = new RegExp(searchStr.toLowerCase());
    if (matchValue.test(user.fullname.toLowerCase()) && currentUser !== user.username) {
      matchUsers.push(user);
    }
  });
  return matchUsers;
};

export default search;
