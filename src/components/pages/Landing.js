import React from "react";
import { useState, useEffect } from "react";
import { Parallax } from "react-parallax";
import '../style/LandingPage.css';

import 'bootstrap/dist/css/bootstrap.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


let coverpic = require('../images/image1.png');
let coverpic2 = require('../images/image2.png');
let coverpic3 = require('../images/image3.png');
let coverpic4 = require('../images/coverpic4.png');
let coverpic5 = require('../images/coverpic5.png');
let dollar = require('../images/money.png');
let dollar2 = require('../images/dollar2.png');

const images = [coverpic2, coverpic4, coverpic5];




const TextBox = (props) => {
    const { title, description } = props;
    return (
        <Container className="text-box">
            <h3>{title}</h3>
            <p>
                {description}
            </p>
        </Container>
    )
}


const LandingPage = () => {

    const [bgImage, setBgImage] = useState(coverpic2);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomImage = images[Math.floor(Math.random() * images.length)];
            setBgImage(randomImage);
        }, 3000);

        return () => clearInterval(interval); // Clear the interval when the component is unmounted

    }, []);


    return (
        <Container fluid id="container">

            <Parallax className="image" bgImage={coverpic} strength={800}>
                <div className="content">
                    <span className="img-text">The smart choice for saVVy investors</span>
                </div>

            </Parallax>

            <TextBox title="Your Partner in Profitable Investments" description="At Bizdeals, we help savvy investors like you find profitable businesses that fit your investment goals. With our expertise and resources, you can make a smart choice and secure a profitable future." />

            <Parallax className="image" bgImage={bgImage} strength={800}>
                <div className="content">
                    <span className="img-text">Sell your business with ease and get the best value.</span>
                </div>

            </Parallax>

            <TextBox title="Ready to sell your business? Let Bizdeals help you make the perfect deal" description="At Bizdeals, we understand that selling your business can be a daunting task. That's why we've made it our mission to simplify the process and help you get the fair value your business deserves. Our platform allows you to list your business for sale and connect with interested buyers quickly and easily. With Bizdeals, you can rest assured that you're in good hands when it comes to selling your business." />

            <Parallax className="image" bgImage={coverpic3} strength={800}>
                <div className="content">
                    <span className="img-text">Trust Bizdeals for Buying, Selling, and Investing in Businesses</span>
                </div>

            </Parallax>



        </Container>

    );

}

export default LandingPage;
