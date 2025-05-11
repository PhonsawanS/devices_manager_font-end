import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaSignInAlt, FaShieldAlt } from 'react-icons/fa';

const RegisterPage = () => {
  return (
    <div className="relative bg-gradient-to-tr from-blue-100 via-white to-purple-100 min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-20 blur-sm"></div>
      <div className="relative z-10 bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md transition-all duration-500 hover:shadow-2xl">
        <div className="flex items-center justify-center mb-6">
          <FaUserPlus className="text-blue-500 text-3xl mr-3" />
          <h2 className="text-3xl font-bold text-gray-800">ลงทะเบียน</h2>
        </div>
    
        
        <RegisterForm />
        
        <p className="mt-6 text-center text-gray-600 text-sm flex items-center justify-center">
          <FaSignInAlt className="text-blue-500 mr-2" />
          มีบัญชีอยู่แล้ว?{' '}
          <Link to="/login" className="text-blue-500 hover:underline ml-1">เข้าสู่ระบบ</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;