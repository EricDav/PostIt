import expect from 'expect';
import * as MessageAction from '../../actions/MessageAction';
import setPiority from '../../reducers/setPiority';

describe('initialDashboard page Reducer', () => {
  it('should return initial state for invalid type', () => {
    const initialState = '';
    const action = MessageAction.setPiority('normal');
    const newState = setPiority(initialState, action);
    expect(newState).toEqual('normal');
  });
   it('should return initial state for invalid type', () => {
    const initialState ='';
    const piority = 'normal';
    const action = {
      type: 'WRONG',
      piority
    };
    const newState = setPiority(initialState, action);
    expect(newState).toEqual('');
  });
});
