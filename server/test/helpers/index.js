const errorMessages = {
  authenticationError: 'Authentication failed. wrong username or password.',
  inValidNameError: `Name should contain alphabet and space 
      alone and should contain at least 5 characters`,
  inValidUserNameError: `Invalid username. username must
      contain an alphabet and must not begin with a number`,
  inValidPasswordError: `Weak password. Password should contain
        at least 8 characters including at least one number and alphabet`,
  weakPasswordError: {
    lengthError: 'Password should contain at least 8 characters',
    noCharError: 'Password should contain at least one character',
    noNumError: 'Password should contain at least one number'
  }
};

export default errorMessages;
