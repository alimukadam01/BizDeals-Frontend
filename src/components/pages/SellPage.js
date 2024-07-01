import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import client from '../config/AxiosConfig';

const SellPage = () => {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            title: '',
            seller: '',
            email: '',
            number: '',
            category: '',
            location: '',
            price: '',
            revenue: '',
            expense: '',
            profit: '',
            description: '',
            img1: '',
            img2: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            seller: Yup.string().required('Required'),
            number: Yup.number().required('Required'),
            title: Yup.string().required('Required'),
            category: Yup.string().required('Required'),
            location: Yup.string().required('Required'),
            price: Yup.number().min(1, 'Value must be greater than zero').required('Required'),
            revenue: Yup.number().min(0, 'Value must be positive').required('Required'),
            expense: Yup.number().min(0, 'Value must be positive').required('Required'),
            profit: Yup.number().min(0, 'Value must be positive').required('Required'),
            description: Yup.string().required('Required'),
            img1: Yup.string().url('Invalid URL').required('Required'),
            img2: Yup.string().url('Invalid URL').required('Required'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            const username = localStorage.getItem('user_name');
            const cat = values.category;
            const status = 'online';
            const listing = { ...values, 'username': username, 'category': { 'type': cat }, 'status': status };
            console.log(listing);
            try {
                const response = await client.post('/listings/', listing);
                console.log(response.data);
                // Handle success
                if (response.status === 201) {
                    navigate('/home');
                }
            } catch (error) {
                if (error) {
                    alert('Something went wrong!');
                }
                console.error(error);
                // Handle error
            } finally {
                setSubmitting(false);
            }
        }
    });






    return (<div className='mb-5 mt-3'>
        <Container>
            <Row>
                <h1>Sell a Business</h1>
                <p> Selling a business is an extremely time-consuming and technical process that requires having expertise in multiple fields. We help you skip the cumbersome processes needed to make a good deal. just fill out this short form.</p>
            </Row>

            <Row>
                <Form onSubmit={formik.handleSubmit}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control name='email' type="email" placeholder="name@example.com"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-danger">{formik.errors.email}</div>
                        ) : null}
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Full Name"
                        className="mb-3"
                    >
                        <Form.Control name='seller' type="text" placeholder="Ahmed"
                            {...formik.getFieldProps('seller')}
                        />
                        {formik.touched.seller && formik.errors.seller ? (
                            <div className="text-danger">{formik.errors.seller}</div>
                        ) : null}
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Phone Number"
                        className="mb-3"
                    >
                        <Form.Control name='number' type="number" placeholder="+92 123456789"
                            {...formik.getFieldProps('number')}
                        />
                        {formik.touched.number && formik.errors.number ? (
                            <div className="text-danger">{formik.errors.number}</div>
                        ) : null}
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Name of your business"
                        className="mb-3"
                    >
                        <Form.Control name='title' type="text" placeholder="business name"
                            {...formik.getFieldProps('title')}
                        />
                        {formik.touched.title && formik.errors.title ? (
                            <div className="text-danger">{formik.errors.title}</div>
                        ) : null}
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingSelect" label="Listing Type?" className="mb-3">
                        <Form.Select name="category" aria-label="Floating label select example" {...formik.getFieldProps('category')}>
                            <option value="restaurant">Restaurant</option>
                            <option value="ecommerce">Ecommerce</option>
                            <option value="digital">Digital(Website/Software)</option>
                        </Form.Select>
                        {formik.touched.category && formik.errors.category ? (
                            <div className="text-danger">{formik.errors.category}</div>
                        ) : null}
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Location of your Business?"
                        className="mb-3"
                    >
                        <Form.Control name='location' type="text" placeholder="Mention the city as well along with the location"
                            {...formik.getFieldProps('location')} />
                        {formik.touched.location && formik.errors.location ? (
                            <div className="text-danger">{formik.errors.location}</div>
                        ) : null}
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Asking Price? (PKR)"
                        className="mb-3"
                    >
                        <Form.Control name='price' type="number" placeholder="150000"
                            {...formik.getFieldProps('price')} />
                        {formik.touched.price && formik.errors.price ? (
                            <div className="text-danger">{formik.errors.price}</div>
                        ) : null}
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Average Monthly Revenue? (PKR)"
                        className="mb-3"
                    >
                        <Form.Control name='revenue' type="number" placeholder="200000"
                            {...formik.getFieldProps('revenue')} />
                        {formik.touched.revenue && formik.errors.revenue ? (
                            <div className="text-danger">{formik.errors.revenue}</div>
                        ) : null}
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Average Net Expenses per Month? (PKR)"
                        className="mb-3"
                    >
                        <Form.Control name='expense' type="number" placeholder="60000"
                            {...formik.getFieldProps('expense')} />
                        {formik.touched.expense && formik.errors.expense ? (
                            <div className="text-danger">{formik.errors.expense}</div>
                        ) : null}
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Average Net Profit per Month? (PKR)"
                        className="mb-3"
                    >
                        <Form.Control name='profit' type="number" placeholder="80000"
                            {...formik.getFieldProps('profit')} />
                        {formik.touched.profit && formik.errors.profit ? (
                            <div className="text-danger">{formik.errors.profit}</div>
                        ) : null}
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingTextarea2" label="Details of your business (Status,Inventory Included?)"
                        className="mb-3">
                        <Form.Control
                            as="textarea"
                            placeholder="Details of your business"
                            name='description'
                            style={{ height: '400px' }}
                            {...formik.getFieldProps('description')}
                        />
                        {formik.touched.description && formik.errors.description ? (
                            <div className="text-danger">{formik.errors.description}</div>
                        ) : null}
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Image1 (URL)"
                        className="mb-3"
                    >
                        <Form.Control name='img1' type="text" placeholder="image1"
                            {...formik.getFieldProps('img1')} />
                        {formik.touched.img1 && formik.errors.img1 ? (
                            <div className="text-danger">{formik.errors.img1}</div>
                        ) : null}
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Image2 (URL)"
                        className="mb-3"
                    >
                        <Form.Control name='img2' type="text" placeholder="image2"
                            {...formik.getFieldProps('img2')} />
                        {formik.touched.img2 && formik.errors.img2 ? (
                            <div className="text-danger">{formik.errors.img2}</div>
                        ) : null}
                    </FloatingLabel>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>

                </Form>
            </Row>
        </Container>



    </div>);
}

export default SellPage;