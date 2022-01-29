import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import './Header.css'

const Header = () => {

    return (
        <>
            <Navbar className="brandBar p-4" bg="dark" variant="dark">
                <Container className="justify-content-center">
                    <Navbar.Brand className='brandName' >PROJ-MOVIES</Navbar.Brand>
                </Container>
            </Navbar>

        </>
     );
}

export default Header;
