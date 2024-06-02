import { generateJWT, setAuthResponse } from '../utils/auth';

async function getToken(req, res, next) {
  try {
    const token = generateJWT();
    setAuthResponse(res, token);
    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    next(error);
  }
}

export { getToken };
