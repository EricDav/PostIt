import expect from 'expect';
import * as DashboardViewAction from '../../actions/DashboardViewAction';
import showDashboardForm from '../../reducers/showDashboardForm';

describe('Dashboard page Reducer', () => {
  it('should set the dashboard page', () => {
    const initialState = 0;
    const action = DashboardViewAction.setDashboardPage(2);
    const newState = showDashboardForm(initialState, action);
    expect(newState).toEqual(2);
  });
   it('should return initial state for invalid type', () => {
    const initialState = 0;
    const dashboardPage = 2
     const action = {
      type: 'WRONG',
      dashboardPage
    };
    const newState = showDashboardForm(initialState, action);
    expect(newState).toEqual(0);
  });
});
