import { Button, Form, Input, message, Modal, Table } from 'antd'
import AdminLayout from '../../../layout/admin/adminLayout'
import { useEffect, useState } from 'react'
import { DeleteOutlined } from '@ant-design/icons';
import { ManagerUserDto } from '../../../dto/user/manager-user-dto';
import { createUser, deleteUser, getAllUsers } from './api';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import RegisterSchema from '../../../schemas/registerSchema';
import { CreateUserDto } from '../../../dto/user/create-user-dto';
import { logout } from '../../../utils/logout';
import { normalizeText } from '../../../utils/normalizeText';

const AdminUserPage = () => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [userData, setUserData] = useState<ManagerUserDto[]>([])
    const [currentData, setCurrentData] = useState<ManagerUserDto[]>([])
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(RegisterSchema),
    });

    const fetchData = () => {
        getAllUsers()
            .then(res => {
                const tableData = res.data.users.map((user: ManagerUserDto, index: number) => ({
                    ...user,
                    key: index
                }))
                setUserData(tableData)
                setCurrentData(tableData)
            })
            .catch(err => {
                if (err?.response?.status == 401) {
                    logout()
                }
                console.log(err)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const columns: any[] = [
        {
            title: 'Id',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
            width: 300,
        },
        {
            title: 'Action',
            key: 'action',
            width: 100,
            align: "center",
            render: (record: ManagerUserDto) => (
                <Button
                    type="link"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(record)}
                    danger
                >
                    Xóa
                </Button>
            ),
        },
    ];

    const handleDelete = (record: ManagerUserDto) => {
        Modal.confirm({
            title: 'Bạn có chắc chắn muốn xóa người dùng này?',
            okText: 'Xóa',
            cancelText: 'Hủy',
            onOk: () => {
                deleteUser(record._id)
                    .then(res => {
                        message.success(res?.data?.message)
                        fetchData()
                    })
                    .catch(err => {
                        if (err?.response?.status == 401) {
                            logout()
                        }
                        console.log(err)
                    })
            },
        });
    };

    const onSubmit = (data: CreateUserDto) => {
        createUser(data)
            .then(res => {
                message.success(res?.data?.message)
                reset()
                setIsOpenModal(false)
                fetchData()
            })
            .catch(err => {
                if (err?.response?.status == 400) {
                    message.error(err?.response?.data?.message)
                }
                else if (err?.response?.status == 401) {
                    logout()
                }
                console.log(err)
            })
    };

    const handleSearch = (value: string) => {
        const trimValue = value.trim()
        if (trimValue == "") {
            setCurrentData(userData)
        }
        else {
            const filteredData = userData.filter(
                (item) =>
                    normalizeText(item.email).includes(normalizeText(trimValue)) ||
                    normalizeText(item.fullName).includes(normalizeText(trimValue))
            );
            setCurrentData(filteredData)
        }
    }

    return (
        <AdminLayout>
            <>
                <div className='py-4 px-5 text-white flex items-center justify-between border-b border-border w-full'>
                    <h2>Quản Lý User</h2>
                    <Button type='primary' onClick={() => setIsOpenModal(true)}>Thêm mới</Button>
                </div>

                <div className='mt-10 pb-4 px-4'>
                    <div className='my-5'>
                        <input onChange={(e) => handleSearch(e.target.value)} placeholder='Tìm kiếm' className='text-white bg-[#1a2035] w-[180px] py-2 px-4 placeholder:text-white outline-none placeholder:text-sm' />
                    </div>
                    <Table
                        dataSource={currentData}
                        columns={columns}
                        pagination={{ pageSize: 10 }}
                        className='customTable'
                    />
                </div>

                {/* Modal thêm mới user */}
                <Modal
                    title="Thêm mới User"
                    open={isOpenModal}
                    onCancel={() => setIsOpenModal(false)}
                    footer={null}
                >
                    <Form onFinish={handleSubmit(onSubmit)} layout="vertical">

                        <Form.Item
                            validateStatus={errors.fullName ? 'error' : ''}
                            help={errors.fullName?.message}
                        >
                            <Controller
                                name="fullName"
                                control={control}
                                render={({ field }) => <Input {...field} placeholder="Nhập tên đầy đủ" className='h-12' />}
                            />
                        </Form.Item>

                        <Form.Item
                            validateStatus={errors.email ? 'error' : ''}
                            help={errors.email?.message}
                        >
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => <Input {...field} placeholder="Nhập email" className='h-12' />}
                            />
                        </Form.Item>

                        <Form.Item
                            validateStatus={errors.password ? 'error' : ''}
                            help={errors.password?.message}
                        >
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => <Input.Password {...field} placeholder="Nhập mật khẩu" className='h-12' />}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block className='h-12'>
                                Thêm
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        </AdminLayout>
    )
}

export default AdminUserPage
