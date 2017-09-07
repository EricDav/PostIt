/**
 * @description 
 * 
 * @param  {string} searchStr id of the group to be deleted
 * @param  {array} users list of users
 * @param  {array} currentUser the current login user
 * @return {array} list of users that matches the searchStr
 */

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
