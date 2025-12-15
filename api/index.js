const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path'); // 👈 ضيف دي

// 👇 غير طريقة الاستدعاء دي عشان تضمن إنه يشوف الفولدر
const authRoutes = require(path.join(__dirname, 'routes', 'authRoutes'));
const contentRoutes = require(path.join(__dirname, 'routes', 'contentRoutes'));

dotenv.config();
const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

// 👇 سر الخلطة: اتصال قاعدة بيانات مخصص لـ Vercel
let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    console.log('=> using existing database connection');
    return;
  }
  console.log('=> using new database connection');
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
  } catch (error) {
    console.log('=> error connecting to database:', error);
  }
};

// تشغيل الاتصال قبل أي طلب
app.use(async (req, res, next) => {
  await connectToDatabase();
  next();
});

// الطرق (Routes)
app.get('/api', (req, res) => res.send("SmartEdu Server is Running 🚀")); // صفحة اختبار
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);

// 👇 تصدير التطبيق عشان فيرسل يشغله (بدون app.listen)
module.exports = app;