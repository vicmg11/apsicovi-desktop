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
	}
};

module.exports = mutations;
