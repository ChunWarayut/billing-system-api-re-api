const moment = require('moment')
module.exports = {
	up: async (queryInterface) => {
		const defaultField = {
			created_at: moment().toDate(),
			updated_at: moment().toDate(),
		}
		await queryInterface.bulkInsert('sequencenumber', [
			{
				format: "YYMMDD",
				lastestno: 0,
				...defaultField
			}
		])
	},
	down: async (queryInterface) => {
		await queryInterface.bulkDelete('sequencenumber')
	}
}
