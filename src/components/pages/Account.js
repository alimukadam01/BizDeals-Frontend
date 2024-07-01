import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../style/businesslisting.css'
import client from "../config/AxiosConfig";
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';



const Account = () => {

    const user = localStorage.getItem('user_name');

    const baseURL = `/listings/?username=${user}`;

    const [data, setData] = useState([]);

    const [alert, setAlert] = useState(false);

    useEffect(() => {

        client.get(baseURL).then((res) => {
            setData(res.data)

        })



    }, [])

    const navigate = useNavigate();

    const update = (id) => {
        navigate(`/edit/${id}`)

    }

    const deleteListing = async (id) => {

        const response = await client.delete(`/listings/${id}`);
        setAlert(true);
        window.scrollTo(0, 0);

        //navigate('/home');





    }

    const NoBusiness = () => {
        return (<div>
            <h4 style={{ textAlign: 'center' }} className='mb-5 mt-3'>No Listed Businesses by You!</h4>
            <p>Click on <Link to='/sell' > List a Business</Link> to sell your Business </p>
        </div>);
    }






    return (

        <div className='mt-3 mb-5'>
            <Container>
                {alert && <Alert variant='danger'>
                    Business Listing has been deleted!
                </Alert>}

                <Row>
                    <Col>
                        <h2>Account details</h2>
                        <h6>Username: {user}</h6>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <h3 className='mb-3'>Business you are selling!</h3>
                </Row>



                <Row>

                    {data.length <= 0 && <NoBusiness />}

                    {data.map((item) => {
                        return (
                            <Col className='mb-2 mt-2 ml-2 mr-2 col-6' key={item.id}>

                                <Card className='custom-card'  >
                                    <div className='custom-image'>
                                        <Card.Img className='image' variant="top" src={item.img1} />
                                    </div>
                                    <Card.Body>
                                        <Card.Title>{item.title}</Card.Title>
                                        <Card.Text>
                                            Price RS {item.price}
                                        </Card.Text>
                                        <Button className='mr-2' variant="warning" onClick={() => { update(item.id) }}>Edit Listing</Button>
                                        <Button className='ml-2' variant="danger" onClick={() => { deleteListing(item.id) }}>Delete Listing</Button>
                                    </Card.Body>
                                </Card>

                            </Col>)
                    })}





                    {/* <Col className='mb-2 mt-2 ml-2 mr-2 col-6'>

                        <Card >
                            <Card.Body>
                                <Card.Title>Pizza Hut</Card.Title>
                                <Card.Text>
                                    Pizza Hut being put on sale
                                </Card.Text>
                                <Button className='mr-2' variant="warning">Update</Button>
                                <Button className='ml-2' variant="danger">Remove</Button>
                            </Card.Body>
                        </Card>

                    </Col> */}




                </Row>




            </Container>
        </div>);

}

export default Account;