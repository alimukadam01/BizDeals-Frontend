import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from './partials/Header';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { useFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import client from '../config/AxiosConfig';
import { useAuth } from '../context/Auth';


const Login = () => {

    const [alert, setAlert] = useState(false);

    useEffect(() => {
        document.title = "Account - BizDeals"
    }, [])

    const styles = {
        display: 'flex',
        justifyContent: 'center'
    }


    const auth = useAuth();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({

            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(4, 'must be longer than 4 characters').required('Password is required')
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await client.post('/user/login/', values);
                console.log(response.data);
                // Handle success
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                localStorage.setItem('user_name', response.data.user_name);
                client.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token');
                auth.login(response.data.user_name);
                navigate('/home');
            } catch (error) {
                console.error(error);

                // Handle error
                if (error) {
                    setAlert(true);
                    window.scrollTo(0, 0);
                    alert('Credentials entered were incorrect!');
                }
            } finally {
                setSubmitting(false);
            }
        }
    });





    return (<div>
        {/*  <Header /> */}

        <Container className='mt-5 mb-5'>

            {alert && <Alert variant='danger'>
                Invalid Credentials!
            </Alert>}

            <Card className='p-5'>

                <h2 style={{ textAlign: 'center', marginBottom: '15px', fontWeight: '500' }}>Login Page</h2>

                <Form onSubmit={formik.handleSubmit}>
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
                        <Button className='mt-2' type="submit">Sign in</Button>
                    </div>

                    <span style={{ textAlign: 'center' }}>
                        <h6 className='mt-3 muted'><Link style={{ textDecoration: 'underline', color: 'black' }} to='/register'>Create account</Link></h6>
                    </span>








                </Form>

            </Card>
        </Container>


    </div >);
}

export default Login;