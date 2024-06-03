import path from 'path';
import fs from 'fs/promises';
import createHttpError from 'http-errors';

import { errorMessagesConstants, responseMessagesConstants } from '../constants';
import { usersQueries } from '../queries';
import { db } from '../utils/db';
import { generatePaginatedRes, paginate } from '../utils/pagination';
import { resizeAndOptimizeImage } from '../utils/imageProcessing';

function links(paginatedResult, req) {
  const pageURL = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const links = {
    next_url: null,
    prev_url: null,
  };

  if (paginatedResult.meta.page !== paginatedResult.meta.pages) {
    links.next_url = pageURL
      .replace(`page=${paginatedResult.meta.page}`, `page=${paginatedResult.meta.page + 1}`);
  }

  if (paginatedResult.meta.page > 1) {
    links.prev_url = pageURL
      .replace(`page=${paginatedResult.meta.page}`, `page=${paginatedResult.meta.page - 1}`);
  }

  return links;
}

async function registration(req, res, next) {
  // Creating user object, then the query and then querying the DB
  const user = {
    name: req.body.name,
    email: req.body.email,
    position_id: req.body.position_id,
    phone: req.body.phone,
  };

  const [usersInsertQuery, usersQueryParams] = usersQueries.usersInsertionQuery([user]);
  const userInDB = (await db.query(usersInsertQuery, usersQueryParams)).rows[0];
  const userId = userInDB.id.toString();

  // If the user has a photo
  if (req.file) {
    // Creating a folder for the user
    const userFolderPath = path.resolve(__dirname, '..', '..', 'storage', 'users', userId);
    await fs.mkdir(userFolderPath, { recursive: true });

    // Processing the photo and saving to user's folder
    const sourceFilePath = req.file.path;
    const destinationFilePath = path.resolve(userFolderPath, req.file.originalname);
    await resizeAndOptimizeImage(sourceFilePath, destinationFilePath);

    // Updating user in the DB after resolving the photo path
    await db.query(
      `UPDATE users SET photo = '/storage/${destinationFilePath.split('/storage/')[1]}' WHERE id = ${userId};`,
    );
  }

  return res.status(200).json({
    success: true,
    user_id: userId,
    message: responseMessagesConstants.User.Registration,
  });
}

async function getUsers(req, res, next) {
  try {
    const pagination = paginate(req);

    const getAllUsersCountQuery = usersQueries.getAllUsersCount();
    const allUsersCount = +((await db.query(getAllUsersCountQuery)).rows[0].count);

    if (allUsersCount.length < 1) {
      throw createHttpError.NotFound(errorMessagesConstants.User.PageNotFound);
    }

    const getUsersQuery = usersQueries.getAllUsers(pagination.count, pagination.offset);
    const usersDBObject = (await db.query(getUsersQuery));
    const users = usersDBObject.rows;

    const paginatedResult = generatePaginatedRes(users, { total: allUsersCount, page: pagination.page, count: pagination.count });

    return res.status(200).json({
      success: true,
      page: paginatedResult.meta.page,
      total_pages: paginatedResult.meta.pages,
      total_users: allUsersCount,
      count: pagination.count,
      links: links(paginatedResult, req),
      users: paginatedResult.data,
    });
  } catch (error) {
    next(error);
  }
}

async function getUserById(req, res, next) {
  try {
    const userId = +req.params.id;

    if (!Number.isInteger(userId)) {
      const err = createHttpError.NotFound(errorMessagesConstants.User.UserWithIdNotExists);
      err.fails = {
        userId: [
          errorMessagesConstants.User.UserIdNotInteger,
        ],
      };
      throw err;
    }

    const query = usersQueries.getUserById(userId);
    const userDBObject = (await db.query(query));
    const user = userDBObject.rows[0];

    if (!user) {
      throw createHttpError.NotFound(errorMessagesConstants.User.UserNotFound);
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
}

export { registration, getUsers, getUserById };
