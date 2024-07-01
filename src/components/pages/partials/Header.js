import Image from 'react-bootstrap/Image';
import banner from '../../images/banner.png';



const Header = () => {
    return (
        <header>
            <Image src={banner} fluid />
        </header>
    );
}

export default Header
