/**
 * @param  {array} users array of users oject
 * @description removes password from user information
 * @return {object} return array of users object without their password
 */
const removePassword = (users) => {
  users.forEach((user) => {
    user.password = '';
  });
  return users;
};

export default removePassword;