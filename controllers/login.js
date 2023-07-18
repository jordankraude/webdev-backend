const mongodb = require ('../db/connect')
const UserId = require ('mongodb').ObjectId
// const {body, validationResult, param} = require("express-validator");

const getAllUsers = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db('portfolio').collection('user').find();
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

const getUser = async (req, res, next) => { 
  try {

    const userId = new UserId (req.params.id)
    if (!UserId.isValid(req.params.id)) {
      throw new Error("Invalid ID")
     }
    const result = await mongodb.getDb().db('portfolio').collection('user').find({_id: userId});
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
      console.log(lists[0])
    })

  }catch(error) {
  
  res.status(500).json({message : "Your request was not able to be processed"})
  
   
  
  }

}

const createNewUser = async (req, res, next) => {
  try{
  if (!req.body.userLoginName || !req.body.userPassword || !req.body.userEmail || !req.body.userPhoneNumber){
    throw new Error("Empty Content")
  }
  const user = {
    userLoginName: req.body.userLoginName,
    userPassword: req.body.userPassword,
    userEmail: req.body.userEmail,
    userPhoneNumber: req.body.userPhoneNumber}

  const result = await mongodb.getDb().db('portfolio').collection('user').insertOne(user);
  console.log(result);
  if (result.acknowledged) {
    res.status(201).json(result);
  } 
  else {
    res.status(500).json(result.error)}
}
catch(error) {
  
  res.status(500).json({message : "Your request was not able to be processed"})
  
   
  
  }
}

const updateUser = async (req, res, next) => {
  try{
    if (!req.body.userLoginName || !req.body.userPassword || !req.body.userEmail || !req.body.userPhoneNumber){
      throw new Error("Empty Content")
    }
    const user = {
        userLoginName: req.body.userLoginName,
        userPassword: req.body.userPassword,
        userEmail: req.body.userEmail,
        userPhoneNumber: req.body.userPhoneNumber}

  const userId = new UserId (req.params.id)
  if (!UserId.isValid(req.params.id)) {
    throw new Error("Invalid ID")
    }

  const result = await mongodb.getDb().db('portfolio').collection('user').replaceOne({_id: userId}, user);
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


  const deleteUser = async (req, res, next) => {
    try{
    const userId = new UserId(req.params.id);
    if (!UserId.isValid(req.params.id)) {
      throw new Error("Invalid ID")
     }
    const result = await mongodb.getDb().db('portfolio').collection('user').deleteOne({ _id: userId }, true);
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

module.exports = {getAllUsers, getUser, createNewUser, deleteUser, updateUser}

// 