import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';

const NavBar = () => {
  const user = useSelector(getUser);

  return (
    <Navbar
      bg='primary'
      variant='dark'
      expand='lg'
      className='mt-4 mb-4 rounded'
    >
      <Container>
        <Navbar.Brand as={NavLink} to='/'>
          Ads.App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <Nav.Link as={NavLink} to='/'>
              Home
            </Nav.Link>
            {/* if user is logged... */}
            {user && (
              <Nav.Link as={NavLink} to='/logout'>
                Sign out
              </Nav.Link>
            )}
            {/* if user is not logged... */}
            {!user && (
              <>
                <Nav.Link as={NavLink} to='/login'>
                  Sign in
                </Nav.Link>
                <Nav.Link as={NavLink} to='/register'>
                  Sign up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
