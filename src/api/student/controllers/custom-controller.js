// @ts-nocheck
'use strict';

const course = require("../../course/controllers/course");
const student = require("./student");

module.exports = {

    async getStudents(ctx) {
        try {
            const students = await strapi
                .documents("api::student.student")
                .findMany({
                    filters: {
                        course: {
                            id: 1
                        },
                        student_status: "active",
                    },
                    populate: {
                        "course": "true"
                    }
                }
                );
            ctx.body = students;
            ctx.status = 200;
        } catch (error) {
            ctx.throw(500, error);
        } 
    },

}