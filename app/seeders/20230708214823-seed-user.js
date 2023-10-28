const moment = require('moment')
module.exports = {
	up: async (queryInterface) => {
		const defaultField = {
			created_at: moment().toDate(),
			created_by: 1,
			updated_at: moment().toDate(),
			updated_by: 1
		}
		const roleAdmins = await queryInterface.sequelize.query(`SELECT id FROM dbo.role WHERE code = 'ADMIN'`, {
			type: queryInterface.sequelize.QueryTypes.SELECT
		})
		const user = []
		roleAdmins.forEach((role) => {
			user.push({ 
				username: "admin",
				password: "$2b$11$ee8XtUwbxqwg98Y255wjpOJgMoIKEF6BOgXwtOHhibJveNbEsx3Ca",
				firstname: "admin",
				lastname: "admin",
				role_id: role.id,
				mobile: "0000000000",
				...defaultField
			})
		})
		await queryInterface.bulkInsert('users', user)	
	},
	down: async () => {
		await queryInterface.bulkDelete('users')
	}
}
