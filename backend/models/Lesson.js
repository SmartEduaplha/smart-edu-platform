const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },       // عنوان الدرس
  description: { type: String },                 // وصف بسيط
  videoUrl: { type: String, required: true },    // رابط الفيديو
  pdfUrl: { type: String },                      // رابط المزمة
  stage: { type: String, required: true },       // المرحلة (إعدادي/ثانوي)
  xpPoints: { type: Number, default: 20 },       // المكافأة عند المشاهدة 🎁
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lesson', lessonSchema);