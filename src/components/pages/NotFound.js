import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const NotFound = () => {


    return (
        <Container className='vh-100 mt-5'>
            <Row>
                <Col className='offset-4'><h1>Oops!</h1></Col>
            </Row>
            <Row className='offset-4'>
                <Col>
                    <p>Sorry, an unexpected error has occurred.</p>
                    <p>
                        <i>error</i>
                    </p>
                </Col>
            </Row>


        </Container>
    );
}

export default NotFound;