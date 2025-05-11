import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import Papa from 'papaparse';
import config from '../../config/config'
import Swal from 'sweetalert2';
import '../../app.css';
import axios from 'axios';


const DeviceForm = ({ formData, onChange, onClose, onSubmit }) => {
    const [mode, setMode] = useState('manual');
    const [csvData, setCsvData] = useState([]);

    const handleCSVUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    setCsvData(results.data);
                    console.log('Parsed CSV:', results.data);
                }
            });
        }
    };

    const handleManualSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${config.apiUrl}/devices/create`,
                { devices: csvData },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log('Device created:', response.data);
            Swal.fire({
                icon: 'success',
                title: 'เพิ่มอุปกรณ์สำเร็จ',
                text: 'ข้อมูลอุปกรณ์ถูกเพิ่มเรียบร้อยแล้ว',
                confirmButtonText: 'ตกลง',
                customClass: {
                    confirmButton: 'my-confirm-button',
                }
            }).then(() => {
                onClose(); // ปิด modal
                window.location.reload(); // โหลดหน้าใหม่
            });

        } catch (error) {
            console.error('Error creating device:', error);
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'ไม่สามารถเพิ่มข้อมูลอุปกรณ์ได้',
                confirmButtonText: 'ตกลง',
                customClass: {
                    confirmButton: 'my-confirm-button',
                }
            });
        }
    };

    const handleCSVSubmit = async () => {
        try {
            const token = localStorage.getItem('token');

            const fileInput = document.querySelector('input[type="file"]');
            const file = fileInput.files[0];

            if (!file) {
                Swal.fire({
                    icon: 'warning',
                    title: 'กรุณาเลือกไฟล์ CSV',
                });
                return;
            }

            const formData = new FormData();
            formData.append('file', file); // ✅ ต้องตรงกับ multer.single('file')

            const response = await axios.post(
                `${config.apiUrl}/devices/import`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data' // ✅ สำคัญ
                    }
                }
            );

            console.log('Device imported:', response.data);
            Swal.fire({
                icon: 'success',
                title: 'นำเข้าข้อมูลสำเร็จ',
                text: `นำเข้าทั้งหมด ${response.data.count} รายการ`,
                confirmButtonText: 'ตกลง',
                customClass: {
                    confirmButton: 'my-confirm-button',
                }
            }).then(() => {
                onClose();
                window.location.reload();
            });

        } catch (error) {
            console.error('Error importing devices:', error);
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: error.response?.data?.message || 'ไม่สามารถนำเข้าข้อมูลได้',
                confirmButtonText: 'ตกลง',
                customClass: {
                    confirmButton: 'my-confirm-button',
                }
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b bg-gray-100">
                    <h3 className="text-lg font-medium text-gray-800">เพิ่มข้อมูลอุปกรณ์ใหม่</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <MdClose className="text-2xl" />
                    </button>
                </div>

                {/* Toggle Mode */}
                <div className="p-4 flex space-x-3 border-b">
                    <button
                        onClick={() => setMode('manual')}
                        className={`px-4 py-2 text-sm rounded-md ${mode === 'manual' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                    >
                        กรอกเอง
                    </button>
                    <button
                        onClick={() => setMode('csv')}
                        className={`px-4 py-2 text-sm rounded-md ${mode === 'csv' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                    >
                        อัปโหลด CSV
                    </button>
                </div>

                {/* Content */}
                {mode === 'manual' ? (
                    <form onSubmit={handleManualSubmit} className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {['serial', 'username', 'department', 'license', 'installed', 'brand', 'model'].map((field) => (
                                <div key={field}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {field.charAt(0).toUpperCase() + field.slice(1)}
                                    </label>
                                    <input
                                        type="text"
                                        name={field}
                                        value={formData[field]}
                                        onChange={onChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                        required
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 flex justify-end space-x-3">
                            <button type="button" onClick={onClose} className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md">
                                ยกเลิก
                            </button>
                            <button type="submit" className="px-4 py-2 text-sm text-white bg-emerald-500 hover:bg-emerald-600 rounded-md">
                                บันทึกข้อมูล
                            </button>
                        </div>
                    </form>
                ) : (
                    // CSV Upload Section
                    <div className="p-6">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                เลือกไฟล์ CSV
                            </label>
                            <input
                                type="file"
                                accept=".csv"
                                onChange={handleCSVUpload}
                                className="block w-full text-sm text-gray-700"
                            />
                        </div>

                        {csvData.length > 0 && (
                            <div className="max-h-48 overflow-y-auto border rounded p-2 text-sm bg-gray-50">
                                <pre>{JSON.stringify(csvData.slice(0, 3), null, 2)}{csvData.length > 3 ? '\n... (more rows)' : ''}</pre>
                            </div>
                        )}

                        <div className="mt-6 flex justify-end space-x-3">
                            <button type="button" onClick={onClose} className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md">
                                ยกเลิก
                            </button>
                            <button
                                type="button"
                                onClick={handleCSVSubmit}
                                className="px-4 py-2 text-sm text-white bg-emerald-500 hover:bg-emerald-600 rounded-md"
                                disabled={csvData.length === 0}
                            >
                                นำเข้าข้อมูล
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeviceForm;
