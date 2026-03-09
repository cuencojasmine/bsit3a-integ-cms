module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/test',
            handler: 'custom-controller.testApi',
        },

        {
            method: 'GET',
            path: '/student-infos/list',
            handler: 'custom-controller.getStudentList',
        },
    ]
}