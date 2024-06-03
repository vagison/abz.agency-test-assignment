import { resizeAndOptimizeImage } from '../utils/imageProcessing';

const temp = async (req, res, next) => {
  try {
    const userFolder = 'storage/users/1/';
    const fileName = 'output.png';
    resizeAndOptimizeImage(userFolder, fileName);
    return res.status(200).json({ message: 'ok' });
  } catch (error) {
    next(error);
  }
};

export { temp };
