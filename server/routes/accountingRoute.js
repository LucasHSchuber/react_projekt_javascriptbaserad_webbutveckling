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


//----------------------
//GETTING ONE POST
//---------------------_

// router.get('/:id', getAccounting, (req, res) => {
//     res.json(res.accounting)
// })



//----------------------
//GETTING ONE POST WHERE ID = USERID
//---------------------_

router.get('/acc', async (req, res) => {
    const userId = req.query.userId;

    try {
        const userAccountings = await Accounting.find({ userId: userId });
        res.json(userAccountings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});






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
        created_at: req.body.created_at,
        invoiceNmbr: req.body.invoiceNmbr,
        entries: req.body.entries
    })
    try {
        const newAccounting = await accounting.save()
        res.status(201).json(newAccounting)

    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})


// Example: Search route
router.get('/search', async (req, res) => {
    const searchString = req.query.searchString;

    try {
        const searchResults = await Accounting.find({
            $or: [
                { companyName: { $regex: new RegExp(searchString, 'i') } },
                { invoiceNmbr: { $regex: new RegExp(searchString, 'i') } },
                { comment: { $regex: new RegExp(searchString, 'i') } },
            ],
        });

        res.json(searchResults);
    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// //----------------------
// //UPDATING
// //----------------------




router.patch('/:id', getAccounting, async (req, res) => {
    if (req.body.companyName != null) {
        res.accounting.companyName = req.body.companyName
    }
    if (req.body.comment != null) {
        res.accounting.comment = req.body.comment
    }
    if (req.body.invoiceNmbr != null) {
        res.accounting.invoiceNmbr = req.body.invoiceNmbr
    }

    try {
        const updatedAccounting = await res.accounting.save()
        res.json(updatedAccounting)
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
})



// //----------------------
// //DELETING
// //----------------------

router.delete('/:id', async (req, res) => {
    try {
        await Accounting.deleteOne({ id: req.params.id });
        res.json({ message: "Accounting Deleted" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})




//getAccounting method
async function getAccounting(req, res, next) {
    try {
        const accounting = await Accounting.findOne({ id: req.params.id });
        if (!accounting) {
            return res.status(404).json({ message: "Cannot find accounting" });
        }
        res.accounting = accounting;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}



// async function getAccounting(req, res, next) {
//     try {
//         accounting = await Accounting.findById(req.params.id)
//         if (accounting == null) {
//             return res.status(404).json({ message: "cannot find accounting" })
//         }
//     } catch (err) {
//         return res.status(500).json({ message: err.message })
//     }

//     res.accounting = accounting
//     next()
// }


module.exports = router