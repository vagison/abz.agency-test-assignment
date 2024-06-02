import { faker } from '@faker-js/faker';
import { connectToDb, client } from '../utils/db';
import {
  createPositionsTable, createUsersTable, positionsInsertionQuery, usersInsertionQuery,
} from './queries';

function generateUkrainePhoneNumber() {
  const countryCode = '+380'; // Ukraine country code
  const operatorCodes = ['50', '63', '66', '67', '68', '73', '91', '92', '93', '94', '95', '96', '97', '98', '99']; // Ukrainian mobile operator codes
  const areaCode = operatorCodes[Math.floor(Math.random() * operatorCodes.length)];
  const subscriberNumber = (() => {
    const min = 0;
    const max = 9999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber.toString().padStart(7, '0');
  })();

  return `${countryCode} ${areaCode} ${subscriberNumber}`;
}

function generateRandomUser() {
  const user = {
    email: '',
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phone: generateUkrainePhoneNumber(),
    position_id: 1,
  };

  user.email = faker.internet.email({
    firstName: user.firstName,
    lastName: user.lastName,
    provider: 'fake.com',
  });
  user.email = user.email.toLowerCase();
  user.name = `${user.firstName} ${user.lastName}`;
  delete user.firstName;
  delete user.lastName;

  return user;
}

function generateRandomUsers(numberOfUsers) {
  return Array.from({ length: numberOfUsers }, () => generateRandomUser());
}

function generateRandomPosition() {
  return faker.person.jobTitle();
}

function generateRandomPositions(numberOfPositions) {
  const positions = [];

  for (let index = 0; index < numberOfPositions; index++) {
    positions.push({ id: index + 1, name: generateRandomPosition() });
  }

  return positions;
}

async function writeToDb(positions, users) {
  await connectToDb();

  // =================================================
  // Creating positions and users tables
  await client.query(createPositionsTable);
  console.log('Table "positions" created successfully');

  await client.query(createUsersTable);
  console.log('Table "users" created successfully');
  // =================================================

  // =====================================================================================
  // Inserting data into positions and users tables
  const [positionsInsertQuery, positionsQueryParams] = positionsInsertionQuery(positions);
  await client.query(positionsInsertQuery, positionsQueryParams);
  console.log('Data inserted into "positions" table successfully');

  const [usersInsertQuery, usersQueryParams] = usersInsertionQuery(users);
  await client.query(usersInsertQuery, usersQueryParams);
  console.log('Data inserted into "users" table successfully');
  // =====================================================================================
}

async function run() {
  try {
    // Creating positions and users with the help of faker-js
    const positions = generateRandomPositions(100);
    const users = generateRandomUsers(45).map((user) => ({ ...user, position_id: Math.floor(Math.random() * 100) + 1 }));

    // Writing generated data into db
    await writeToDb(positions, users);

    // Exiting process on success
    process.exit();
  } catch (err) {
    console.error('Error creating table', err.stack);
  }
}

run();
