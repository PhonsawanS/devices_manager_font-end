import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus, FaLock } from 'react-icons/fa';

const LoginPage = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-100 via-white to-purple-100 min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"></div>
      <div className="relative z-10 bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md transition-all duration-500 hover:shadow-2xl">
        <div className="flex items-center justify-center mb-6">
          <FaSignInAlt className="text-blue-500 text-3xl mr-3" />
          <h2 className="text-3xl font-bold text-gray-800">เข้าสู่ระบบ</h2>
        </div>
        <LoginForm />
        <p className="mt-6 text-center text-gray-600 text-sm flex items-center justify-center">
          <FaUserPlus className="text-blue-500 mr-2" />
          ยังไม่มีบัญชี?{' '}
          <Link to="/" className="text-blue-500 hover:underline ml-1">ลงทะเบียน</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;