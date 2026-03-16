'use strict';

const { routes } = require("../../student-info/routes/custom-routes");

module.exports = {

    routes:[
        {
            method: 'GET',
            path: '/students/list',
            handler: 'custom-controller.getStudents',
        }
    ],
    
};