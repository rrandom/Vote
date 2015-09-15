'use strict';

var express = require('express');
var controller = require('./polls.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:user', controller.showAll);
router.get('/:user/:poll', controller.showOne);
router.post('/', controller.create);
router.put('/:poll_id/:option', controller.update);
router.patch('/:id', controller.update);
router.delete('/:poll', controller.destroy);

module.exports = router;
