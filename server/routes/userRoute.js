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
//CREATING USER
//---------------------_
router.post('/register', async (req, res) => {
    // const { id, name, email, password, company, regdate, verifypassword } = req.body;

    // Check for validation errors
    const validationErrors = [];

    if (req.body.password !== req.body.verifypassword) {
        validationErrors.push("Passwords do not match");
    }

    if (req.body.password.length <= 4) {
        validationErrors.push("Password must be at least four characters");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(req.body.email)) {
        validationErrors.push("Invalid email address");
    }

    if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
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

        if (err.name === 'ValidationError') {

            const errors = Object.values(err.errors).map((error) => error.message);
            return res.status(400).json({ message: 'Validation error', errors });
        }

        if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {

            return res.status(400).json({ message: 'Email address is already in use' });
        }


        res.status(500).json({ message: 'Internal server error' });
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
        const filter = { id: user.id };
        const update = {
            $set: {
                token: token
            }
        };

        const result = await User.updateOne(filter, update);

        //send token to client
        res.json({
            token: token,
            userId: user.id,
            userName: user.name,
        });

    } catch (err) {

        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map((error) => error.message);
            return res.status(400).json({ message: 'Validation error', errors });
        }

        res.status(500).json({ message: 'Internal server error' });
    }
})



//----------------------
// GET SIGNED IN USER
//---------------------

// Assuming you're using Express.js
router.get('/logedinuser', async (req, res) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '');
        const user = await User.findOne({ token: token });

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        res.json(user);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});





// //----------------------
// //UPDATING DATA
// //----------------------

router.patch('/:id', getUser, async (req, res) => {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (req.body.email != null && !emailPattern.test(req.body.email)) {
        return res.status(401).json({ message: "Invalid email address" });
    }

    if (req.body.name != null) {
        res.user.name = req.body.name
    }
    if (req.body.company != null) {
        res.user.company = req.body.company
    }
    if (req.body.email != null) {
        res.user.email = req.body.email
    }


    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})




// //----------------------
// //UPDATING PASSWORD
// //----------------------

// Update user password
router.patch('/updatepassword/:id', async (req, res) => {
    try {

        if (!req.body.id || !req.body.currentpassword || !req.body.password || !req.body.repeatpassword) {
            return res.status(400).json({ message: "Invalid input data" });
        }

        console.log("User ID:", req.body.id);
        const user = await User.findOne({ id: req.body.id });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordValidate = await bcrypt.compare(req.body.currentpassword, user.hashed_password);
        if (!passwordValidate) {
            return res.status(401).json({ message: "Invalid current password" });
        }

        if (req.body.password !== req.body.repeatpassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        if (req.body.password.length < 5) {
            return res.status(400).json({ message: "Password must be at least five characters" });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);


        if (user) {
            user.hashed_password = hashedPassword;
            const updatedUser = await user.save();
            res.json(updatedUser)

        } else {
            res.status(400).json({ message: err.message })
        }

    } catch (err) {
        console.error("Error in updatepassword:", err);
        res.status(500).json({ message: "Internal server error", details: err.message });
    }
});






// //----------------------
// //DELETING
// //----------------------

router.delete('/deleteuser', async (req, res) => {

    const user = await User.findOne({ id: req.body.id });

    if (!user) {
        return res.status(401).json({ message: "Invalid password. Can't find user" })
    }

    const passwordValidate = await bcrypt.compare(req.body.password, user.hashed_password)

    if (!passwordValidate) {
        return res.status(401).json({ message: "Invalid password" })
    } else {

        try {
            await User.deleteOne({ id: user.id });
            res.json({ message: "User Deleted" })
        } catch (err) {
            res.status(500).json({ message: err.message })
        }


    }



})


// router.delete('/:id', async (req, res) => {
//     try {
//         await res.User.deleteOne()
//         res.json({ message: "Course Deleted" })
//     } catch (err) {
//         res.status(500).json({ message: err.message })
//     }
// })


async function getUser(req, res, next) {
    try {
        const user = await User.findOne({ id: req.params.id });
        if (!user) {
            return res.status(404).json({ message: "Cannot find user" });
        }
        res.user = user;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


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