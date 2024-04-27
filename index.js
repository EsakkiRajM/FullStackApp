const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const cors = require("cors");

const { connectDB } = require("./db");
const { StudentsModel, MentorsModel, AssignStudentsModel } = require("./Schema");



app.use(bodyParser.json())

app.use(cors());

connectDB();

app.get("/", (req, res) => {
    res.send("Server Working fine")
})

app.post(`/createstudents`, async (req, res) => {

    // const { studentname, batch } = req.query;

    // await StudentsModel.create({
    //     studentname,
    //     batch
    // })

    try {
        const { studentname, batch } = req.body;
        // Handle the data received from the frontend (e.g., store in database)

        await StudentsModel.create({
            studentname,
            batch
        })
        //console.log('Received data:', studentname, batch);
        // Send a response back to the frontend
        res.status(200).send('Data received successfully!');
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Server error');
    }
});

app.get("/getstudents", async (req, res) => {
    try {
        const getData = await StudentsModel.find({})
        res.status(200).json(getData)
        //console.log(getData);
    } catch (err)
     {
        console.log(err);
     }
})

// mentors requests

app.post(`/creatementors`, async (req, res) => {

    try {
        const { mentorname, course } = req.body;
        // Handle the data received from the frontend (e.g., store in database)

        await MentorsModel.create({
            mentorname,
            course
        })
        //console.log('Received data:', mentorname, mentorname);
        // Send a response back to the frontend,
        res.status(200).send('Data received successfully!');
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Server error');
    }
});

app.get("/getmentors", async (req, res) => {
    try {
        const getData = await MentorsModel.find({})
        res.status(200).json(getData)
        //console.log(getData);
    } catch (err)
     {
        console.log(err);
     }
})

app.post(`/assignstudents`, async (req, res) => {

    try {
        const { mentorId, students } = req.body;

    // Find the mentor by ID
    const mentor = await MentorsModel.findById(mentorId);

    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    // Add the students to the mentor's students array
    mentor.students.push(students);

    console.log(students);

    // Save the mentor with updated students array
    await mentor.save();

    res.status(200).json({ message: 'Students assigned successfully' });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Server error');
    }
});


app.listen(4000, () => {
    console.log("Server started");
})


