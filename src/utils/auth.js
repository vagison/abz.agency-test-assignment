import jwt from 'jsonwebtoken';
import { jwtConfig } from '../configs';

const generateJWT = () => jwt.sign({ signed: 'true' }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });

const setAuthResponse = (res, token) => {
  res.setHeader('Token', token);
};

export { generateJWT, setAuthResponse };
