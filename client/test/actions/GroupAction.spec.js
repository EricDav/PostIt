import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import * as GroupAction from '../../actions/GroupAction';
import { SET_CURRENT_GROUP_MEMBERS,
  DELETE_GROUP, SET_CURRENT_USER_GROUPS, ADD_GROUP }
  from '../../actions/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Group actions', () => {
  it('should creates ADD_GROUP  when a user create a group', () => {
    const response = {
      data: { group: {
        id: 1,
        name: 'Mathematics world',
        description: 'This where we solve maths'
      }
      } };
    axios.post = jest.fn(() => Promise.resolve(response));
    const addedGroup = {
      id: 1,
      name: 'Mathematics world',
      description: 'This where we solve maths'
    };
    const expectedActions = [{ type: ADD_GROUP, addedGroup }];
    const store = mockStore({ showGoogleForm: {} });

    return store.dispatch(GroupAction.createGroupRequest(addedGroup))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it(`should creates SET_CURRENT_USER_GROUPS
  when a user request for all groups`, () => {
      const response = {
        data: { groups: [{
          id: 1,
          name: 'Mathematics world',
          description: 'This where we solve maths'
        }, {
          id: 2,
          name: 'English',
          description: 'We drill ourselves on english grammer'
        }]
        } };
      const groups = [{
        id: 1,
        name: 'Mathematics world',
        description: 'This where we solve maths'
      }, {
        id: 2,
        name: 'English',
        description: 'We drill ourselves on english grammer'
      }];
      axios.get = jest.fn(() => Promise.resolve(response));
      const expectedActions = [{ type: SET_CURRENT_USER_GROUPS, groups },
        { offset: { isMoreGroups: false,
          offset: undefined },
        type: 'OFF_SET' }];
      const store = mockStore({ groups: [] });

      return store.dispatch(GroupAction.getGroupsRequest())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  it(`should creates SET_CURRENT_USER_GROUPS when a
  user request to see all members`, () => {
      const response = {
        data: [{
          id: 1,
          fullName: 'Alienyi David',
          userName: 'Python',
          email: 'alienyidvid@gmail.com',
          phoneNumber: '09077667898'
        }, {
          id: 2,
          fullName: 'Alienyi Daniel',
          userName: 'Python1',
          email: 'alienyidavid@gmail.com',
          phoneNumber: '09077667895'
        }]
      };
      const members = [{
        id: 1,
        fullName: 'Alienyi David',
        userName: 'Python',
        email: 'alienyidvid@gmail.com',
        phoneNumber: '09077667898'
      }, {
        id: 2,
        fullName: 'Alienyi Daniel',
        userName: 'Python1',
        email: 'alienyidavid@gmail.com',
        phoneNumber: '09077667895'
      }];
      axios.get = jest.fn(() => Promise.resolve(response));
      const expectedActions = [{ type: SET_CURRENT_GROUP_MEMBERS, members }];
      const store = mockStore({ groups: [] });

      return store.dispatch(GroupAction.getGroupMembers())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  it('should creates DELETE_GROUP  when a user DELETE a group', () => {
    axios.delete = jest.fn(() => Promise.resolve(respnose));
    const response = {
      id: 1,
      name: 'Mathematics world',
      description: 'This where we solve maths'
    };
    axios.delete = jest.fn(() => Promise.resolve(response));
    const expectedActions = [{ groupData:
      { description: 'This where we solve maths',
        id: 1,
        name: 'Mathematics world' },
    type: DELETE_GROUP }];
    const store = mockStore({ groups: [response] });

    return store.dispatch(GroupAction.deleteCurrentGroup(response))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it(`should creates UPDATE_GROUP_DATA,
    DELETE_CURRENT_GROUP_DATA  when a user update a group`, () => {
      axios.delete = jest.fn(() => Promise.resolve(respnose));
      const response = {
        name: 'English world',
        description: 'This where we solve maths'
      };
      axios.put = jest.fn(() => Promise.resolve(response));
      const expectedActions = [{ type: 'UPDATE_GROUP_DATA',
        updatedGroupData: { description: 'This where we solve maths',
          name: 'English world' } }, { type: 'UPDATE_CURRENT_GROUP',
        updateGroupData: { description: 'This where we solve maths',
          name: 'English world' } }];
      const store = mockStore({ groups: {} });

      return store.dispatch(GroupAction.updateCurrentGroup(response))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  it(`should creates UPDATE_GROUP_DATA,
  DELETE_CURRENT_GROUP_DATA  when a user update a group`, () => {
      axios.delete = jest.fn(() => Promise.resolve(respnose));
      const response = {
        name: 'English world',
        description: 'This where we solve maths'
      };
      axios.put = jest.fn(() => Promise.resolve(response));
      const expectedActions = [{ type: 'UPDATE_GROUP_DATA',
        updatedGroupData: { description: 'This where we solve maths',
          name: 'English world' } }, { type: 'UPDATE_CURRENT_GROUP',
        updateGroupData: { description: 'This where we solve maths',
          name: 'English world' } }];
      const store = mockStore({ groups: {} });

      return store.dispatch(GroupAction.updateCurrentGroup(response))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
