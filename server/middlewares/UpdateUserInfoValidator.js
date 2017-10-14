import { isText, isInValidField } from '../helpers/index';

/** @class UpdateUser
 * @classdesc validate update user details field
 */
export default class UpdateUserInfoValidator {
  /**
   * constructor - contains the constructor
   * @param  {type} user the properties of the class UpdateUser
   * @return {void} no return or void
   */
  constructor(user) {
    this.error = {};
    this.user = user;
  }

  /**
 * @description checks for field that was updated
 * 
 * @param  {object} data user object
 * 
 * @return {void} returns void
 */
  filterUserData(data) {
    const { fullName, email, phoneNumber } = this.user;
    const shouldUpdate = [];

    if (fullName !== null && fullName !== undefined &&
    fullName !== data.fullName) {
      shouldUpdate.push([fullName, 1]);
    }
    if (email !== null && email !== undefined && email !== data.email) {
      shouldUpdate.push([email, 3]);
    }
    if (phoneNumber !== null && phoneNumber !== undefined &&
    phoneNumber !== data.phoneNumber) {
      shouldUpdate.push([phoneNumber, 4]);
    }
    return shouldUpdate;
  }

  /** 
 * @description validate username field
 * 
 * @param  {string} fullName 
 * 
 * @return {void} returns void
 */
  validateFullname(fullName) {
    if (isInValidField(fullName)) {
      this.error.fullName = 'This field is required';
    } else if (!isText(fullName) || fullName.length < 5) {
      this.error.fullName = `Name should contain alphabet and space 
      alone and should contain at least 5 characters`;
    }
  }

  /**
 * @description validate email field
 * 
 * @param  {string} email
 * 
 * @return {void} no returns
 */ 
  validateEmail(email) {
    if (isInValidField(email)) {
      this.error.email = 'This field is required';
    } else if ((email.slice(email.length - 4, email.length)
     !== '.com' || !(/[@]/.test(email)))) {
      this.error.email = 'Invalid email';
    }
  }

  /**
 * @description validate phone number field
 * 
 * @param  {String} phoneNumber user phone number
 * 
 * @return {void} no return
 */
  validatePhoneNumber(phoneNumber) {
    if (isInValidField(phoneNumber)) {
      this.error.phoneNumber = 'This field is required';
    } else if (phoneNumber.length !== 11) {
      this.error.phoneNumber = 'Invalid phone number';
    }
  }
}
