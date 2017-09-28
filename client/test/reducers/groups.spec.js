import expect from 'expect';
import * as GroupAction from '../../actions/GroupAction';
import groups from '../../reducers/groups';

describe('Groups Reducer', () => {
  it('should set all the groups of the user', () => {
    const initialState = [];
    const userGroups = [{
      id: 1,
      name: 'Mathematics world',
      description: 'This where we solve maths'
    }, {
      id: 2,
      name: 'English',
      description: 'We drill ourselves on english grammer'
    }];
    const action = GroupAction.setCurrentUserGroups(userGroups);
    const newState = groups(initialState, action);
    expect(newState[0].id).toEqual(1);
    expect(newState[0].name).toEqual('Mathematics world');
    expect(newState[1].id).toEqual(2);
    expect(newState[1].description).toEqual('We drill ourselves on english grammer');
    expect(newState.length).toEqual(2);
  });
  it('should create a group', () => {
    const initialState = [{
      id: 1,
      name: 'Mathematics world',
      description: 'This where we solve maths'
    }, {
      id: 2,
      name: 'English',
      description: 'We drill ourselves on english grammer'
    }];
    const newGroup = {
      id: 3,
      name: 'Love',
      description: "Love don't care "
    };
    const action = GroupAction.addGroup(newGroup);
    const newState = groups(initialState, action);
    expect(newState.length).toEqual(3);
    expect(newState[2].name).toEqual('Love');
    expect(newState[2].id).toEqual(3);
    expect(newState[2].description).toEqual("Love don't care ");
  });
  it('should delete a group', () => {
    const initialState = [{
      id: 1,
      name: 'Mathematics world',
      description: 'This where we solve maths'
    }, {
      id: 2,
      name: 'English',
      description: 'We drill ourselves on english grammer'
    }];
    const groupToBeDeleted = {
      groupId: 2,
    };
    const action = GroupAction.deleteGroup(groupToBeDeleted);
    const newState = groups(initialState, action);
    expect(newState.length).toEqual(1);
  });
  it('should update a group', () => {
    const initialState = [{
      id: 1,
      name: 'Mathematics world',
      description: 'This where we solve maths'
    }, {
      id: 2,
      name: 'English',
      description: 'We drill ourselves on english grammer'
    }];
    const groupToBeUpdated = {
      id: 2,
      name: 'English World',
      description: 'We drill ourselves on english grammer'
    };
    const action = GroupAction.updateGroupInCurrentUserGroups(groupToBeUpdated);
    const newState = groups(initialState, action);
    expect(newState[1].name).toEqual('English World');
  });
});
