import { Form, Input, Button, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoginSchema from '../../schemas/loginSchema';
import { LoginDto } from '../../dto/user/login-dto';
import { getInforUser, login } from './api';


const LoginPage = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(LoginSchema),
    });

    const onSubmit = (data: LoginDto) => {
        login(data)
            .then(res => {
                sessionStorage.setItem('accessToken', res?.data?.accessToken)
                getInforUser()
                    .then(result => {

                        if (result?.data?.user?.role != "ADMIN") {
                            sessionStorage.removeItem("accessToken")
                            message.error("Invalid email or password")
                            return
                        }
                        sessionStorage.setItem("user", JSON.stringify({ role: result?.data?.user?.role }))
                        window.location.href = "/"

                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(err => {
                if (err?.response?.status == 401) {
                    message.error(err?.response?.data?.message)
                }
                console.log(err)
            })
    };

    return (
        <main className='max-w-7xl mx-auto flex items-center min-h-screen gap-20'>
            <div className='w-1/2'>
                <img src='login.svg' alt='login' />
            </div>
            <div className='w-1/2'>
                <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
                    <Form.Item
                        validateStatus={errors.email ? 'error' : ''}
                        help={errors.email?.message}
                    >
                        <p className='mb-2 font-medium text-textBold'>Email</p>
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
                        <p className='mb-2 font-medium text-textBold'>Mật khẩu</p>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => <Input.Password {...field} placeholder="Nhập mật khẩu" className='h-12' />}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block className='h-12'>
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
                {/* <p>Bạn chưa có tài khoản? <Link to="/register" className='text-blue-600'>Đăng kí ngay.</Link></p> */}
            </div>
        </main>
    )
}

export default LoginPage
