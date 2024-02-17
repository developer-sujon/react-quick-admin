//External Lib Import
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Container, Navbar } from "react-bootstrap";
import {
  AiOutlineLogout,
  AiOutlineMenuUnfold,
  AiOutlineUser,
} from "react-icons/ai";
import { BsArrowsFullscreen } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { userLogout } from "../redux/features/authReducer";
import ToastMessage from "../utils/toast/ToastMessage";

//Internal Lib Import

function Navigation({ openMenu, setOpenMenu, title = "Home" }) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // const { UserDetails } = useSelector((state) => state.User);

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

  const logoutUser = () => {
    dispatch(userLogout());
    ToastMessage.successMessage("User Logout Successfull");
  };

  return (
    <>
      <title>Inventory - {title}</title>
      <Navbar
        className={
          openMenu
            ? "fixed-top px-0 shadow-sm top-nav-open "
            : "fixed-top px-0 shadow-sm top-nav-close"
        }
      >
        <Container fluid={true}>
          <Navbar.Brand>
            <button
              className="icon-nav m-0 h5 btn btn-link"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <AiOutlineMenuUnfold />
            </button>
          </Navbar.Brand>

          <div className="float-right h-auto d-flex">
            <button
              className="mx-2 icon-nav h6 px-3 btn btn-link"
              onClick={FullScreen}
            >
              <BsArrowsFullscreen />
            </button>
            <div className="user-dropdown">
              <img
                className="icon-nav-img icon-nav"
                //src={UserDetails && UserDetails.Image}
                // alt={UserDetails && UserDetails.Phone}
                onClick={() => setOpenDropdown(!openDropdown)}
              />
              <div
                className={
                  openDropdown
                    ? "user-dropdown-content d-block"
                    : "user-dropdown-content"
                }
              >
                <div className="mt-4 text-center">
                  <img
                    className="icon-nav-img"
                    // src={UserDetails && UserDetails.Image}
                    // alt={UserDetails && UserDetails.Phone}
                  />
                  {/* <h6>{UserDetails && UserDetails.Name}</h6> */}
                  <hr className="user-dropdown-divider  p-0" />
                </div>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive ? "link-item-active" : "link-item"
                  }
                >
                  <AiOutlineUser className="link-item-icon" />
                  <span className="link-item-caption">{t("profile")}</span>
                </NavLink>
                <span
                  onClick={logoutUser}
                  className="link-item"
                  style={{ cursor: "pointer" }}
                >
                  <AiOutlineLogout className="link-item-icon" />
                  <span className="link-item-caption">{t("logout")}</span>
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
