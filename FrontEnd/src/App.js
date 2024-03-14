import './App.css';
import AppNavbar from './components/AppNavbar';
// import Banner from './components/Banner';
// import Highlights from './components/Highlights';
// import Home from './pages/Home'
// import Courses from './pages/Courses'
import Register from './pages/Register';
import { Container } from 'react-bootstrap';


function App() {
  return (
    <>
        <AppNavbar/>
        <Container>
            <Register/>
        </Container>
    </>
  );
}


export default App;
