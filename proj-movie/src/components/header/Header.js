import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import { NavLink } from 'react-router-dom'
import './Header.css'

const Header = () => {

    return (
        <>
            <Navbar className="brandBar p-4" bg="dark" variant="dark">
                <Container className="justify-content-center">
                    <Navbar.Text className='brandName' >PROJ-MOVIES</Navbar.Text>
                </Container>
                <Navbar.Brand>
                    <NavLink to='/login'>LOGIN</NavLink>{ ' ' }
                    <NavLink to='/register'>REGISTER</NavLink>
                </Navbar.Brand>
            </Navbar>

        </>
     );
}

export default Header;
