const updateGroup = (groups, updatedGroup) => {
  const updatedGroups = [];
  groups.forEach((group) => {
    if (group.id === updatedGroup.id) {
      updatedGroups.push(updatedGroup);
    } else {
      updatedGroups.push(group);
    }
  });
  return updatedGroups;
};

export default updateGroup;
