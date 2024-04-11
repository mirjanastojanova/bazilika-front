import Link from "next/link";
import styled, { css } from "styled-components";
import Center from "../components/Center";
import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../components/CartContext";
import BarsIcon from "../components/icons/Bars";
import CartIcon from "./icons/CartIIcon";

const StyledHeader = styled.header`
  background-color: white;
  border-bottom: 1px solid #dddddd;
`;
const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
  img {
    width: 150px;
  }
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  align-items: center;
`;
const StyledNav = styled.nav`
  ${(props) =>
    props.mobileNavActive
      ? `
    display: flex;
    flex-direction: column;
    margin-top:50px;
    height: 200px;
    border-bottom:1px solid #211e51;
  `
      : `
    display: none;
  `}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: white;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color: #211e51;
  font-weight: 700;
  text-decoration: none;
  padding: 10px 0;
  align-content: center;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
  ${(props) =>
    props.flex &&
    css`
      display: flex;
      width: 40px;
      height: 30px;
      align-items: center;
    `}
`;
const CartAndBars = styled.div`
  display: flex;
`;
const LinkCart = styled(Link)`
  text-decoration: none;
`;
const NavButton = styled.button`
  background-color: transparent;
  width: 40px;
  height: 30px;
  border: 0;
  color: #211e51;
  font-weight: 700;
  cursor: pointer;
  position: relative;
  z-index: 3;

  @media screen and (min-width: 768px) {
    display: none;
  }
  ${(props) =>
    props.flex &&
    css`
      display: flex;
      width: 50px;
      height: 30px;
      align-items: center;
      justify-content: space-between;
    `}
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileNavActive(false);
      }
    };

    const handleScroll = () => {
      setMobileNavActive(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <div>
            <Logo href={"/"}>
              <img src="https://res.cloudinary.com/dqgachhdt/image/upload/v1711112415/hoqdfgoh9vf1dift6doy.webp" />
            </Logo>
          </div>
          <div>
            <StyledNav mobileNavActive={mobileNavActive}>
              <NavLink href={"/"}>ПОЧЕТНА</NavLink>
              <NavLink href={"/products"}>ПРОИЗВОДИ</NavLink>
              {/* <NavLink href={"/categories"}>Categories</NavLink> */}
              {/* <NavLink href={"/account"}>Account</NavLink> */}
              <NavLink href={"/contact"}>КОНТАКТ</NavLink>
            </StyledNav>
          </div>

          <div>
            <StyledNav>
              <NavLink href={"/cart"} flex>
                <CartIcon /> ({cartProducts.length})
              </NavLink>
            </StyledNav>
            <CartAndBars>
              <LinkCart href={"/cart"}>
                <NavButton flex>
                  <CartIcon /> ({cartProducts.length})
                </NavButton>
              </LinkCart>
              <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
                <BarsIcon />
              </NavButton>
            </CartAndBars>
          </div>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
