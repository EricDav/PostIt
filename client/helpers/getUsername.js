const getUsername = (listOfUsers) => {
  const usernames = [];
  listOfUsers.forEach((user) => {
    usernames.push(user.username);
  });
  return usernames;
};
export default getUsername;
