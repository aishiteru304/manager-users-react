import { useEffect, useState } from 'react';
import AdminLayout from '../../../layout/admin/adminLayout'
import { FaRegUser } from "react-icons/fa6";
import { getTotalUsers } from './api';
import { logout } from '../../../utils/logout';
import { io } from "socket.io-client";

const AdminSummaryPage = () => {
    const [totalUser, setTotalUser] = useState<number>(0)
    const [totalOnlineUser, setTotalOnlineUser] = useState<number>(0)
    const socket = io("http://localhost:3000");

    useEffect(() => {
        getTotalUsers()
            .then(res => {
                setTotalUser(res.data.total)
            })
            .catch(err => {
                if (err?.response?.status == 401) {
                    logout()
                }
                console.log(err)
            })
    }, [])

    // Lắng nghe sự kiện 'onlineUsers' từ server
    socket.on("onlineUsers", (numberOnline) => {
        setTotalOnlineUser(numberOnline)
    });
    return (
        <AdminLayout>
            <>
                <div className='py-4 px-5 text-white flex items-center justify-between border-b border-border w-full'>
                    <h2>Thống Kê</h2>
                </div>
                <div className='grid grid-cols-2 py-20 px-20 gap-20'>
                    <div className="bg-[#1a2035] p-4 rounded-lg flex items-center gap-2 py-10 text-xl">
                        <FaRegUser className="text-4xl mr-10" />
                        <h2>Total Users</h2>
                        <h2 className="text-center">{totalUser}</h2>
                    </div>

                    <div className="bg-[#1a2035] p-4 rounded-lg flex items-center gap-2 py-10 text-xl">
                        <FaRegUser className="text-4xl mr-10" />
                        <h2>Total Online Users</h2>
                        <h2 className="text-center">{totalOnlineUser}</h2>
                    </div>
                </div>
            </>

        </AdminLayout>
    )
}

export default AdminSummaryPage
