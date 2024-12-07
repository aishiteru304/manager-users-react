import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
    fullName: Yup.string().required('Vui lòng nhập tên đầy đủ'),
    email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    password: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu'),
});

export default RegisterSchema