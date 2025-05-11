import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdPostAdd } from 'react-icons/md';
import DeviceForm from '../components/device/DeviceForm';
import config from '../config/config';

const DevicePage = () => {
    const [devices, setDevices] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        serial: '',
        username: '',
        department: '',
        license: '',
        installed: '',
        brand: '',
        model: ''
    });

    useEffect(() => {
        fetchDevices();
    }, []);

    const fetchDevices = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${config.apiUrl}/devices/list`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setDevices(response.data.devices);
        } catch (error) {
            console.error('Error fetching devices:', error);
        }
    };

    const openModal = () => setIsModalOpen(true);

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({
            serial: '',
            username: '',
            department: '',
            license: '',
            installed: '',
            brand: '',
            model: ''
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted with data:', formData);
        closeModal();
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    หน้าจัดการอุปกรณ์ (Device Page)
                </h1>

                <div className="flex justify-end mb-4">
                    <button
                        onClick={openModal}
                        className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-md transition-all duration-200"
                    >
                        <MdPostAdd className="text-lg" />
                        เพิ่มข้อมูล
                    </button>
                </div>

                <div className="bg-white shadow-md rounded-2xl p-4 overflow-x-auto">
                    {devices.length > 0 ? (
                        <table className="min-w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                                    <th className="p-3">Serial</th>
                                    <th className="p-3">Username</th>
                                    <th className="p-3">Department</th>
                                    <th className="p-3">License</th>
                                    <th className="p-3">Installed</th>
                                    <th className="p-3">Brand</th>
                                    <th className="p-3">Model</th>
                                </tr>
                            </thead>
                            <tbody>
                                {devices.map((device) => (
                                    <tr
                                        key={device.serial}
                                        className="border-t border-gray-200 text-sm text-gray-700"
                                    >
                                        <td className="p-3">{device.serial}</td>
                                        <td className="p-3">{device.username}</td>
                                        <td className="p-3">{device.department}</td>
                                        <td className="p-3">{device.license}</td>
                                        <td className="p-3">{device.installed}</td>
                                        <td className="p-3">{device.brand}</td>
                                        <td className="p-3">{device.model}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-gray-500 text-center py-10">
                            ยังไม่มีข้อมูลอุปกรณ์ กรุณาเพิ่มตารางในส่วนนี้
                        </div>
                    )}
                </div>
            </div>

            {isModalOpen && (
                <DeviceForm
                    formData={formData}
                    onChange={handleChange}
                    onClose={closeModal}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    );
};

export default DevicePage;
