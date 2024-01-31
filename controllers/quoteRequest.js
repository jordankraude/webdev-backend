const mongodb = require('../db/connect');

const newQuoteRequest = async (req, res, next) => {
  try {
    const fileData = req.file ? req.file.buffer : null;
    const otherInfo = req.body.otherInfo || null;

    const quote = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      budget: req.body.budget,
      otherInfo: otherInfo,
      file: fileData,
    };

    const db = mongodb.getDb().db('webdev-page');
    const result = await db.collection('quote-requests').insertOne(quote);

    res.status(201).json({ message: "Thank you! Quote request submitted!", quoteId: result.insertedId });
  } catch (error) {
    console.error("Error creating quote request:", error);
    res.status(500).json({ message: "Your request was not able to be processed" });
  }
};

module.exports = { newQuoteRequest };
