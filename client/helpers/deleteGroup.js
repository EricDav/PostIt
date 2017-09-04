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
