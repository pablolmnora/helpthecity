'use strict';

var models = require('../models'),
	sequelize = models.sequelize;

var ReportDAO = {
	create: function (report) {
		return sequelize.query('INSERT INTO report(date, description, image, latitude, longitude, precision, "reportCategoryId", "userId") VALUES (to_timestamp(?), ?, ?, ?, ?, ?, ?, ?) RETURNING id', {
			replacements: [
			report.date,
			report.description,
			report.image,
			report.latitude,
			report.longitude,
			report.precision,
			report.reportCategoryId,
			report.userId,
		],
			type: sequelize.QueryTypes.INSERT,
			model: models.Report
		}).then(function (id) {
			return id[0];
		}).catch(function (err) {
			return err.message;
		});
	},
	update: function (report) {
		return sequelize.query('UPDATE report SET date=to_timestamp(?), description=?, image=?, latitude=?, longitude=?, precision=?, "reportCategoryId"=?, "userId"=? WHERE id = ? RETURNING id', {
			replacements: [
			report.date,
			report.description,
			report.image,
			report.latitude,
			report.longitude,
			report.precision,
			report.reportCategoryId,
			report.userId,
			report.id
		],
			type: sequelize.QueryTypes.UPDATE,
			model: models.Report
		}).then(function (id) {
			return id[0];
		}).catch(function (err) {
			return err.message;
		});
	},
	delete: function (id) {
		return sequelize.query('DELETE FROM report WHERE id = ?', {
			replacements: [id],
			type: sequelize.QueryTypes.DELETE,
			model: models.Report
		}).then(function (ok) {
			return ok[0];
		}).catch(function (err) {
			return err.message;
		});
	},
	readById: function (id) {
		return sequelize.query('SELECT * FROM report WHERE id = ?', {
			replacements: [id],
			type: sequelize.QueryTypes.SELECT,
			model: models.Report
		}).then(function (report) {
			return report[0];
		}).catch(function (err) {
			return err.message;
		});
	},
	readByCriteria: function (criteria) {
		return sequelize.query(createQuery(criteria), {
			type: sequelize.QueryTypes.SELECT,
			model: models.Report
		}).then(function (reports) {
			return reports;
		}).catch(function (err) {
			return err.message;
		});
	},
	readAllWithUsers: function () {
		return models.Report.findAll({
			include: [{
				model: models.User
				}],
			order: 'date DESC',
			limit: 5
		}).then(function (reports) {
			reports.forEach(function (report) {
				report.User.password = '';
				report.User.cpf = '';
			});
			return reports;
		});
	}
};

module.exports = ReportDAO;

function createQuery(criteria) {
	var query = 'SELECT * FROM report WHERE 1=1';
	if (criteria.date) {
		query += ' AND date = \'to_timestamp(' + criteria.date + '\')';
	}
	if (criteria.description) {
		query += ' AND description = \'' + criteria.description + '\'';
	}
	if (criteria.image) {
		query += ' AND image = ' + criteria.image;
	}
	if (criteria.latitude) {
		query += ' AND latitude >= ' + (criteria.latitude - (criteria.coverageRadius / 2)) + ' AND latitude <= ' + (criteria.latitude + (criteria.coverageRadius / 2));
	}
	if (criteria.longitude) {
		query += ' AND longitude >= ' + (criteria.longitude - (criteria.coverageRadius / 2)) + ' AND longitude <= ' + (criteria.longitude + (criteria.coverageRadius / 2));
	}
	if (criteria.precision) {
		query += ' AND precision = ' + criteria.precision;
	}
	if (criteria.reportCategoryId) {
		query += ' AND "reportCategoryId" = ' + criteria.reportCategoryId;
	}
	if (criteria.userId) {
		query += ' AND "userId" = ' + criteria.userId;
	}
	query += 'ORDER BY date';
	return query;
};