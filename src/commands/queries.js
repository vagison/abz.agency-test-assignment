const createPositionsTable = `
CREATE TABLE IF NOT EXISTS positions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);
`;

const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  position_id INTEGER REFERENCES positions(id),
  photo VARCHAR(255)
);
`;

function positionsInsertionQuery(positions) {
  const positionsValues = [];
  const positionsQueryParams = [];

  positions.forEach((position, index) => {
    positionsValues.push(`($${index * 2 + 1}, $${index * 2 + 2})`);
    positionsQueryParams.push(position.id, position.name);
  });

  const positionsInsertQuery = `
          INSERT INTO positions (id, name) 
          VALUES ${positionsValues.join(', ')}
          ON CONFLICT (id) DO NOTHING;
        `;

  return [positionsInsertQuery, positionsQueryParams];
}

function usersInsertionQuery(users) {
  const usersValues = [];
  const usersQueryParams = [];

  users.forEach((user, index) => {
    usersValues.push(`($${index * 5 + 1}, $${index * 5 + 2}, $${index * 5 + 3}, $${index * 5 + 4}, $${index * 5 + 5})`);
    usersQueryParams.push(user.name, user.email, user.phone, user.position_id, user.photo);
  });

  const usersInsertQuery = `
  INSERT INTO users (name, email, phone, position_id, photo) 
  VALUES ${usersValues.join(', ')};
`;

  return [usersInsertQuery, usersQueryParams];
}

export {
  createPositionsTable, createUsersTable, positionsInsertionQuery, usersInsertionQuery,
};
