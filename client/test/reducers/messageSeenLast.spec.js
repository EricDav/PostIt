import expect from 'expect';
import * as MessageAction from '../../actions/MessageAction';
import messageSeenLast from '../../reducers/messageSeenLast';

describe('initialDashboard page Reducer', () => {
  it('should set the initialdashboard page', () => {
    const initialState = 0;
    const action = MessageAction.setSeenLast(2);
    const newState = messageSeenLast(initialState, action);
    expect(newState).toEqual(2);
  });
   it('should return initial state for invalid type', () => {
    const initialState = 0;
    const initialPage = 3;
    const action = {
      type: 'WRONG',
      initialPage
    }
    const newState = messageSeenLast(initialState, action);
    expect(newState).toEqual(0);
  });
});
