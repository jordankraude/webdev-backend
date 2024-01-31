const mongodb = require ('../db/connect')


  
  const newQuoteRequest = async (req, res, next) => {
    try {
      if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.phoneNumber || !req.body.budget) {
        throw new Error("Empty Content or Missing File");
      }
  
      // Read the file data if present
      const fileData = req.file ? req.file.buffer : null;
  
      if (req.body.hasOwnProperty('otherInfo') && req.file) {
        quote = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          budget: req.body.budget,
          otherInfo: req.body.otherInfo,
          file: fileData,
        };
      } else if (req.body.hasOwnProperty('otherInfo')) {
        quote = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          budget: req.body.budget,
          otherInfo: req.body.otherInfo,
        };
      } else if (req.file) {
        quote = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          budget: req.body.budget,
          file: fileData,
        };
      } else {
        quote = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          budget: req.body.budget,
        };
      }
  
      const db = mongodb.getDb().db('webdev-page');
      const result = await db.collection('quote-requests').insertOne(quote);
  
      res.status(201).json({ message: "Thank you! Quote request submitted!", quoteId: result.insertedId });
    } catch (error) {
      console.error("Error creating quote request:", error);
      res.status(500).json({ message: "Your request was not able to be processed" });
    }
  };
  
  module.exports = { newQuoteRequest };