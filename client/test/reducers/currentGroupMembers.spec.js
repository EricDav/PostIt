import expect from 'expect';
import * as GroupAction from '../../actions/GroupAction';
import { addUser } from '../../actions/UserAction';
import currentGroupMembers from '../../reducers/currentGroupMembers';

describe('currentGroup Reducer', () => {
  it('should set the currrent group members', () => {
    const initialState = [];
    const members = [
      {
        id: 1,
        fullName: 'Alienyi David',
        userName: 'Pythagoras',
        email: 'alienyidavid@gmail.com',
        phoneNumber: '09087896875'
      },
      {
        id: 2,
        fullName: 'Alienyi Daniel',
        userName: 'Python',
        email: 'alienyidavid@gmail.com',
        phoneNumber: '09077896805'
      }
    ];
    const action = GroupAction.setCurrentGroupMembers(members);
    const newState = currentGroupMembers(initialState, action);
    expect(newState[0].id).toEqual(1);
    expect(newState[0].userName).toEqual('Pythagoras');
    expect(newState[1].id).toEqual(2);
    expect(newState[1].userName).toEqual('Python');
    expect(newState.length).toEqual(2);
  });
  it('should add a user to a group', () => {
    const initialState = [
      {
        id: 1,
        fullName: 'Alienyi David',
        userName: 'Pythagoras',
        email: 'alieny.idavid@andela.com',
        phoneNumber: '09087896875'
      },
      {
        id: 2,
        fullName: 'Alienyi Daniel',
        userName: 'Python',
        email: 'alienyidavid@gmail.com',
        phoneNumber: '09077896805'
      }
    ];
    const newUser = {
      id: 3,
      fullName: 'Bayo Daniel',
      userName: 'Python23',
      email: 'alienyidavid4christ@gmail.com',
      phoneNumber: '09077890000'
    };
    const action = addUser(newUser);
    const newState = currentGroupMembers(initialState, action);
    expect(newState.length).toEqual(3);
    expect(newState[2].fullName).toEqual('Bayo Daniel');
    expect(newState[2].userName).toEqual('Python23');
  });
   it('should return initial state for invalid type', () => {
     const initialState = [];
    const newUser = {
      id: 3,
      fullName: 'Bayo Daniel',
      userName: 'Python23',
      email: 'alienyidavid4christ@gmail.com',
      phoneNumber: '09077890000'
    };
    const action = {
      type: 'WRONG',
      newUser
    }
    const newState = currentGroupMembers(initialState, action);
    expect(newState.length).toEqual(0);
  });
});
