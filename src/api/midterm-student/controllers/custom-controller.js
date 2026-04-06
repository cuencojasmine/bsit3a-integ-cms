'use strict';

module.exports = {

    async getStudentbyAgeStatus(ctx) {
        try {
            const midtermstudent = await strapi.documents('api::midterm-student.midterm-student').findMany({
                filters: {
                    age: { $between: [18, 23] }, student_status: "inactive"
                }, populate: {
                    midterm_course: true
                }
            });
            ctx.body = midtermstudent;
            ctx.status = 200;
        } catch (error) {
            ctx.throw(500, error);
        }
    }
}