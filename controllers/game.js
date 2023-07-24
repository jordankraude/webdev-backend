const mongodb = require ('../db/connect')
const UserId = require ('mongodb').ObjectId


const getAllGames = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db('portfolio').collection('game').find();
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

const getGame = async (req, res, next) => { 
  try {

    const userId = new UserId (req.params.id)
    if (!UserId.isValid(req.params.id)) {
      throw new Error("Invalid ID")
     }
    const result = await mongodb.getDb().db('portfolio').collection('game').find({_id: userId});
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
      console.log(lists[0])
    })

  }catch(error) {
  
  res.status(500).json({message : "Your request was not able to be processed"})
  
   
  
  }

}

const createNewGame = async (req, res, next) => {
  try {
    if (!req.body.gameName || !req.body.gameThumbnailPath || !req.body.gameAlt || !req.files || !req.files.gameSWFFile) {
      throw new Error("Invalid Form Data");
    }

    const game = {
      gameName: req.body.gameName,
      gameThumbnailPath: req.body.gameThumbnailPath,
      gameAlt: req.body.gameAlt,
      gameSWFData: req.files.gameSWFFile.data
    };

    const result = await mongodb.getDb().db('portfolio').collection('game').insertOne(game);
    console.log(result);

    if (result.acknowledged) {
      res.status(201).json(result);
    } else {
      res.status(500).json(result.error);
    }
  } catch (error) {
    res.status(500).json({ message: "Your request was not able to be processed" });
  }
};

const updateGame = async (req, res, next) => {
  try {
    if (!req.body.gameName || !req.body.gameThumbnailPath || !req.body.gameAlt || !req.files || !req.files.gameSWFFile) {
      throw new Error("Invalid Form Data");
    }

    const userId = new UserId(req.params.id);
    if (!UserId.isValid(req.params.id)) {
      throw new Error("Invalid ID");
    }

    const game = {
      gameName: req.body.gameName,
      gameThumbnailPath: req.body.gameThumbnailPath,
      gameAlt: req.body.gameAlt,
      gameSWFData: req.files.gameSWFFile.data
    };

    const result = await mongodb.getDb().db('portfolio').collection('game').replaceOne({ _id: userId }, game);
    console.log(result);

    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(result.error);
    }
  } catch (error) {
    res.status(500).json({ message: "Your request was not able to be processed" });
  }
};


  const deleteGame = async (req, res, next) => {
    try{
    const gameId = new UserId(req.params.id);
    if (!UserId.isValid(req.params.id)) {
      throw new Error("Invalid ID")
     }
    const result = await mongodb.getDb().db('portfolio').collection('game').deleteOne({ _id: gameId }, true);
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

module.exports = {getAllGames, getGame, createNewGame, deleteGame, updateGame}

// 