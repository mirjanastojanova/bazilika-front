import Link from "next/link";
import styled, { css } from "styled-components";
import Center from "../components/Center";
import { useContext, useState } from "react";
import { CartContext } from "../components/CartContext";
import BarsIcon from "../components/icons/Bars";
import CartIcon from "./icons/CartIIcon";

const StyledHeader = styled.header`
  background-color: #222;
`;
const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
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
    display: block;
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
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color: #aaa;
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
const NavButton = styled.button`
  background-color: transparent;
  width: 35px;
  height: 30px;
  border: 0;
  color: #aaa;
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
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <div>
            <Logo href={"/"}>Аптека Базилика</Logo>
          </div>
          <div>
            <StyledNav mobileNavActive={mobileNavActive}>
              <NavLink href={"/"}>Дома</NavLink>
              <NavLink href={"/products"}>Производи</NavLink>
              {/* <NavLink href={"/categories"}>Categories</NavLink> */}
              {/* <NavLink href={"/account"}>Account</NavLink> */}
              <NavLink href={"/contact"}>Контакт</NavLink>
              <NavLink href={"/cart"} flex>
                <CartIcon /> ({cartProducts.length})
              </NavLink>
            </StyledNav>
            <CartAndBars>
              <Link href={"/cart"}>
                <NavButton flex>
                  <CartIcon />({cartProducts.length})
                </NavButton>
              </Link>
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
