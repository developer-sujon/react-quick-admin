//External Lib Import
import { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { BsArrowsFullscreen } from 'react-icons/bs';
import { NavLink, Link } from 'react-router-dom';

//Internal Lib Import
import Logo from '../assets/images/logo.png';
import LanguageDropdown from './languageDropdown';

const AppNavigation = ({ title = 'Home' }) => {
  let params = new URLSearchParams(window.location.search);
  let clientApp = params.get('clientApp');
  let shunnoID = params.get('shunnoID');

  const [isFullScreen, setIsFullScreen] = useState(false);
  const { t } = useTranslation();

  const FullScreen = () => {
    if (isFullScreen === true) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullScreen(false);
    } else {
      let elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
      setIsFullScreen(true);
    }
  };

  return (
    <>
      <title>{title}</title>
      <Navbar expand="md" className="px-0 shadow-sm">
        <Container fluid={true}>
          <Navbar.Brand>
            <Link to={`/support-ticket/create?shunnoID=${shunnoID}&clientApp=${clientApp}`}>
              <img className="nav-logo mx-2" src={Logo} alt="logo" />
            </Link>
          </Navbar.Brand>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink className={'nav-link'} to={`/support-ticket/create?shunnoID=${shunnoID}&clientApp=${clientApp}`}>
                {t('create ticket')}
              </NavLink>
              <NavLink className={'nav-link'} to={`/support-ticket/search?shunnoID=${shunnoID}&clientApp=${clientApp}`}>
                {t('search ticket')}
              </NavLink>
              <NavLink className={'nav-link'} to={`/support-ticket/list?shunnoID=${shunnoID}&clientApp=${clientApp}`}>
                {t('ticketList')}
              </NavLink>
            </Nav>
          </Navbar.Collapse>

          <div className="float-right h-auto d-flex">
            <LanguageDropdown />
            <button className="mx-2 icon-nav h6 px-3 btn btn-link" onClick={FullScreen}>
              <BsArrowsFullscreen />
            </button>

            {/* {accessToken && data && (
              <div className="user-dropdown">
                <img
                  className="icon-nav-img icon-nav"
                  src={data?.photo || defaultUserAvatar}
                  alt={data?.email}
                  onClick={() => setOpenDropdown(!openDropdown)}
                />
                <div className={openDropdown ? 'user-dropdown-content d-block' : 'user-dropdown-content'}>
                  <div className="mt-4 text-center">
                    <img className="icon-nav-img" src={data?.photo || defaultUserAvatar} alt={data?.email} />
                    <h6>{data?.name}</h6>
                    <hr className="user-dropdown-divider  p-0" />
                  </div>
                  <NavLink to="/profile" className={({ isActive }) => (isActive ? 'link-item-active' : 'link-item')}>
                    <AiOutlineUser className="link-item-icon" />
                    <span className="link-item-caption">Profile</span>
                  </NavLink>
                  <span onClick={() => dispatch(setLogout())} className="link-item" style={{ cursor: 'pointer' }}>
                    <AiOutlineLogout className="link-item-icon" />
                    <span className="link-item-caption">Logout</span>
                  </span>
                </div>
              </div>
            )} */}
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavigation;
