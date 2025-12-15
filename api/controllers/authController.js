const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// دالة إنشاء حساب جديد
exports.register = async (req, res) => {
  try {
    const { name, phone, password, stage } = req.body;

    // 1. التأكد إن الرقم مش متسجل قبل كده
    let user = await User.findOne({ phone });
    if (user) return res.status(400).json({ msg: 'هذا الرقم مسجل بالفعل' });

    // 2. تشفير كلمة السر
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. إنشاء الطالب (مع بونص بداية) 🎁
    user = new User({
      name,
      phone,
      password: hashedPassword,
      stage,
      xp: 50,      // هدية بداية
      coins: 100   // هدية بداية
    });

    await user.save();

    // 4. إنشاء التذكرة (Token)
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

    res.json({ token, user, msg: 'تم إنشاء الحساب بنجاح! 🎉' });

  } catch (err) {
    res.status(500).json({ msg: 'حدث خطأ في السيرفر' });
  }
};

// دالة تسجيل الدخول
exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    // 1. البحث عن الطالب
    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ msg: 'بيانات الدخول غير صحيحة' });

    // 2. التأكد من كلمة السر
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'كلمة السر خطأ' });

    // 3. تحديث الاستريك (مكافأة الحضور اليومي) 🔥
    // (هنا ممكن نضيف كود يتأكد إن آخر دخول كان إمبارح ويزود الاستريك)
    
    // 4. إنشاء التذكرة
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

    res.json({ token, user, msg: 'أهلاً بك يا بطل! 🚀' });

  } catch (err) {
    res.status(500).json({ msg: 'حدث خطأ أثناء الدخول' });
  }
};