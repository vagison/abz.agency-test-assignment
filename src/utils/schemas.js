import { errorMessagesConstants } from '../constants';

const registrationValidatorSchema = {
  name: {
    trim: true,
    isLength: {
      options: { min: 2, max: 60 },
      errorMessage: errorMessagesConstants.User.UsernameError,
    },
  },
  email: {
    trim: true,
    // custom: {
    //   options: async (email) => {
    //     const user = await User.findOne({ email });
    //     if (user) {
    //       return Promise.reject(new Error('E-mail already in use'));
    //     }
    //     return '';
    //   },
    // },
    isEmail: {
      bail: true,
      errorMessage: errorMessagesConstants.User.InvalidEmail,
    },
  },
  phone: {
    exists: true,
    errorMessage: errorMessagesConstants.User.PhoneRequired,
  },
  position_id: {
    exists: {
      errorMessage: errorMessagesConstants.User.PositionIdRequired,
    },
    isInt: {
      errorMessage: errorMessagesConstants.User.PositionIdNonInteger,
    },
    custom: {
      options: (value) => parseInt(value, 10) > 0,
      errorMessage: errorMessagesConstants.User.PositionIdNonPositive,
    },
  },
  // photo: [
  //   'The photo may not be greater than 5 Mbytes.',
  // ],
};

export {
  registrationValidatorSchema,
};
