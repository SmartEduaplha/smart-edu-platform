const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  // 🎓 البيانات الدراسية
  stage: { 
    type: String, 
    enum: ['prim', 'prep', 'sec'], 
    default: 'prep' 
  },
  role: { 
    type: String, 
    enum: ['student', 'teacher', 'admin', 'parent'], 
    default: 'student' 
  },

  // 🎮 نظام اللعب (Gamification System)
  xp: { type: Number, default: 0 },         // نقاط الخبرة (للترقية)
  coins: { type: Number, default: 0 },      // العملات (للشراء)
  level: { type: Number, default: 1 },      // المستوى الحالي
  streak: { type: Number, default: 0 },     // أيام الحضور المتصلة
  
  // 🎒 الحقيبة (المحفظة)
  completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }], // الدروس اللي خلصها
  purchasedItems: [{ type: String }],       // الحاجات اللي اشتراها من المتجر (أفاتار، ثيم..)

  // 👨‍👩‍👦 لولي الأمر
  parentCode: { type: String },             // كود لربط ولي الأمر
  
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);