const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { authMiddleware } = require('../middleware/auth');

router.post('/generate-ideas', authMiddleware, aiController.generateStartupIdeas);
router.post('/evaluate-idea', authMiddleware, aiController.evaluateStartupIdea);

module.exports = router;
