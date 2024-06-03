const createUsersTable = () => `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  position_id INTEGER REFERENCES positions(id),
  registration_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  photo VARCHAR(255)
);
`;

const usersInsertionQuery = (users) => {
  const usersValues = [];
  const usersQueryParams = [];

  users.forEach((user, index) => {
    usersValues.push(`($${index * 5 + 1}, $${index * 5 + 2}, $${index * 5 + 3}, $${index * 5 + 4}, $${index * 5 + 5})`);
    usersQueryParams.push(user.name, user.email, user.phone, user.position_id, user.photo);
  });

  const usersInsertQuery = `
      INSERT INTO users (name, email, phone, position_id, photo) 
      VALUES ${usersValues.join(', ')}
      RETURNING *;
    `;

  return [usersInsertQuery, usersQueryParams];
};

const getAllUsers = (count, offset) => `SELECT * FROM users LIMIT ${count} OFFSET ${offset}`;

const getAllUsersCount = () => 'SELECT count(*) AS count FROM users;';

const getUserById = (id) => `SELECT * FROM users WHERE id=${id};`;

const getUserWithEmail = (email) => `SELECT * FROM users WHERE email='${email}';`;

const getUserWithPhoneNumber = (phone) => `SELECT * FROM users WHERE phone='${phone}';`;

export {
  createUsersTable, usersInsertionQuery, getAllUsers, getAllUsersCount, getUserById, getUserWithPhoneNumber, getUserWithEmail,
};
