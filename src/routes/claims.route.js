const express = require('express');
const router = express.Router();
const claimsController = require('../controllers/claims.controller');
const Claims = require('../models/claims');

router.get('/', claimsController.get);
  
router.post('/registerClaim', claimsController.create);

router.put('/:id', claimsController.update);

router.delete('/:id', claimsController.remove);

module.exports = router;
