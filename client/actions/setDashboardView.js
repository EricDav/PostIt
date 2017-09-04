import { SET_NAVBAR_RIGHT_VIEW, SHOW_DASHBOARD_PAGE, SHOW_INITIAL_DASHBOARD_PAGE } from './types';

/**
 * @description set view number action
 * 
 * @param  {number} viewNumber
 * @return {object} returns object
 */
export function setView(viewNumber) {
  return {
    type: SET_NAVBAR_RIGHT_VIEW,
    viewNumber
  };
}

/**
 * @description set view in the  dashboard page
 * 
 * @param  {number} showForm determines which form to show in the dashboard page
 * @return {object} returns object
 */
export function setDashboardPage(showForm) {
  return {
    type: SHOW_DASHBOARD_PAGE,
    showForm
  };
}

/**
 * @description set the number of the page shown before the current one
 * 
 * @param  {number} initialPage determines the page shown before the current
 * @return {object} returns object
 */
export function setInitialDashboardPage(initialPage) {
  return {
    type: SHOW_INITIAL_DASHBOARD_PAGE,
    initialPage
  };
}

/**
 * @description set view number action creator
 * 
 * @param  {number} currentForm 
 * @param  {number} oldForm
 * @return {object} returns object
 */
export function dashboardPage(currentForm, oldForm) {
  return (dispatch) => {
    dispatch(setDashboardPage(currentForm));
    dispatch(setInitialDashboardPage(oldForm));
  };
}

/**
 * @description set view number 
 * 
 * @param  {number} viewNumber 
 * @return {object} returns object
 */
export function setRightNavBarView(viewNumber) {
  return (dispatch) => {
    dispatch(setView(viewNumber));
  };
}
