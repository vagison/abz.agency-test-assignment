import { generateJWT, setAuthResponse } from '../utils/auth';
import { usedTokens } from '../middlewares/jwt';

async function getToken(req, res, next) {
  try {
    const token = generateJWT();
    setAuthResponse(res, token);
    usedTokens[token] = {
      used: false,
      expiration: Date.now(),
    };
    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    next(error);
  }
}

export { getToken };
