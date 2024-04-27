const { mongoose } = require('./db');

const Schema = mongoose.Schema;

const Students = new Schema({
    studentname: {type: String},
    batch: {type: String}
})

const Mentors = new Schema({
    mentorname: {type: String},
    course: {type: String},
    students: {type: Array}
})

const AssignStudents = new Schema({
    studentname: {type: String},
    batch: {type: String}
})


const StudentsModel = mongoose.model("students", Students)
const MentorsModel = mongoose.model("mentors", Mentors)
const AssignStudentsModel = mongoose.model("assignstudents", AssignStudents)

module.exports = {
    StudentsModel,
    MentorsModel,
    AssignStudentsModel
}