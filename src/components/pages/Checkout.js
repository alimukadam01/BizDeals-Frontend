import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import "../style/checkout.css"

import { useParams, useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';

import client from "../config/AxiosConfig";

import { useFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Checkout = () => {

    const { id } = useParams();
    const baseURL = `/listings/${id}`;

    const navigate = useNavigate();

    const [data, setData] = useState([]);

    const user = localStorage.getItem('user_name');



    useEffect(() => {

        client.get(baseURL).then(
            (res) => {
                setData(res.data);
                document.title = res.data.title + " Edit - Bizdeals";
            }
        )


    }, [])

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            number: '',
            introduction: '',
        },
        validationSchema: Yup.object({

            firstname: Yup.string().required('Required'),
            lastname: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            number: Yup.number().required('Required'),
            introduction: Yup.string().required('Required'),


        }),
        onSubmit: async (values, { setSubmitting }) => {
            const business = data.title;
            const seller = data.seller;
            const businessprice = data.price;
            const username = user;
            const tokenpaid = Math.round(data.price * 0.30);
            const payment = { ...values, "business": business, "seller": seller, "businessprice": businessprice, "username": username, "tokenpaid": tokenpaid };
            //const purchase = JSON.stringify(payment, null, 2)
            console.log(payment)



            try {
                const response = await client.post('/purchases/', payment);
                console.log(response.data);
                // Handle success
                const { checkout_url } = response.data;
                window.location.href = checkout_url;

                /*  alert('Your Payment was successful')
                 navigate('/home'); */

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






    return (

        <div>
            <Container fluid>


                <Row>
                    <div>
                        <h1 className='mt-3 mb-3' style={{ textAlign: 'center' }}>Check out</h1>
                        <Alert fluid variant="info">
                            <Alert.Heading>&#9432; Important Information about Purchasing a Business on BizDeals</Alert.Heading>
                            <div>
                                <p>
                                    <span><b>Disclaimer:</b></span> When purchasing a business through our platform, it's crucial to understand the terms and conditions involved. We want to provide you with the necessary information to make an informed decision. </p>

                                <p> <b>Token Payment:</b> To initiate the purchase, a token payment of 30% of the business's value will be required. This payment demonstrates your serious intent and commitment to proceed with the transaction. </p>

                                <p>
                                    <b>BizDeal's Share:</b> As the provider of the platform facilitating the buying and selling of businesses, BizDeal retains a share of 20% from the total payment amount after the successful transfer of ownership. This fee covers the operational costs and continuous improvement of our platform to provide you with a seamless experience. </p>
                                <p>
                                    It's important to carefully evaluate these factors and consider the overall cost before proceeding with a purchase. We highly recommend conducting thorough research, analyzing the business's potential, and seeking professional advice to ensure a successful and rewarding investment.

                                    At BizDeals, we are committed to transparency and facilitating fair transactions. If you have any further questions or require assistance, please don't hesitate to reach out to our support team. </p>
                            </div>
                        </Alert>
                    </div>
                </Row>
                <Row>
                    <Col className=' col-md-6  col-sm-12  mt-3 mb-3' style={{ width: '100%' }}>
                        <h4 class="mb-3">Important Information Required!</h4>
                        <form onSubmit={formik.handleSubmit}  >
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="firstName">First name</label>
                                    <input type="text" class="form-control" id="firstName" placeholder="" value="" name='firstname'
                                        {...formik.getFieldProps('firstname')} />
                                    {formik.touched.firstname && formik.errors.firstname ? (
                                        <div className="text-danger">{formik.errors.firstname}</div>
                                    ) : null}
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="lastName">Last name</label>
                                    <input type="text" class="form-control" id="lastName" placeholder="" value="" name='lastname'
                                        {...formik.getFieldProps('lastname')} />
                                    {formik.touched.lastname && formik.errors.lastname ? (
                                        <div className="text-danger">{formik.errors.lastname}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="username">Username</label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">@</span>
                                    </div>
                                    <input type="text" class="form-control" id="username" placeholder="Username" value={user} />

                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="email">Email <span class="text-muted">(Required)</span></label>
                                <input type="email" class="form-control" id="email" placeholder="you@example.com" name='email'
                                    {...formik.getFieldProps('email')} />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="text-danger">{formik.errors.email}</div>
                                ) : null}
                            </div>

                            <div class="mb-3">
                                <label for="address">Your Introduction</label>
                                <input type="text" class="form-control" id="intro" placeholder="Your Short Introduction to the Seller" name='introduction'
                                    {...formik.getFieldProps('introduction')} />
                                {formik.touched.introduction && formik.errors.introduction ? (
                                    <div className="text-danger">{formik.errors.introduction}</div>
                                ) : null}

                            </div>

                            <div class="row">
                                <div class="col-md-4 mb-3">
                                    <label htmlFor='number'>Contact Number</label>

                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="number">+92</InputGroup.Text>
                                        <Form.Control
                                            placeholder="number"
                                            aria-label="number"
                                            aria-describedby="number"
                                            type='number'
                                            name='number'
                                            {...formik.getFieldProps('number')}
                                        />
                                        {formik.touched.number && formik.errors.number ? (
                                            <div className="text-danger">{formik.errors.number}</div>
                                        ) : null}
                                    </InputGroup>

                                </div>

                            </div>



                            <hr class="mb-4" />
                            <button class="btn btn-primary btn-lg btn-block mb-5" type="submit">Purchase</button>
                        </form>

                    </Col>

                    <Col className=' col-md-6 col-sm-12 mt-3 mb-3' style={{ width: '100%', borderRadius: '5%' }}>

                        <Card className='ml-3 mt-3 mb-3' >
                            <Card.Img style={{ height: '300px' }} variant="top" src={data.img1} />
                            <Card.Body>
                                <Card.Title>{data.title}</Card.Title>
                                <Card.Text>
                                    {data.description}
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>Business Value: Rs <b>{data.price} (PKR)</b></ListGroup.Item>
                                <ListGroup.Item><b>30% </b> token to be paid!</ListGroup.Item>
                                <ListGroup.Item>Total Amount to be paid: Rs <b> {Math.round(data.price * 0.30)} (PKR) </b></ListGroup.Item>
                            </ListGroup>

                        </Card>



                    </Col>

                </Row>
            </Container>
        </div>




    );
}

export default Checkout;

