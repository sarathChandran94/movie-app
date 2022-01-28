import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"


const Header = () => {

    return (
        <>
            <Navbar className="shadow shadow-lg p-4 " bg="dark" variant="dark">
                <Container>
                    <Container>
                        <Navbar.Brand href="#home">PROJ-MOVIES</Navbar.Brand>
                    </Container>

                </Container>
            </Navbar>

        </>
     );
}

export default Header;
