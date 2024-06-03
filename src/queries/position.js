const createPositionsTable = () => `
CREATE TABLE IF NOT EXISTS positions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);
`;

const getAllPositions = () => 'SELECT id, name FROM positions';

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

export { createPositionsTable, getAllPositions, positionsInsertionQuery };
