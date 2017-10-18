import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as DashboardViewAction from '../../actions/DashboardViewAction';
import { SHOW_INITIAL_DASHBOARD_PAGE, SCREEN_SIZE, SHOW_DASHBOARD_PAGE,
  SET_NAVBAR_RIGHT_VIEW }
  from '../../actions/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Dashboard view actions', () => {
  it('should creates SHOW_DASHBOARD_PAGE', () => {
    const expectedActions = {
      type: SHOW_DASHBOARD_PAGE,
      showForm: 1 };
    expect(DashboardViewAction.setDashboardPage(1)).toEqual(expectedActions);
  });
  it('should creates SHOW_INITIAL_DASHBOARD_PAGE', () => {
    const expectedActions = { type: SHOW_INITIAL_DASHBOARD_PAGE,
      initialPage: 2 };
    expect(DashboardViewAction.setInitialDashboardPage(2))
      .toEqual(expectedActions);
  });
  it('should creates SET_NAVBAR_RIGHT_VIEW', () => {
    const expectedActions = { type: SET_NAVBAR_RIGHT_VIEW,
      viewNumber: 2 };
    expect(DashboardViewAction.setView(2)).toEqual(expectedActions);
  });
  it('should creates SET_NAVBAR_RIGHT_VIEW', () => {
    const expectedActions = { type: SCREEN_SIZE,
      screenSize: true };
    expect(DashboardViewAction.isSmallScreenSize(true))
      .toEqual(expectedActions);
  });
});
