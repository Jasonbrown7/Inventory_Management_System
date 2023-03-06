const express = require('express')
const itemRoute = express.Router()

// model
let ItemModel = require('../models/Item')

itemRoute.route('/create').post((req, res, next) => {
  ItemModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

itemRoute.route('/').get((req, res, next) => {
  ItemModel.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

itemRoute.route('/').get((req, res, next) => {
  ItemModel.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

itemRoute.route('/edit/:id').get((req, res, next) => {
  ItemModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
    
  })
})

// Update
itemRoute.route('/update/:id').put((req, res, next) => {
  console.log(req.body);
  ItemModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
        console.log('Item successfully updated!')
      }
    },
  )
})

// Delete
itemRoute.route('/delete/:id').delete((req, res, next) => {
  ItemModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

// csv upload
itemRoute.route('/bulk').post((req, res, next) => {
  ItemModel.insertMany(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

module.exports = itemRoute