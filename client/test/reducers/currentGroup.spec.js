import expect from 'expect';
import * as GroupAction from '../../actions/GroupAction';
import currentGroup from '../../reducers/currentGroup';

describe('currentGroup Reducer', () => {
  it('should set the currrent group of the user ', () => {
    const initialState = {};
    const group = {
      id: 1,
      name: 'Mathematics world',
      description: 'I love mathematics'
    };
    const action = GroupAction.setCurrentGroup(group);
    const newState = currentGroup(initialState, action);
    expect(newState.id).toEqual(1);
    expect(newState.name).toEqual('Mathematics world');
    expect(newState.description).toEqual('I love mathematics');
  });
  it('should update the currrent group of the user ', () => {
    const initialState = {};
    const updatedGroup = {
      id: 1,
      name: 'English world',
      description: 'I love mathematics'
    };
    const action = GroupAction.updateGroup(updatedGroup);
    const newState = currentGroup(initialState, action);
    expect(newState.name).toEqual('English world');
  });
  it('should return initial state for invalid type', () => {
    const initialState = {};
    const group = {
      id: 1,
      name: 'Mathematics world',
      description: 'I love mathematics'
    };
    const action = {
      type: 'WRONG',
      group
    };
    const newState = currentGroup(initialState, action);
    expect(Object.keys(newState).length).toEqual(0);
  });
});
