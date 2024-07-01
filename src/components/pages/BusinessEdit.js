import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';

import client from "../config/AxiosConfig";

import { useFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const BusinessEdit = () => {

    const { id } = useParams();

    const baseURL = `/listings/${id}`;

    const navigate = useNavigate();

    const [data, setData] = useState([]);

    useEffect(() => {

        client.get(baseURL).then(
            (res) => {
                setData(res.data);
                document.title = res.data.title + " Edit - Bizdeals";
            }
        )


    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    const formik = useFormik({
        initialValues: {
            title: '',
            seller: '',
            email: '',
            number: '',
            location: '',
            price: '',
            revenue: '',
            expense: '',
            profit: '',
            description: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            seller: Yup.string().required('Required'),
            number: Yup.number().required('Required'),
            title: Yup.string().required('Required'),
            location: Yup.string().required('Required'),
            price: Yup.number().min(1, 'Value must be greater than zero').required('Required'),
            revenue: Yup.number().min(0, 'Value must be positive').required('Required'),
            expense: Yup.number().min(0, 'Value must be positive').required('Required'),
            profit: Yup.number().min(0, 'Value must be positive').required('Required'),
            description: Yup.string().required('Required'),
        }),
        onSubmit: async (values, { setSubmitting }) => {

            try {
                const response = await client.patch(`/listings/${data.id}`, values);
                console.log(response.data);
                // Handle success

                navigate(`/business/${data.id}`);

            } catch (error) {
                if (error) {
                    alert('something went wrong!');
                }
                console.error(error);
                // Handle error
            } finally {
                setSubmitting(false);
            }
        }
    });

    useEffect(() => {
        formik.setValues(data);
    }, [data]);



    if (!data) {
        return <h1>None</h1>
    }





    return (<div className='mb-5 mt-3'>
        <Container>
            <Row>
                <h1>Edit Page</h1>

            </Row>

            <Row>
                <Form onSubmit={formik.handleSubmit}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control name='email' type="email" placeholder="name@example.com" value={data.email}
                            {...formik.getFieldProps('email')} />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-danger">{formik.errors.email}</div>
                        ) : null}
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Full Name"
                        className="mb-3"
                    >
                        <Form.Control name='seller' type="text" placeholder="Ahmed" value={data.seller}
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
                        <Form.Control name='number' type="number" placeholder="+92 123456789" value={data.number}
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
                        <Form.Control name='title' type="text" placeholder="business name" value={data.title}
                            {...formik.getFieldProps('title')}
                        />
                        {formik.touched.title && formik.errors.title ? (
                            <div className="text-danger">{formik.errors.title}</div>
                        ) : null}
                    </FloatingLabel>

                    {/* <FloatingLabel controlId="floatingSelect" label="Listing Type?"
                        className="mb-3">
                        <Form.Select aria-label="Floating label select example" value={data.category}>
                            <option value="ecommerce">Ecommerce</option>
                            <option value="restaurant">Restaurant</option>
                            <option value="digital">Digital(Website/Software)</option>
                        </Form.Select>
                    </FloatingLabel> */}

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Location of your Business?"
                        className="mb-3"
                    >
                        <Form.Control name='location' type="text" placeholder="Mention the city as well along with the location" value={data.location}
                            {...formik.getFieldProps('location')}
                        />
                        {formik.touched.location && formik.errors.location ? (
                            <div className="text-danger">{formik.errors.location}</div>
                        ) : null}
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Asking Price? (PKR)"
                        className="mb-3"
                    >
                        <Form.Control name='price' type="number" placeholder="150000" value={data.price}
                            {...formik.getFieldProps('price')}
                        />
                        {formik.touched.price && formik.errors.price ? (
                            <div className="text-danger">{formik.errors.price}</div>
                        ) : null}
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Average Monthly Revenue? (PKR)"
                        className="mb-3"
                    >
                        <Form.Control name='revenue' type="number" placeholder="200000" value={data.revenue}
                            {...formik.getFieldProps('revenue')}
                        />
                        {formik.touched.revenue && formik.errors.revenue ? (
                            <div className="text-danger">{formik.errors.revenue}</div>
                        ) : null}
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Average Net Expenses per Month? (PKR)"
                        className="mb-3"
                    >
                        <Form.Control name='expense' type="number" placeholder="60000" value={data.expense}
                            {...formik.getFieldProps('expense')}
                        />
                        {formik.touched.expense && formik.errors.expense ? (
                            <div className="text-danger">{formik.errors.expense}</div>
                        ) : null}
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Average Net Profit per Month? (PKR)"
                        className="mb-3"
                    >
                        <Form.Control name='profit' type="number" placeholder="80000" value={data.profit}
                            {...formik.getFieldProps('profit')}
                        />
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
                            value={data.description}
                            {...formik.getFieldProps('description')}
                        />
                        {formik.touched.description && formik.errors.description ? (
                            <div className="text-danger">{formik.errors.description}</div>
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

export default BusinessEdit;