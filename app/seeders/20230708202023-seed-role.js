const moment = require('moment')

module.exports = {
	up: async (queryInterface) => {
		const defaultField = {
			created_at: moment().toDate(),
			created_by: '',
			updated_at: moment().toDate(),
			updated_by: ''
		}
		await queryInterface.bulkInsert('role', [
			{
				code: "ADMIN",
				name: "Admin",
				...defaultField
			}
		])
	},
	down: async (queryInterface) => {
		await queryInterface.bulkDelete('role')
	}
}
