const express = require('express')
const reservationRoute = express.Router()

// model
let ReservationModel = require('../models/Reservation')

reservationRoute.route('/create').post((req, res, next) => {
  ReservationModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

reservationRoute.route('/:user_id').get((req, res, next) => {
  ReservationModel.find(  {user: req.params.user_id}, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

reservationRoute.route('/').get((req, res, next) => {
  ReservationModel.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

reservationRoute.route('/edit/:id').get((req, res, next) => {
  ReservationModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
    
  })
})

// Update
reservationRoute.route('/update/:id').put((req, res, next) => {
  ReservationModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
        console.log('Reservation successfully updated!')
      }
    },
  )
})

// Delete
reservationRoute.route('/delete/:id').delete((req, res, next) => {
  ReservationModel.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = reservationRoute