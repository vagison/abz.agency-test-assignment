import { errorMessagesConstants } from '../constants';

const fileFilter = (req, file, cb) => {
  // Accept only jpg and png files
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error(errorMessagesConstants.User.IncorrectImageFormat), false);
  }
};

export { fileFilter };
