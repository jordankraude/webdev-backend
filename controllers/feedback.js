const mongodb = require ('../db/connect')


  
  const newReview = async (req, res, next) => {
    try {
      if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.feedback || !req.body.wantResponse) {
        throw new Error("Empty Content or Missing File");
      }

      review = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        feedback: req.body.feedback,
        wantResponse: req.body.wantResponse
      };
      
  
      const db = mongodb.getDb().db('webdev-page');
      const result = await db.collection('reviews').insertOne(review);
  
      res.status(201).json({ message: "Thank you for your feedback!", reviewId: result.insertedId });
    } catch (error) {
      console.error("Error creating quote request:", error);
      res.status(500).json({ message: "Your request was not able to be processed" });
    }
  };
  
  module.exports = { newReview };