import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { animateScroll as scroll } from "react-scroll";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavBtnLink,
  NavBtnLinkTwo,
} from "./NavbarElements";
import { useAuth } from "../../auth";

const Navbar = ({ toggle }) => {
  const [scrollNav, setScrollNav] = useState(false);
  const auth = useAuth();

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <Nav scrollNav={scrollNav}>
      <NavbarContainer>
        <NavLogo to="/" onClick={toggleHome}>
          CreditWizzard
        </NavLogo>
        <MobileIcon onClick={toggle}>
          <FaBars />
        </MobileIcon>
        <NavMenu>
          <NavItem>
            <NavLinks
              to="about"
              smooth={true}
              duration={500}
              spy={true}
              exact="true"
              offset={-80}
            >
              About
            </NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks
              to="discover"
              smooth={true}
              duration={500}
              spy={true}
              exact="true"
              offset={-80}
            >
              Dicover
            </NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks
              to="services"
              smooth={true}
              duration={500}
              spy={true}
              exact="true"
              offset={-80}
            >
              Services
            </NavLinks>
          </NavItem>
          {auth && auth.idToken && (
            <NavItem>
              <NavBtnLinkTwo to="/dashboard">Dashboard</NavBtnLinkTwo>
            </NavItem>
          )}
        </NavMenu>
        {auth && auth.idToken ? (
          <NavBtn>
            <NavBtnLink
              to="/"
              onClick={() => {
                auth.signout();
                // window.location.reload(false);
                console.log("sign out", auth);
              }}
            >
              Sign Out
            </NavBtnLink>
          </NavBtn>
        ) : (
          <NavBtn>
            <NavBtnLink to="/signin">Sign In</NavBtnLink>
          </NavBtn>
        )}
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
