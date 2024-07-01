import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from './partials/Header';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import client from '../config/AxiosConfig';



const Register = () => {

    const styles = {
        display: 'flex',
        justifyContent: 'center'
    }

    useEffect(() => {
        document.title = "Create Account - BizDeals"
    }, [])

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            user_name: '',
            first_name: '',
            last_name: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            user_name: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            first_name: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            last_name: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(4, 'must be longer than 4 characters').required('Password is required')
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await client.post('/user/register/', values);
                console.log(response.data);
                // Handle success
                if (response.status === 201) {
                    navigate('/login');
                }
            } catch (error) {
                console.error(error);
                // Handle error
            } finally {
                setSubmitting(false);
            }
        }
    });


    return (
        <div>
            <Container className='mt-5 mb-5'>

                <Card className='p-5'>

                    <h2 style={{ textAlign: 'center', marginBottom: '15px', fontWeight: '500' }}>Create account</h2>

                    <Form onSubmit={formik.handleSubmit}>

                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="floatingInputCustom"
                                type="text"
                                placeholder="username"
                                name='user_name'
                                {...formik.getFieldProps('user_name')}
                            />
                            {formik.touched.user_name && formik.errors.user_name ? (
                                <div className="text-danger">{formik.errors.user_name}</div>
                            ) : null}

                            <label htmlFor="floatingInputCustom">User name</label>
                        </Form.Floating>

                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="floatingInputCustom"
                                type="text"
                                placeholder="firstname"
                                name='first_name'
                                {...formik.getFieldProps('first_name')}
                            />
                            {formik.touched.first_name && formik.errors.first_name ? (
                                <div className="text-danger">{formik.errors.first_name}</div>
                            ) : null}
                            <label htmlFor="floatingInputCustom">First name</label>
                        </Form.Floating>

                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="floatingInputCustom"
                                type="text"
                                placeholder="last_name"
                                name='last_name'
                                {...formik.getFieldProps('last_name')}
                            />
                            {formik.touched.last_name && formik.errors.last_name ? (
                                <div className="text-danger">{formik.errors.last_name}</div>
                            ) : null}
                            <label htmlFor="floatingInputCustom">Last name</label>
                        </Form.Floating>

                        <Form.Floating className="mb-3">
                            <Form.Control
                                id="floatingInputCustom"
                                type="email"
                                placeholder="name@example.com"
                                name='email'
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-danger">{formik.errors.email}</div>
                            ) : null}
                            <label htmlFor="floatingInputCustom">Email address</label>
                        </Form.Floating>

                        <Form.Floating>
                            <Form.Control
                                id="floatingPasswordCustom"
                                type="password"
                                placeholder="Password"
                                name='password'
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="text-danger">{formik.errors.password}</div>
                            ) : null}
                            <label htmlFor="floatingPasswordCustom">Password</label>
                        </Form.Floating>

                        <div style={styles}>
                            <Button className='mt-2' type="submit">Sign up</Button>
                        </div>

                        <span style={{ textAlign: 'center' }}>
                            <h6 className='mt-3 muted'><Link style={{ textDecoration: 'underline', color: 'black' }} to='/login'>Already have an account?</Link></h6>
                        </span>

                    </Form>

                </Card>

            </Container>

        </div >
    );
}

export default Register;