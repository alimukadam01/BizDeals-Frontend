import Header from './partials/Header';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BusinessList from './BusinessList';

import "../style/Home.css"

import client from "../config/AxiosConfig";
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();








    return (
        <div>
            <Header />
            <Container fluid  >
                <Row className='mt-6 mb-3' >
                    <Col>
                        <BusinessList heading="Restaurant Businesses" type="restaurant" banner={false} />
                    </Col>
                </Row>
                <Row >
                    <Col>
                        <BusinessList heading="Ecommerce Businesses" type="ecommerce" banner={false} />
                    </Col>
                </Row>
                <Row >
                    <Col>
                        <BusinessList heading="Digital Businesses" type="digital" banner={false} />
                    </Col>
                </Row>






            </Container>


        </div>
    );
}

export default Home;