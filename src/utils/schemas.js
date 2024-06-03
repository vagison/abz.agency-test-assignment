import { errorMessagesConstants } from '../constants';
import { usersQueries } from '../queries';
import { db } from './db';

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
    isEmail: {
      bail: true,
      errorMessage: errorMessagesConstants.User.InvalidEmail,
    },
    custom: {
      options: async (email) => {
        const user = (await db.query(usersQueries.getUserWithEmail(email))).rowCount;
        if (user) {
          return Promise.reject(new Error(errorMessagesConstants.User.UserExists));
        }
        return '';
      },
    },
  },
  phone: {
    exists: true,
    errorMessage: errorMessagesConstants.User.PhoneRequired,
    custom: {
      options: async (phone) => {
        if (!phone.startsWith('+380')) {
          return Promise.reject(new Error(errorMessagesConstants.User.PhoneNumberInvalid));
        }

        const user = (await db.query(usersQueries.getUserWithPhoneNumber(phone))).rowCount;
        if (user) {
          return Promise.reject(new Error(errorMessagesConstants.User.UserExists));
        }

        return '';
      },
    },
  },
  position_id: {
    exists: {
      errorMessage: errorMessagesConstants.Position.PositionIdRequired,
    },
    isInt: {
      errorMessage: errorMessagesConstants.Position.PositionIdNonInteger,
    },
    custom: {
      options: (value) => parseInt(value, 10) > 0,
      errorMessage: errorMessagesConstants.Position.PositionIdNonPositive,
    },
  },
};

const getUsersValidatorSchema = {
  count: {
    optional: true,
    isInt: {
      errorMessage: errorMessagesConstants.User.CountNonInteger,
    },
    custom: {
      options: (value) => parseInt(value, 10) > 0,
      errorMessage: errorMessagesConstants.User.CountNonPositive,
    },
  },
  page: {
    optional: true,
    isInt: {
      errorMessage: errorMessagesConstants.User.PageNonInteger,
    },
    custom: {
      options: (value) => parseInt(value, 10) > 0,
      errorMessage: errorMessagesConstants.User.PageNonPositive,
    },
  },
};

export {
  registrationValidatorSchema,
  getUsersValidatorSchema,

};
