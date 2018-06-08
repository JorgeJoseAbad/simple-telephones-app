'use strict';

var express = require('express');
const upload = require('../configs/multer');
var router = express.Router();
const mongoose = require('mongoose');



const Phone = require('../model/phone');


/* GET Phones listing. */
router.get('/', (req, res, next) => {
  Phone.find({})
    .exec((err, Phones) => {
      if (err) {
        return res.send(err);
      }
      return res.json(Phones);
    });
});

/* CREATE a new Phone. manually*/
/*
router.post('/', upload.single('file'), function(req, res) {
  const phone = new Phone({
    name: req.body.name,
    brand: req.body.brand,
    image: `/uploads/${req.file.filename}`,
    specs: JSON.parse(req.body.specs) || []
  });

  phone.save((err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      message: 'New Phone created!',
      phone: phone
    });
  });
});*/

/* CREATE a new Phone.
variant used to chargue automatic with rest api express phones*/

router.post('/', (req, res) => {
  const phone = new Phone({
  	brand: req.body.brand,
    name: req.body.name,
    specs: req.body.specs,
    image: req.body.image || ''
  });

  phone.save((err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({ message: 'New Phone created!',
                        id: Phone._id});
  });
});


/* GET a single Phone. */
router.get('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    console.log("specified id is not valida, coño");
    return res.status(400).json({ message: 'Specified id is not valid' });
  }

  Phone.findById(req.params.id, (err, Phones) => {
      if (err) {
        console.log("coño");
        return res.send(err);
      }

      return res.json(Phones);
    });
});

/* EDIT a Phone. */
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
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
