import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import { NavLink } from 'react-router-dom'
import './Header.css'
import Button from "react-bootstrap/Button"
// import { Button } from "@material-ui/core"

const Header = () => {

    return (
        <>
            <Navbar className="brandBar p-4" bg="dark" variant="dark">
                <Container className="justify-content-center">
                    <Navbar.Text className='brandName' >PROJ-MOVIES</Navbar.Text>
                </Container>
                <Navbar.Brand >
                    <Button  variant="info"><NavLink className='btns' to='/login'>LOGIN</NavLink></Button>{ ' ' }
                    <Button variant="info"><NavLink className='btns' to='/register'>REGISTER</NavLink></Button>
                </Navbar.Brand>
            </Navbar>

        </>
     );
}

export default Header;
