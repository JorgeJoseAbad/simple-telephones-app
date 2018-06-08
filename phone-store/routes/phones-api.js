/* jshint node: true */
'use strict';

var express = require('express');
const upload = require('../configs/multer');
var router = express.Router();
const mongoose = require('mongoose');



const Phone = require('../model/phone');


/* GET Phones listing. */
router.get('/phones', (req, res, next) => {
  Phone.find((err, phonesList) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(phonesList);
  });
});


/* CREATE a new Phone. */
router.post('/phones', (req, res, next) => {
  console.log("EN PHONES-API");
  const thePhone = new Phone({
    brand: req.body.brand,
    name: req.body.name,
    specs: req.body.specs,
    image: req.body.image || ''
  });

  thePhone.save((err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'New Phone created!',
      id: thePhone._id
    });
  });
});

/* GET a single Phone. */
router.get('/phones/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    console.log("specified id is not valida, coño");
    return res.status(400).json({ message: 'Specified id is not valid' });
  }

  Phone.findById(req.params.id, (err, thePhone) => {
      if (err) {
        console.log("coño");
        return res.send(err);
      }

      return res.json(thePhone);
    });
});

/* EDIT a Phone. */
router.put('/phones/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }

  Phone.findByIdAndUpdate(req.params.id, {
    brand: req.body.brand,
    name: req.body.name,
    specs: req.body.specs,
    image: req.body.image
  }, (err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      message: 'Phone updated successfully'
    });
  });
});

/* DELETE a Phone. */
router.delete('/phones/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }

  Phone.remove({ _id: req.params.id }, (err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      message: 'Phone has been removed!'
    });
  });
});




module.exports = router;
