import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


export default function AppNavbar() {
	return (
			<Navbar bg="light" expand="lg">
			    <Container fluid>
			        <Navbar.Brand href="#home">Zuitt Booking</Navbar.Brand>
			        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
			        <Navbar.Collapse id="basic-navbar-nav">
			            <Nav className="ms-auto">
			            <Nav.Link href="#home">Home</Nav.Link>
			            <Nav.Link href="#link">Courses</Nav.Link>
			            </Nav>
			        </Navbar.Collapse>
			    </Container>
			</Navbar>
		)
}
