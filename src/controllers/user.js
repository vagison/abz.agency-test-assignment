import { responseMessagesConstants } from '../constants';

function registration(req, res, next) {
  return res.status(200).json({
    success: true,
    user_id: 23,
    message: responseMessagesConstants.User.Registration,
  });
}

export { registration };
