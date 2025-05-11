import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config/config';

const HomePage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.apiUrl}/users/list`)
      .then((res) => {
        console.log('API response:', res.data); // เช็กข้อมูลที่ได้จาก API
        setUsers(res.data.users); // เข้าถึง array users จาก response
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
      });
  }, []);

  return (
    <div>
      <ul>
        {Array.isArray(users) && users.map((user) => (
          <li key={user.id}>{user.username}</li> 
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
