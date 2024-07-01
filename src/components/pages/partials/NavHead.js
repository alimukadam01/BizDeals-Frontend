import '../../style/Navhead.css';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

import { FaUserCircle, FaShoppingBag } from 'react-icons/fa';
import { useAuth } from '../../context/Auth';
import client from '../../config/AxiosConfig';


const NavHead = () => {
    const navigate = useNavigate();
    const auth = useAuth();


    const logout = () => {
        if (auth) {
            auth.logout();
        }
        localStorage.clear();
        client.defaults.headers['Authorization'] = null;

        navigate('/login');
    }

    return (

        <Navbar style={{ backgroundColor: '#F6F1F1' }} expand="lg">
            <Container >
                <Navbar.Brand className='logo' href="/">BizDeals</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Home</Nav.Link>

                        <NavDropdown title="Businesses" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/businesses/all">All Businesses</NavDropdown.Item>
                            <NavDropdown.Item href="/businesses/restaurant">Restaurant</NavDropdown.Item>
                            <NavDropdown.Item href="/businesses/ecommerce">
                                Ecommerce
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/businesses/digital">Softwares/Websites</NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link href="/sell">List a Business</Nav.Link>

                    </Nav>
                    {/*  <Nav.Link href="#link"><FaUserCircle id='profile' /></Nav.Link> */}
                    <Nav className="">
                        {/* <NavDropdown.Item href="/cart"><FaShoppingBag id='cart' /></NavDropdown.Item> */}
                        <NavDropdown id="basic-nav-dropdown" title=<FaUserCircle id='profile' />>
                            {!localStorage.getItem('user_name') && <NavDropdown.Item href="/login">Sign in</NavDropdown.Item>}
                            {!localStorage.getItem('user_name') && <NavDropdown.Item href="/register">Sign up</NavDropdown.Item>}
                            <NavDropdown.Item href="/account">Account</NavDropdown.Item>
                            {localStorage.getItem('user_name') && <NavDropdown.Item href="" onClick={logout}>
                                Logout
                            </NavDropdown.Item>}

                        </NavDropdown>
                    </Nav>


                </Navbar.Collapse>

            </Container>

        </Navbar>

        /*  <Navbar >
             <Container>
                 <Navbar.Brand className='logo' href="#home">BizDeals</Navbar.Brand>
                 <Nav className="me-auto">
                     <Nav.Link href="#home">Home</Nav.Link>
                     <Nav.Link href="#">Businesses</Nav.Link>
                     <Nav.Link href="#">List a Business</Nav.Link>
                 </Nav>
             </Container>
         </Navbar> */

    );
}

export default NavHead;