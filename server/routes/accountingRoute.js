const express = require('express')
const jwt = require('jsonwebtoken');
const router = express.Router()
const Accounting = require('../models/accountingModel')
const User = require('../models/userModel')



//----------------------
//GETTING ALL POSTS
//---------------------_
router.get('/', authenticateToken, async (req, res) => {

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






//----------------------
//GETTING ONE POST WHERE ID = USERID
//---------------------_

router.get('/acc', authenticateToken, async (req, res) => {
    const userId = req.query.userId;
    const order = req.query.order || 'asc';

    try {
        let userAccountings;

        if (order === 'asc' || order === 'desc') {
            const sortOrder = order === 'asc' ? 1 : -1;
            userAccountings = await Accounting.find({ userId: userId }).sort({ date: sortOrder });
        } else {
            return res.status(400).json({ message: 'Invalid order value' });
        }

        res.json(userAccountings);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});





//----------------------
//CREATING POST
//---------------------_

router.post('/newaccounting', authenticateToken, async (req, res) => {
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

    if (!req.body.date) {
        return res.status(400).json({ message: "Enter a valid date" });
    }
    if (!req.body.entries) {
        return res.status(400).json({ message: "Enter at least one verification" });
    }

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

router.patch('/:id', getAccounting, authenticateToken, async (req, res) => {
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



// //----------------------
// //DELETING ALL POST FROM USER (when account is deleted)
// //----------------------

router.delete('/deleteallaccountings/:userId', async (req, res) => {

    const userId = req.params.userId;

    try {
        await Accounting.deleteMany({ userId: userId });
        res.json({ message: "User posts deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});





// Search route
router.get('/search', async (req, res) => {
    const searchString = req.query.searchString;
    const order = req.query.order || 'asc';

    try {
        let searchResults;

        if (order === 'asc' || order === 'desc') {
            const sortOrder = order === 'asc' ? 1 : -1;

            searchResults = await Accounting.find({
                $or: [
                    { companyName: { $regex: new RegExp(searchString, 'i') } },
                    { invoiceNmbr: { $regex: new RegExp(searchString, 'i') } },
                    { comment: { $regex: new RegExp(searchString, 'i') } },
                ]
            }).sort({ date: sortOrder });

            res.json(searchResults);
        } else {
            return res.status(400).json({ message: 'Invalid order value. Use "asc" or "desc".' });
        }
    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




// --METHODS----


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




function authenticateToken(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    User.findOne({ token })
        .then(user => {
            if (!user) {
                return res.sendStatus(403); // Forbidden
            }

            req.user = user; // You can access the user data in the route handlers
            next();
        })
        .catch(err => {
            console.error('Error checking token:', err);
            res.sendStatus(500); // Internal Server Error
        });
}



module.exports = router