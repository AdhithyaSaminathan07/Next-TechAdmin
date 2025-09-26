// // routers/tktm.js

// const express = require('express');
// const router = express.Router();

// // Import the Contact model to interact with the database
// const Contact = require('../models/Contact');

// /**
//  * @route   GET /api/tktm-submissions
//  * @desc    Get all submissions from the 'contacts' collection
//  * @access  Public
//  */
// router.get('/tktm-submissions', async (req, res) => {
//   try {
//     // Use the Contact model to find all documents in the collection
//     // .sort({ timestamp: -1 }) will return the newest submissions first
//     const submissions = await Contact.find({}).sort({ timestamp: -1 });
    
//     // Send the array of submissions back to the frontend
//     res.status(200).json(submissions);

//   } catch (err) {
//     // If there is a server error, log it and send a 500 status
//     console.error('Server Error:', err.message);
//     res.status(500).send('Server Error');
//   }
// });

// module.exports = router;


// admin-backend/routers/tktm.js

const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact'); // Your model import

/**
 * @route   GET /api/tktm-submissions
 * @desc    Get all submissions
 */
router.get('/tktm-submissions', async (req, res) => {
  try {
    const submissions = await Contact.find({}).sort({ timestamp: -1 });
    res.status(200).json(submissions);
  } catch (err) {
    console.error('Server Error:', err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   PATCH /api/tktm-submissions/:id/status
 * @desc    Update the status of a submission
 * @access  Public (you might want to secure this later)
 */
router.patch('/tktm-submissions/:id/status', async (req, res) => {
  try {
    const { status } = req.body; // Get status from request body ('Confirmed' or 'Declined')
    const { id } = req.params; // Get the document ID from the URL

    // Validate the status
    if (!['Confirmed', 'Declined'].includes(status)) {
      return res.status(400).json({ msg: 'Invalid status value.' });
    }

    // Find the submission by its ID and update it
    const updatedSubmission = await Contact.findByIdAndUpdate(
      id,
      { status: status }, // The fields to update
      { new: true } // This option returns the updated document
    );

    if (!updatedSubmission) {
      return res.status(404).json({ msg: 'Submission not found.' });
    }

    res.status(200).json(updatedSubmission); // Send back the updated submission

  } catch (err) {
    console.error('Server Error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;