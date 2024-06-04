const constants = {
  User: {
    ExpiredToken: 'The token expired.',
    MalformedToken: 'The token malformed.',
    AlreadyExists: 'User with this phone or email already exist',
    ValidationError: 'Validation failed',
    UsernameError: 'The name must be at least 2 characters.',
    InvalidEmail: 'The email must be a valid email address.',
    PhoneRequired: 'The phone field is required.',
    PhoneNumberInvalid: 'Invalid phone number',
    PhotoTooLarge: 'The photo may not be greater than 5 Mbytes.',
    IncorrectImageFormat: 'Only .jpg and .png files are allowed!',
    UserExists: 'User with this phone or email already exist',
    UserWithIdNotExists: 'The user with the requestedid does not exist',
    UserIdNotInteger: 'The user must be an integer.',
    UserNotFound: 'User not found',
    PageNotFound: 'Page not found',
    CountNonInteger: 'The count must be an integer',
    CountNonPositive: 'The count must be a positive integer',
    PageNonInteger: 'The page must be an integer.',
    PageNonPositive: 'The page must be at least 1.',
  },
  Position: {
    PositionIdRequired: 'The position id is required.',
    PositionIdNonInteger: 'The position id must be an integer.',
    PositionIdNonPositive: 'The position id must be a positive integer.',
  },
};

export default constants;
