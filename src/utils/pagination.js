const paginate = (req, defaultCount = 5) => {
  const page = +req.query.page || 1;
  const count = +req.query.count || defaultCount;
  const offset = (page - 1) * count;
  return { offset, count, page };
};

const generatePaginatedRes = (data, { total, page, count }) => {
  const totalPages = Math.ceil(total / count);
  return {
    data,
    meta: {
      total,
      page,
      pages: totalPages,
    },
  };
};

export { paginate, generatePaginatedRes };
