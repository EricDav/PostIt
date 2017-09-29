import expect from 'expect';
import * as DashboardViewAction from '../../actions/DashboardViewAction';
import initialDashboardPage from '../../reducers/initialDashboardPage';

describe('initialDashboard page Reducer', () => {
  it('should set the initialdashboard page', () => {
    const initialState = 0;
    const action = DashboardViewAction.setInitialDashboardPage(2);
    const newState = initialDashboardPage(initialState, action);
    expect(newState).toEqual(2);
  });
  it('should return initial state for invalid type', () => {
    const initialState = 0;
    const pageNumber = 2;
    const action = {
      type: 'WRONG',
      pageNumber
    };
    const newState = initialDashboardPage(initialState, action);
    expect(newState).toEqual(0);
  });
});
