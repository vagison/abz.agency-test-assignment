const constants = {
  User: {
    ExpiredToken: 'The token expired.',
    MalformedToken: 'The token malformed.',
    AlreadyExists: 'User with this phone or email already exist',
    ValidationError: 'Validation failed',
    UsernameError: 'The name must be at least 2 characters.',
    InvalidEmail: 'The email must be a valid email address.',
    PhoneRequired: 'The phone field is required.',
    PositionIdRequired: 'The position id is required.',
    PositionIdNonInteger: 'The position id must be an integer.',
    PositionIdNonPositive: 'The position id must be a positive integer.',
  },
};

export default constants;
