import React from "react";
import { Accordion } from "react-bootstrap";
import { AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { FaEnvelope, FaUsers } from "react-icons/fa";
import { MdOutlineBackup, MdPassword } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";

import Logo from "../assets/images/logo.png";

function SideBar({ openMenu }) {
  const sidebarItems = [
    {
      title: "Dashboard",
      icon: <RiDashboardLine className="side-bar-item-icon" />,
      url: "/dashboard",
      subMenu: [],
    },
    {
      title: "moderators",
      icon: <FaUsers className="side-bar-item-icon" />,
      url: "/moderators",
      subMenu: [],
    },
    {
      title: "contacts",
      icon: <FaEnvelope className="side-bar-item-icon" />,
      url: "/contacts",
      subMenu: [],
    },
    {
      title: "Setting",
      icon: <AiOutlineSetting className="side-bar-item-icon" />,
      url: "/Setting",
      subMenu: [
        {
          title: "Profile",
          icon: <AiOutlineUser size={16} className="side-bar-subitem-icon" />,
          url: "/profile",
        },
        {
          title: "Change Password",
          icon: <MdPassword size={16} className="side-bar-subitem-icon" />,
          url: "/change-password",
        },
        {
          title: "Database Backup",
          icon: <MdOutlineBackup size={16} className="side-bar-subitem-icon" />,
          url: "/database-backup",
        },
      ],
    },
  ];

  const isSidebarAccordionActive = () => {
    const currentPath = window.location.pathname;
    for (let i = 0; i < sidebarItems.length; i++) {
      const item = sidebarItems[i];
      if (item.url === currentPath) {
        return `${i}`;
      }
      for (let j = 0; j < item.subMenu.length; j++) {
        const subItem = item.subMenu[j];
        if (subItem.url === currentPath) {
          return `${i}`;
        }
      }
    }
    return null;
  };

  return (
    <div className={openMenu ? "side-nav-open" : "side-nav-close"}>
      <div className="side-nav-top text-center">
        <Link to="/" className="text-center d-block my-3">
          <img alt="" className="side-nav-logo" src={Logo} />
        </Link>
      </div>
      <Accordion defaultActiveKey={isSidebarAccordionActive()}>
        {sidebarItems.map((item, index) => (
          <React.Fragment key={index}>
            {item.subMenu.length !== 0 ? (
              <Accordion.Item eventKey={`${index}`} className="mt-2">
                <Accordion.Header>
                  <div className="side-bar-item">
                    {item.icon}
                    <span className="side-bar-item-caption">{item.title}</span>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  {item.subMenu.map((subItem, subIndex) => (
                    <NavLink
                      key={subIndex}
                      className={(navData) =>
                        navData.isActive
                          ? "side-bar-subitem-active side-bar-subitem "
                          : "side-bar-subitem"
                      }
                      to={subItem.url}
                    >
                      {subItem.icon}
                      <span className="side-bar-subitem-caption">
                        {subItem.title}
                      </span>
                    </NavLink>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            ) : (
              <NavLink
                className={(navData) =>
                  navData.isActive
                    ? "side-bar-item-active side-bar-item mt-2"
                    : "side-bar-item mt-2"
                }
                to={item.url}
                end
              >
                {item.icon}
                <span className="side-bar-item-caption">{item.title}</span>
              </NavLink>
            )}
          </React.Fragment>
        ))}
      </Accordion>
    </div>
  );
}

export default SideBar;
