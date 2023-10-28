const moment = require('moment')

module.exports = {
	up: async (queryInterface) => {
		const defaultField = {
			created_at: moment().toDate(),
			created_by: '',
			updated_at: moment().toDate(),
			updated_by: ''
		}
		await queryInterface.bulkInsert('permission', [
			{
				code: "USER_CREATE",
				name: "Can create user",
				...defaultField
			},
			{
				code: "USER_READ",
				name: "Can access user",
				...defaultField
			},
			{
				code: "USER_UPDATE",
				name: "Can udate user",
				...defaultField
			},
			{
				code: "USER_DELETE",
				name: "Can delete user",
				...defaultField
			},
			{
				code: "ROLE_CREATE",
				name: "Can creat role",
				...defaultField
			},
			{
				code: "ROLE_READ",
				name: "Can access role",
				...defaultField
			},
			{
				code: "ROLE_UPDATE",
				name: "Can update role",
				...defaultField
			},
			{
				code: "ROLE_DELETE",
				name: "Can delete role",
				...defaultField
			},
			{
				code: "RECEIVE_PAYMENT_CREATE",
				name: "Can create payment reveive",
				...defaultField
			},
			{
				code: "RECEIVE_PAYMENT_READ",
				name: "Can access payment reveive",
				...defaultField
			},
			{
				code: "RECEIVE_PAYMENT_UPDATE",
				name: "Can update payment reveive",
				...defaultField
			},
			{
				code: "RECEIVE_PAYMENT_DELETE",
				name: "Can delete payment reveive",
				...defaultField
			},
			{
				code: "LOG_READ",
				name: "Can access log",
				...defaultField
			}
		])
	},
	down: async (queryInterface) => {
		await queryInterface.bulkDelete('permission')
	}
}
