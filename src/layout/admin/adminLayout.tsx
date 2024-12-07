
import { IoLogOutOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import { SiSimpleanalytics } from "react-icons/si";
import { logout } from "../../utils/logout";


const AdminLayout = ({ children }: { children: JSX.Element }) => {
    return (
        <div className="bg-[rgb(26,32,53)] min-h-screen grid grid-cols-5">
            <div className=" bg-[#1f283e] col-span-1">
                <div className="p-2">
                    <div className="flex gap-6 items-center border-b border-textAdmin py-3">
                        <img src="/author.jpg" className="w-10 h-10 rounded-full" />
                        <h4 className="font-semibold text-textAdmin">Administrator</h4>
                    </div>

                    <div className="mt-10 flex flex-col">
                        <Link to="/admin/summary" className={`flex items-center gap-4  px-6 py-3 text-textAdmin font-medium hover:bg-bgAdmin transitionPrimary rounded-lg cursor-pointer ${location.pathname == "/admin/summary" ? "bg-bgAdmin" : ""}`}>
                            <SiSimpleanalytics className="text-2xl" />
                            <p>Thống Kê</p>
                        </Link>
                        <Link to="/admin/users" className={`flex items-center gap-4  px-6 py-3 text-textAdmin font-medium hover:bg-bgAdmin transitionPrimary rounded-lg cursor-pointer ${location.pathname == "/admin/users" ? "bg-bgAdmin" : ""}`}>
                            <FiUsers className="text-2xl" />
                            <p>Quản Lý User</p>
                        </Link>

                    </div>
                    <div onClick={() => logout()} className={`flex items-center gap-4  px-6 py-3 text-textAdmin font-medium hover:bg-bgAdmin transitionPrimary rounded-lg cursor-pointer`}>
                        <IoLogOutOutline className="text-2xl" />
                        <p>Đăng Xuất</p>
                    </div>

                </div>
            </div>

            <div className="px-8 py-6 min-h-screen col-span-4">
                <div className='text-textAdmin bg-[#1f283e] rounded-lg'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AdminLayout