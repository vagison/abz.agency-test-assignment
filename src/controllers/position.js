function getPositions(req, res, next) {
  return res.status(200).json({
    success: true,
    positions: [
      {
        id: 1,
        name: 'Lawyer',
      },
      {
        id: 2,
        name: 'Content manager',
      },
      {
        id: 3,
        name: 'Security',
      },
      {
        id: 4,
        name: 'Designer',
      }],
  });
}

export { getPositions };
