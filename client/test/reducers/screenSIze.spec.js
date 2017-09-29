import expect from 'expect';
import * as DashboardViewAction from '../../actions/DashboardViewAction';
import screenSize from '../../reducers/screenSize';

describe('screen size Reducer', () => {
  it('should set the screen size', () => {
    const initialState = false;
    const action = DashboardViewAction.isSmallScreenSize(true);
    const newState = screenSize(initialState, action);
    expect(newState).toEqual(true);
  });
  it('should return initial state for invalid type', () => {
    const initialState = false;
    const show = true;
    const action = {
      type: 'WRONG',
      show
    };
    const newState = screenSize(initialState, action);
    expect(newState).toEqual(false);
  });
});
