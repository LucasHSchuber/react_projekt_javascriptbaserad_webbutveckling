const express = require('express')
const router = express.Router()
const Accounting = require('../models/accountingModel')

//----------------------
//GETTING ALL POSTS
//---------------------_
router.get('/', async (req, res) => {

    try {
        const accounting = await Accounting.find()
        res.json(accounting)
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

router.post('/newaccounting', async (req, res) => {
    const accounting = new Accounting({
        id: req.body.id,
        userId: req.body.userId,
        date: req.body.date,
        companyName: req.body.companyName,
        comment: req.body.comment,
        entries: req.body.entries
    })
    try {
        const newAccounting = await accounting.save()
        res.status(201).json(newAccounting)

    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})



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