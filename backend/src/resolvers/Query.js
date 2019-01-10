const Query = {
  async visitantes(parent, args, ctx, info) {
    const visitor = await ctx.db.query.visitors();
    return visitor;
  }
};

module.exports = Query;
