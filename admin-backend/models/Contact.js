// // admin-backend/models/Contact.js

// const mongoose = require('mongoose');
// require('dotenv').config(); // Ensures we can read the .env variables

// // 1. Create a new, separate connection to the 'startupsDB' database.
// //    Your main application connection in server.js remains unaffected.
// const startupsConnection = mongoose.createConnection(process.env.MONGO_URI_STARTUPS);

// // Optional: Log when this specific connection is ready
// startupsConnection.on('connected', () => {
//     console.log('✅ Separate connection to startupsDB is active.');
// });

// // 2. Define your schema as usual.
// const ContactSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//   },
//   message: {
//     type: String,
//     required: true,
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // 3. IMPORTANT: Export the model created ON the new separate connection.
// //    Any file that imports this 'Contact' model will now automatically
// //    use the 'startupsDB' database for its queries.
// module.exports = startupsConnection.model('Contact', ContactSchema);

// admin-backend/models/Contact.js

const mongoose = require('mongoose');
require('dotenv').config();

const startupsConnection = mongoose.createConnection(process.env.MONGO_URI_STARTUPS);

startupsConnection.on('connected', () => {
    console.log('✅ Separate connection to startupsDB is active.');
});

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  // ADD THE STATUS FIELD
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Declined'], // Defines allowed values
    default: 'Pending', // New submissions will automatically be 'Pending'
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = startupsConnection.model('Contact', ContactSchema);