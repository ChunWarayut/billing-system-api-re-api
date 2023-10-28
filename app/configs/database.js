const settings = require("./settings");

const defaultSetting = {
  username: settings.MSSQL_USERNAME,
  password: settings.MSSQL_PASSWORD,
  database: settings.MSSQL_NAME,
  host: settings.MSSQL_HOST,
  port: settings.MSSQL_PORT,
  dialect: "mssql",
  charset: "utf8",
  collate: "utf8_unicode_ci",
  logging: false,
  define: {
		underscored: true,
		freezeTableName: false,
		charset: 'utf8'
	}
};

module.exports = {
  defaultSetting,
  development: defaultSetting,
  production: defaultSetting,
};