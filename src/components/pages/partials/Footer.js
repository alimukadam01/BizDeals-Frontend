import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { MDBIcon } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';



const Footer = () => {
    return (
        <footer style={{ color: 'white', backgroundColor: "#19A7CE" }} >
            <MDBFooter className='text-center text-lg-start text-muted'>
                <section style={{ color: 'white', backgroundColor: "#79E0EE" }} className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
                    <div className='me-5 d-none d-lg-block'>
                        <span>Get connected with us on social networks:</span>
                    </div>

                    <div>
                        <a href='https://www.linkedin.com/company/bizdealsned/' className='me-4 text-reset'>
                            <MDBIcon fab icon="facebook-f" />
                        </a>
                        <a href='https://www.linkedin.com/company/bizdealsned/' className='me-4 text-reset'>
                            <MDBIcon fab icon="twitter" />
                        </a>
                        <a href='https://www.linkedin.com/company/bizdealsned/' className='me-4 text-reset'>
                            <MDBIcon fab icon="google" />
                        </a>
                        <a href='https://www.linkedin.com/company/bizdealsned/' className='me-4 text-reset'>
                            <MDBIcon fab icon="instagram" />
                        </a>
                        <a href='https://www.linkedin.com/company/bizdealsned/' className='me-4 text-reset'>
                            <MDBIcon fab icon="linkedin" />
                        </a>
                        <a href='https://github.com/Hassan01SE/BizDeals' className='me-4 text-reset'>
                            <MDBIcon fab icon="github" />
                        </a>
                    </div>
                </section>

                <section style={{ color: 'white', backgroundColor: "#19A7CE" }} className=''>
                    <MDBContainer className='text-center text-md-start mt-5'>
                        <MDBRow className='mt-3'>
                            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>
                                    <MDBIcon icon="building" className="me-3" />
                                    BizDeals
                                </h6>
                                <p>
                                    Trust Bizdeals for Buying, Selling, and Investing in Businesses
                                </p>
                            </MDBCol>



                            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                                <p>
                                    <a href='/home' className='text-reset'>
                                        Home
                                    </a>
                                </p>
                                <p>
                                    <a href='/businesses/all' className='text-reset'>
                                        Businesses For Sale
                                    </a>
                                </p>
                                <p>
                                    <a href='/sell' className='text-reset'>
                                        List a Business
                                    </a>
                                </p>
                                <p>
                                    <a href='/' className='text-reset'>
                                        About
                                    </a>
                                </p>
                            </MDBCol>

                            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                                <p>
                                    <MDBIcon icon="home" className="me-2" />
                                    Sindh, Karachi Clifton, PK
                                </p>
                                <p>
                                    <MDBIcon icon="envelope" className="me-3" />
                                    info@BizDeals.com
                                </p>
                                <p>
                                    <MDBIcon icon="phone" className="me-3" /> +92 321 2414930
                                </p>
                                <p>
                                    <MDBIcon icon="print" className="me-3" /> +92 321 2414930
                                </p>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>

                <div className='text-center p-4' style={{ backgroundColor: '#146C94', color: 'white' }}>
                    <span>© 2023 Copyright:</span>
                    <a className='text-reset fw-bold ms-2' href='/'>
                        www.BizDeals.com
                    </a>
                </div>
            </MDBFooter>
        </footer>
    );
}

export default Footer;