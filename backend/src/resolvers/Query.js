const { forwardTo } = require('prisma-binding');

const Query = {
  visitors: forwardTo('db'),
  visitor: forwardTo('db'),
};

module.exports = Query;
