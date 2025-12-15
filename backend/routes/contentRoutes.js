const express = require('express');
const router = express.Router();
const { addLesson, getLessons } = require('../controllers/contentController');

// رابط إضافة درس (Admin)
router.post('/add', addLesson);

// رابط جلب الدروس (Student)
router.get('/', getLessons);

module.exports = router;