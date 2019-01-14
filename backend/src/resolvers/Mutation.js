const mutations = {
	async createVisitor(parent, args, ctx, info) {
		console.log('args', args)
		const visitor = await ctx.db.mutation.createVisitor(
			{
				data: {
					...args
				}
			},
			info
		);

		return visitor;
	},
	updateVisitor(parent, args, ctx, info) {
    // first take a copy of the updates
		const updates = { ...args };
		console.log('update', updates)
    // remove the ID from the updates
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updateVisitor(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
};

module.exports = mutations;
