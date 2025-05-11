import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import personIcon from '../../assets/person.png';
import axios from 'axios';
import config from '../../config/config';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // ใช้ navigate สำหรับการเปลี่ยนหน้า

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้า

    try {
      const response = await axios.post(`${config.apiUrl}/users/register`, {
        username,
        password,
      });

      if (response.status === 201) {
        console.log('User registered successfully:', response.data);

        Swal.fire({
          title: 'สำเร็จ!',
          text: 'สมัครสมาชิกเรียบร้อยแล้ว',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'my-confirm-button',
          }
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login');
          }
        });
      }
    } catch (error) {
      // เช็ค error ที่เกิดจาก backend
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        Swal.fire({
          title: 'เกิดข้อผิดพลาด!',
          text: errorMessage,  // ใช้ข้อความจาก backend
          icon: 'error',
          confirmButtonText: 'ตกลง',
          customClass: {
            confirmButton: 'my-confirm-button',
          }
        });
      } else {
        // หากไม่พบ error ที่ backend ส่งมา (เช่น network error)
        Swal.fire({
          title: 'เกิดข้อผิดพลาด!',
          text: 'ไม่สามารถสมัครสมาชิกได้, กรุณาลองใหม่',
          icon: 'error',
          confirmButtonText: 'ตกลง',
          customClass: {
            confirmButton: 'my-confirm-button',
          }
        });
      }
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit} >
      {/* username */}
      <div>
        <label htmlFor="username" className="block text-gray-700 font-medium">ชื่อผู้ใช้</label>
        <div className="relative">
          <input
            id="username"
            type="text"
            placeholder="ชื่อผู้ใช้"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <img
            src={personIcon}
            alt="person"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-60"
          />
        </div>
      </div>

      {/* password */}
      <div>
        <label htmlFor="password" className="block text-gray-700 font-medium">รหัสผ่าน</label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full border border-gray-300 p-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div
            onClick={togglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          >
            {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
          </div>
        </div>
      </div>

      {/* submit */}
      <button
        type="submit"

        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        สมัครสมาชิก
      </button>
    </form>
  );
};

export default RegisterForm;
