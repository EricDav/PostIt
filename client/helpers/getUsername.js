/**
 * @description get the username from a list of users
 * 
 * @param  {array} listOfUsers list of users
 * @return {array} list of usernames
 */

const getUsername = (listOfUsers) => {
  const usernames = [];
  listOfUsers.forEach((user) => {
    usernames.push(user.userName);
  });
  return usernames;
};
export default getUsername;
