'use strict';

angular.module('htc.services')

.factory('routerService', function () {
  var baseURL = 'http://192.168.150.64:5000/htc/api/';

  return {
    loginUrl: baseURL + 'login',
    createUserUrl: baseURL + 'user',
    getUserUrl: baseURL + 'user/',
    getReportUrl: baseURL + 'report/',
    getAbuseUrl: baseURL + 'abuse/',
    getListUserUrl: baseURL + 'user',
    deleteUserUrl: baseURL + 'user/',
    updateUserUrl: baseURL + 'user/',
    getListAbuseUrl: baseURL + 'abuse',
    deleteAbuseUrl: baseURL + 'abuse/',
    updateAbuseUrl: baseURL + 'abuse/',
    getListAbuseCategoryUrl: baseURL + 'abuseCategory',
    getListReportUrl: baseURL + 'report',
    deleteReportUrl: baseURL + 'report/',
    updateReportUrl: baseURL + 'report/',
    getListReportCategoryUrl: baseURL + 'reportCategory'
  };
});