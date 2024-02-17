// Internal Lib Import
import i18next from "i18next";
import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../../redux/slice/settingReducer";
import bnFlag from "./flags/bangladesh.png";
import enFlag from "./flags/us.jpg";

// Get the languages
const Languages = [
  {
    display: "Bangla",
    name: "bn",
    flag: bnFlag,
  },
  {
    display: "English",
    name: "en",
    flag: enFlag,
  },
];

const LanguageDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const state = useSelector((state) => state.settingReducer);

  let Language = Languages.find((item) => item.name === state.language);

  Language = Language || {
    display: "English",
    name: "en",
    flag: enFlag,
  };

  const dispatch = useDispatch();

  const toggleDropdown = ({ dropdownOpen: boolean }) => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLanguage = (index) => {
    i18next.changeLanguage(Languages[index].name);
    dispatch(changeLanguage(Languages[index].name));
  };

  return (
    <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
      <Dropdown.Toggle
        variant="link"
        id="dropdown-languages"
        onClick={toggleDropdown}
        className="nav-link dropdown-toggle arrow-none"
      >
        <img
          src={Language.flag}
          alt={Language.name}
          className="me-0 me-sm-1"
          height="12"
        />
        <span className="align-middle d-none d-sm-inline-block">
          {Language.display}
        </span>
        <i className="mdi mdi-chevron-down d-none d-sm-inline-block align-middle"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu
        align={"end"}
        className="dropdown-menu-animated topbar-dropdown-menu"
      >
        <div onClick={toggleDropdown}>
          {Languages.map((lang, i) => {
            return (
              <span
                className="dropdown-item notify-item"
                key={i + "-lang"}
                onClick={() => handleLanguage(i)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={lang.flag}
                  alt={lang.name}
                  className="me-1"
                  height="12"
                />
                <span className="align-middle">{lang.display}</span>
              </span>
            );
          })}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageDropdown;
