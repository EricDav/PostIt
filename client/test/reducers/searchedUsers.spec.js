import expect from 'expect';
import * as UserAction from '../../actions/UserAction';
import searchedUsers from '../../reducers/searchedUsers';

describe('Search Reducer', () => {
  it('should set searched users', () => {
    const initialState = [];
    const users = [
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
    const action = UserAction.setSearchedUser(users);
    const newState = searchedUsers(initialState, action);
    expect(newState[0].id).toEqual(1);
    expect(newState[0].userName).toEqual('Pythagoras');
    expect(newState[1].id).toEqual(2);
    expect(newState[1].userName).toEqual('Python');
    expect(newState.length).toEqual(2);
  });
  it('should return initial state for invalid type', () => {
    const initialState = [];
    const users = [
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
    const action = {
      type: 'WRONG',
      users
    };
    const newState = searchedUsers(initialState, action);
    expect(newState.length).toEqual(0);
  });
});
