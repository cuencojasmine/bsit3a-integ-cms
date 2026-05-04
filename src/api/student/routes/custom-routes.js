'use strict';

const { routes } = require("../../student-info/routes/custom-routes");

module.exports = {

    routes:[
        {
            method: 'GET',
            path: '/students/list',
            handler: 'custom-controller.getStudents',
        },

        {
            method: 'POST',
            path: '/students/create',
            handler: 'custom-controller.createStudent',
        },

        {
            method: 'PUT',
            path: '/students/update/:id',
            handler: 'custom-controller.updateStudent',
        },

        {
            method: 'DELETE',
            path: '/students/delete/:id',
            handler: 'custom-controller.deleteStudent',
        }
    ],
    
};