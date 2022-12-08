const express = require('express')
const itemRoute = express.Router()

// model
let ItemModel = require('../models/Item')

itemRoute.route('/create-item').post((req, res, next) => {
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

itemRoute.route('/edit-item/:id').get((req, res, next) => {
  ItemModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
    
  })
})

// Update
itemRoute.route('/update-item/:id').put((req, res, next) => {
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
itemRoute.route('/delete-item/:id').delete((req, res, next) => {
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

module.exports = itemRoute