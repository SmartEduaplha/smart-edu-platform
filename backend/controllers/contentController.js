const Lesson = require('../models/Lesson');

// 1. إضافة درس جديد (للمعلم فقط)
exports.addLesson = async (req, res) => {
  try {
    const { title, description, videoUrl, pdfUrl, stage, xpPoints } = req.body;
    
    const newLesson = new Lesson({
      title,
      description,
      videoUrl,
      pdfUrl,
      stage,
      xpPoints
    });

    await newLesson.save();
    res.json({ msg: 'تم إضافة الدرس بنجاح! 🚀', lesson: newLesson });

  } catch (err) {
    res.status(500).json({ msg: 'حدث خطأ أثناء الإضافة' });
  }
};

// 2. جلب كل الدروس (للطالب)
exports.getLessons = async (req, res) => {
  try {
    // نجيب الدروس الخاصة بمرحلة الطالب فقط (مثلاً إعدادي)
    const { stage } = req.query; 
    const lessons = await Lesson.find({ stage }).sort({ createdAt: -1 });
    
    res.json(lessons);

  } catch (err) {
    res.status(500).json({ msg: 'حدث خطأ في جلب الدروس' });
  }
};