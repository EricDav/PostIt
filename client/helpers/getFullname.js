const getFullname = (listOfUsers) => {
  const usernames = [];
  listOfUsers.forEach((user) => {
    usernames.push(user.fullname);
  });
  return usernames;
};
export default getFullname;
