const express = require('express');
const router = express.Router();
const discoveryController = require('../controllers/discoveryController');
const { protect } = require('../middleware/auth');

router.get('/trends', discoveryController.getTrends);
router.get('/opportunities', discoveryController.getOpportunities);
router.post('/run-discovery', protect, discoveryController.runDiscovery);

module.exports = router;
