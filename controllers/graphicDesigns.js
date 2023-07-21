const mongodb = require ('../db/connect')
const UserId = require ('mongodb').ObjectId


const getAllGraphics = async (req, res, next) => {
    try {
      const result = await mongodb.getDb().db('portfolio').collection('graphicDesigns').find();
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
        console.log(lists)
      });
    }
  catch(error) {
    
    res.status(500).json({message : "Your request was not able to be processed"})
    
     
    
    }
  }
  
  const getGraphic = async (req, res, next) => { 
    try {
  
      const userId = new UserId (req.params.id)
      if (!UserId.isValid(req.params.id)) {
        throw new Error("Invalid ID")
       }
      const result = await mongodb.getDb().db('portfolio').collection('graphicDesigns').find({_id: userId});
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
        console.log(lists[0])
      })
  
    }catch(error) {
    
    res.status(500).json({message : "Your request was not able to be processed"})
    
     
    
    }
  
  }
  
  const createNewGraphic = async (req, res, next) => {
    try {
      if (!req.body.graphicName || !req.body.graphicSummary || !req.body.graphicAlt || !req.file) {
        throw new Error("Empty Content or Missing File");
      }
  
      // Read the PDF file
      const pdfData = req.file.buffer;
  
      const graphic = {
        graphicName: req.body.graphicName,
        graphicURL: pdfData, // Use the binary data of the PDF as graphicURL
        graphicSummary: req.body.graphicSummary,
        graphicAlt: req.body.graphicAlt
      };
  
      const db = mongodb.getDb().db('portfolio');
      const result = await db.collection('graphicDesigns').insertOne(graphic);
  
      if (result.acknowledged) {
        res.status(201).json({ message: "Graphic created successfully", graphicId: result.insertedId });
      } else {
        throw new Error("Unable to insert graphic");
      }
    } catch (error) {
      console.error("Error creating graphic:", error);
      res.status(500).json({ message: "Your request was not able to be processed" });
    }
  };
  
  const updateGraphic = async (req, res, next) => {
    try{
      if (!req.body.graphicName  || !req.body.graphicSummary || !req.body.graphicAlt || !req.file){
        throw new Error("Empty Content")
      }

      const pdfData = req.file.buffer;
      
      const graphic = {
        graphicName: req.body.graphicName,
        graphicURL: pdfData, // Use the binary data of the PDF as graphicURL
        graphicSummary: req.body.graphicSummary,
        graphicAlt: req.body.graphicAlt
      };
  
    const userId = new UserId (req.params.id)
    if (!UserId.isValid(req.params.id)) {
      throw new Error("Invalid ID")
      }
  
    const result = await mongodb.getDb().db('portfolio').collection('storeItem').replaceOne({_id: userId}, graphic);
    console.log(result);
    if (result.modifiedCount > 0) {
      res.status(204).send();
    } 
    else {
      res.status(500).json(result.error)}
    }
    catch(error) {
    
        res.status(500).json({message : "Your request was not able to be processed"})
        
         
        
        }
      }
  
  
    const deleteGraphic = async (req, res, next) => {
      try{
      const userId = new UserId(req.params.id);
      if (!UserId.isValid(req.params.id)) {
        throw new Error("Invalid ID")
       }
      const result = await mongodb.getDb().db('portfolio').collection('graphicDesigns').deleteOne({ _id: userId }, true);
      console.log(result);
      if (result.deletedCount > 0) {
        res.status(204).send();
      } 
      else {
        res.status(500).json(result.error);
      }
    }
    catch(error) {
    
      res.status(500).json({message : "Your request was not able to be processed"})
      
       
      
      }
    };
  
  module.exports = {getAllGraphics, getGraphic, createNewGraphic, deleteGraphic, updateGraphic}
  