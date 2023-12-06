const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const bcrypt = require("bcrypt");
const crypto = require('crypto');


function generateRandomToken(length) {
    return crypto.randomBytes(length).toString('hex');
}

//----------------------
//GETTING ALL POSTS
//---------------------_
router.get('/', async (req, res) => {

    try {
        const user = await User.find()
        res.json(user)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// //----------------------
// //GETTING ONE POST
// //---------------------_

// router.get('/:id', getCourse, (req, res) => {
//     res.json(res.course)
// })



//----------------------
//CREATING POST
//---------------------_
router.post('/register', async (req, res) => {
    // const { id, name, email, password, company, regdate, verifypassword } = req.body;

    //if passwords not match
    if (req.body.password !== req.body.verifypassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
    //if password is less than 5 in length
    if (req.body.password.length <= 4) {
        return res.status(401).json({ message: "Password must be at least four characters" });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(req.body.email)) {
        return res.status(401).json({ message: "Invalid email address" });
    }

    // Hash the password before saving to mongodb
    const hashed_password = await bcrypt.hash(req.body.password, 10);
    const token = "NoToken";

    const user = new User({
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        hashed_password: hashed_password,
        company: req.body.company,
        regdate: req.body.regdate,
        token: token
    });

    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})



//----------------------
//LOGIN USER
//---------------------_
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const passwordValidate = await bcrypt.compare(req.body.password, user.hashed_password)

        if (!passwordValidate) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const token = generateRandomToken(10);
        console.log(token);
        //update token in mongodb
        const filter = { id: user.id }; // Replace with the actual filter criteria
        const update = {
            $set: {
                token: token // Replace with the key-value pairs you want to update
            }
        };

        const result = await User.updateOne(filter, update);

        //send token to client
        res.json({ token: token });

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})



//----------------------
// GET SIGNED IN USER
//---------------------

// Assuming you're using Express.js
router.get('/logedinuser', async (req, res) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', ''); // Extract the token from the Authorization header
        const user = await User.findOne({ token: token });

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        res.json(user);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});




module.exports = router;




// //----------------------
// //UPDATING
// //----------------------

// router.patch('/:id', getCourse, async (req, res) => {
//     if (req.body.courseId != null) {
//         res.course.courseId = req.body.courseId
//     }
//     if (req.body.courseName != null) {
//         res.course.courseName = req.body.courseName
//     }
//     if (req.body.coursePeriod != null) {
//         res.course.coursePeriod = req.body.coursePeriod
//     }

//     try {
//         const updatedCourse = await res.course.save()
//         res.json(updatedCourse)
//     } catch (err) {
//         res.status(400).json({ message: err.message })
//     }
// })



// //----------------------
// //DELETING
// //----------------------

// router.delete('/:id', getCourse, async (req, res) => {
//     try {
//         await res.course.deleteOne()
//         res.json({ message: "Course Deleted" })
//     } catch (err) {
//         res.status(500).json({ message: err.message })
//     }
// })




// //getCourse method
// async function getCourse(req, res, next) {
//     try {
//         course = await Course.findById(req.params.id)
//         if (course == null) {
//             return res.status(404).json({ message: "cannot find course" })
//         }
//     } catch (err) {
//         return res.status(500).json({ message: err.message })
//     }

//     res.course = course
//     next()
// }


module.exports = router