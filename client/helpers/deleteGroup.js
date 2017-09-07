/**
 * @description remove a particular group from a list of groups
 * 
 * @param  {array} groups list of groups
 * @param  {number} groupId id of the group to be deleted
 * @return {array} new list of groups excluding the deleted one
 */

const deleteGroup = (groups, groupId) => {
  const newGroups = [];
  groups.forEach((group) => {
    if (Number(group.id) !== Number(groupId)) {
      newGroups.push(group);
    }
  });
  return newGroups;
};

export default deleteGroup;
