'use strict';

module.exports = {

    routes:[
        {
            method: 'GET',
            path: '/students/filter-by-age-status',
            handler: 'custom-controller.getStudentbyAgeStatus',
        },

    ],
    
};