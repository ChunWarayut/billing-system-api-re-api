const moment = require('moment')
module.exports = {
	up: async (queryInterface) => {
		const defaultField = {
			created_at: moment().toDate(),
			created_by: 1,
			updated_at: moment().toDate(),
			updated_by: 1
		}
		const roles = await queryInterface.sequelize.query(`SELECT id FROM role WHERE code = 'ADMIN'`, {
			type: queryInterface.sequelize.QueryTypes.SELECT
		})
		const permissions = await queryInterface.sequelize.query('SELECT id FROM permission', {
			type: queryInterface.sequelize.QueryTypes.SELECT
		})
		const rolePermission = []

		roles.forEach((role) => {
			permissions.forEach((perm) => {
				rolePermission.push({ role_id: role.id, permission_id: perm.id, ...defaultField })
			})
		})
		await queryInterface.bulkInsert('role_permission', rolePermission)	
	},
	down: async () => {
		await queryInterface.bulkDelete('role_permission')
	}
}
