// @ts-nocheck
'use strict';

const course = require("../../course/controllers/course");
const student = require("./student");

module.exports = {

    // Get students
    async getStudents(ctx) {
        try {
            const students = await strapi
                .documents("api::student.student")
                .findMany({
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

    // Create a new student
    async createStudent(ctx) {
        try {
            const {
                student_no,
                last_name,
                first_name,
                middle_name,
                year_level,
                student_status,
                course_id,
            } = ctx.request.body;

            const createStudent = await strapi.documents('api::student.student').create({
                data: {
                    student_no: student_no,
                    last_name: last_name,
                    first_name: first_name,
                    middle_name: middle_name,
                    year_level: year_level,
                    student_status: student_status,
                    course: course_id
                },
                populate: {
                    course: true
                }
            });
            ctx.body = createStudent;
        } catch (error) {
            ctx.throw(500, error);
        }
    },

    // Update a student
    async updateStudent(ctx) {
        try {
            const { id } = ctx.params;
            const {
                student_no,
                last_name,
                first_name,
                middle_name,
                year_level,
                student_status,
                course_id,
            } = ctx.request.body;

            const updateStudent = await strapi.documents('api::student.student').update({
                documentId: id,
                data: {
                    student_no: student_no,
                    last_name: last_name,
                    first_name: first_name,
                    middle_name: middle_name,
                    year_level: year_level,
                    student_status: student_status,
                    course: course_id
                },
                populate: {
                    course: true
                }
            });
            ctx.body = updateStudent;
        } catch (error) {
            ctx.throw(500, error);
        }
    },

    // Delete a student
    async deleteStudent(ctx) {
        try {
            const { id } = ctx.params;

            const existingStudent = await strapi.documents('api::student.student').findOne({
                documentId: id
            });

            if (!existingStudent) {
                return ctx.notFound("Student not found");
            }

            const deleteStudent = await strapi.documents('api::student.student').delete({
                documentId: id
            });
            ctx.body = {
                message: "Student deleted successfully",
                data: deleteStudent,
                status: 200
            }
        } catch (error) {
            ctx.throw(500, error);
        }
    },

    // Delete all students in a course
    async deleteStudentbyCourse(ctx) {
        try {
            const { course_id } = ctx.params;

            const studentsInCourse = await strapi.documents('api::student.student').findMany({
                filters: {
                    course: {
                        documentId: course_id
                    }
                }
            });

            if (!studentsInCourse || studentsInCourse.length === 0) {
                return ctx.notFound("No students found in the course");
            }

            for (const student of studentsInCourse) {
                await strapi.documents('api::student.student').delete({
                    documentId: student.documentId
                });
            }

            ctx.body = {
                message: "Students in the course deleted successfully",
            }
            ctx.status = 200;

        } catch (error) {
            ctx.throw(500, error);
        }
    },

    // Create a new student with validation
    async createAndValidateStudent(ctx) {
        try {
            const {
                student_no,
                last_name,
                first_name,
                middle_name,
                course_id,
            } = ctx.request.body;

            if (!student_no) {
                ctx.status = 400;
                ctx.body = { message: "Student no is required" };
                return;
            }
            if (!last_name) {
                ctx.status = 400;
                ctx.body = { message: "Last name is required" };
                return;
            }
            if (!first_name) {
                ctx.status = 400;
                ctx.body = { message: "First name is required" };
                return;
            }
            if (!middle_name) {
                ctx.status = 400;
                ctx.body = { message: "Middle name is required" };
                return;
            }
            if (!course_id) {
                ctx.status = 400;
                ctx.body = { message: "Course is required" };
                return;
            }

            const existingStudent = await strapi.documents('api::student.student').findFirst({
                filters: { student_no: student_no }
            });

            if (existingStudent) {
                ctx.status = 400;
                return ctx.body = { message: "Student no is already exist" };
            }

            const createAndValidateStudent = await strapi.documents('api::student.student').create({
                data: {
                    student_no: student_no,
                    last_name: last_name,
                    first_name: first_name,
                    middle_name: middle_name,
                    course: course_id
                },
                populate: {
                    course: true
                }
            });

            ctx.body = createAndValidateStudent;
            ctx.status = 201;

        } catch (error) {
            ctx.throw(500, error);
        }
    },
}