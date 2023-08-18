import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAppleWhole,faCarrot,faSnowflake,faBreadSlice,faWineBottle,faMugHot,faBottleWater,faEgg,faBagShopping,faStar,faBottleDroplet} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../context/context';




function Hamburger() {


  const { darkMode } = useContext(AppContext);

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} >
          <Container fluid  >
            <Navbar.Brand href="#" > </Navbar.Brand>
            <Navbar.Toggle className={`px-2 px-md-3 ${darkMode?'text-bg-warning':''}`} style={{border:'none',boxShadow:'none'}} aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas 
            className='h-50'
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="top"
            >
              <Offcanvas.Header className={`${darkMode?'bg-warning':''}`} closeButton >
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <span className={`text-decoration-underline text-dark`}>קטגוריות:</span>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body style={{backgroundColor:`${darkMode?'rgb(26, 25, 25)':'white'}`}}>
                <Nav className="justify-content-end flex-grow-1 pe-3 text-white">
                  <Link className={`text-decoration-none text-dark fw-bold pb-3 ${darkMode?'text-white':'text-dark'}`} to={"/"}>מבצעים <FontAwesomeIcon icon={faStar} style={{color: "#e8f34f"}} /></Link>
                  <Link className={`text-decoration-none text-dark fw-bold py-3 ${darkMode?'text-white':'text-dark'}`} to={"/cat/fruits"}>פירות<FontAwesomeIcon icon={faAppleWhole} style={{color: "#c01b1b",marginRight:"5px"}} /></Link>
                  <Link className={`text-decoration-none text-dark fw-bold py-3 ${darkMode?'text-white':'text-dark'}`} to={"/cat/vegetables"}>ירקות<FontAwesomeIcon icon={faCarrot} style={{color: "#ff9500",marginRight:"5px"}} /></Link>
                  <Link className={`text-decoration-none text-dark fw-bold py-3 ${darkMode?'text-white':'text-dark'}`} to={"/cat/frozen"}>קפואים<FontAwesomeIcon icon={faSnowflake} style={{color: "#34c1cb",marginRight:"5px"}} /></Link>
                  <Link className={`text-decoration-none text-dark fw-bold py-3 ${darkMode?'text-white':'text-dark'}`} to={"/cat/breads"}>לחמים ומאפים<FontAwesomeIcon icon={faBreadSlice} style={{color: "#c5b081",marginRight:"5px"}} /></Link>
                  <Link className={`text-decoration-none text-dark fw-bold py-3 ${darkMode?'text-white':'text-dark'}`} to={"/cat/wines"}>יינות<FontAwesomeIcon icon={faWineBottle} style={{color: "#44179f",marginRight:"5px"}} /></Link>
                  <Link className={`text-decoration-none text-dark fw-bold py-3 ${darkMode?'text-white':'text-dark'}`} to={"/cat/hot-drinks"}>משקאות חמים<FontAwesomeIcon icon={faMugHot} style={{color: "#7F461B",marginRight:"5px"}} /></Link>
                  <Link className={`text-decoration-none text-dark fw-bold py-3 ${darkMode?'text-white':'text-dark'}`} to={"/cat/soft-drinks"}>משקאות קרים<FontAwesomeIcon icon={faBottleDroplet} style={{color: "#60d27c",}} /></Link>
                  <Link className={`text-decoration-none text-dark fw-bold py-3 ${darkMode?'text-white':'text-dark'}`} to={"/cat/dairy"}>מוצרי חלב<FontAwesomeIcon icon={faEgg} style={{color: "#b5b5b5",marginRight:"5px"}} /><FontAwesomeIcon icon={faBottleWater} style={{color: "#5077b9",marginRight:"-3px"}} /></Link>
                  <Link className={`text-decoration-none text-dark fw-bold pt-3 ${darkMode?'text-white':'text-dark'}`} to={"/"}> דף הבית <FontAwesomeIcon icon={faBagShopping} style={{color: "#d052e0"}} /></Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Hamburger;