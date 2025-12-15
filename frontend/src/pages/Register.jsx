import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { toast } from 'react-toastify';
import { User, Lock, Phone, GraduationCap } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    stage: 'prep' // القيمة الافتراضية (إعدادي)
  });

  const { name, phone, password, stage } = formData;

  // دالة تحديث البيانات عند الكتابة
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // دالة الضغط على زر "إنشاء حساب"
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. إرسال البيانات للسيرفر
      const res = await authService.register(formData);
      
      // 2. لو نجح: إظهار رسالة ترحيب
      toast.success(`أهلاً بك يا بطل! ${res.data.user.name} 🎉`);
      
      // 3. حفظ التذكرة وبيانات الطالب في المتصفح (عشان الداشبورد تشوفهم)
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      // 4. التوجيه فوراً لصفحة الداشبورد
      navigate('/dashboard');

    } catch (err) {
      // لو فشل (مثلاً الرقم مكرر)
      const errorMsg = err.response?.data?.msg || 'حدث خطأ ما، تأكد من البيانات';
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-t-4 border-primary">
        
        {/* اللوجو والعنوان */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">SmartEdu 🚀</h1>
          <p className="text-gray-500">أنشئ حسابك وابدأ رحلة التفوق</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          
          {/* الاسم */}
          <div className="relative">
            <User className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="اسم الطالب ثلاثي"
              className="w-full pr-10 pl-4 py-2 border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              required
            />
          </div>

          {/* رقم الهاتف */}
          <div className="relative">
            <Phone className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={onChange}
              placeholder="رقم الهاتف (للدخول)"
              className="w-full pr-10 pl-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
              required
            />
          </div>

          {/* المرحلة الدراسية */}
          <div className="relative">
            <GraduationCap className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
            <select
              name="stage"
              value={stage}
              onChange={onChange}
              className="w-full pr-10 pl-4 py-2 border rounded-lg focus:outline-none focus:border-primary bg-white text-gray-700"
            >
              <option value="prim">المرحلة الابتدائية</option>
              <option value="prep">المرحلة الإعدادية</option>
              <option value="sec">المرحلة الثانوية</option>
            </select>
          </div>

          {/* كلمة السر */}
          <div className="relative">
            <Lock className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="كلمة السر"
              className="w-full pr-10 pl-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
              required
            />
          </div>

          {/* زر التسجيل */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            🚀 ابدأ التعلم الآن
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          لديك حساب بالفعل؟{' '}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            سجل دخول هنا
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;