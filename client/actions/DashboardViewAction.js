import { SET_NAVBAR_RIGHT_VIEW, SHOW_DASHBOARD_PAGE,
  SHOW_INITIAL_DASHBOARD_PAGE, SCREEN_SIZE, } from './ActionTypes';

/**
 * @description set view number action
 * 
 * @param  {number} viewNumber the number that detemines what to show in the right navbar
 * 
 * @return {object} dispatch object
 */
export function setView(viewNumber) {
  return {
    type: SET_NAVBAR_RIGHT_VIEW,
    viewNumber
  };
}

/**
 * @description set the size of a current screen
 * 
 * @param  {number} screenSize the number determines weather the screen size
 * 
 * @return {object} dispatch object
 */
export function isSmallScreenSize(screenSize) {
  return {
    type: SCREEN_SIZE,
    screenSize
  };
}

/**
 * @description set view in the  dashboard page
 * 
 * @param  {number} showForm determines which form to show in the dashboard page
 * @return {object} dispatch object
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
 * @param  {number} initialPage the page number shown before the current dashboard page
 * 
 * @return {object} dispatch object
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
 * @param  {number} currentForm the current dashboard page number
 * @param  {number} oldForm the former dashboard page number
 * 
 * @return {object} dispatch object
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
 * @param  {number} viewNumber the view number of the right side bar
 * 
 * @return {object} dispatch object
 */
export function setRightNavBarView(viewNumber) {
  return (dispatch) => {
    dispatch(setView(viewNumber));
  };
}

/**
 * @description checks for small screen size 
 * 
 * @param  {number} screenSize
 * 
 * @return {object} returns object
 */
export function smallScreenSize(screenSize) {
  return (dispatch) => {
    dispatch(isSmallScreenSize(screenSize));
  };
}
