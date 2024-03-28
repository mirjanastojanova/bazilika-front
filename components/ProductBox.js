import styled from "styled-components";
import Button from "./Button";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import CartIcon from "./icons/CartIIcon";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* border: #222 1px solid;
  border-radius: 10px;
  padding: 10px;
  background-color: blue; */
`;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 150px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
`;

const ProductInfoBox = styled.div`
  margin-top: 10px;
`;

const PriceRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 5px;
  margin-top: 7px;
  @media screen and (min-width: 768px) {
    display: grid;
    gap: 5px;
    grid-template-columns: 1fr 1fr;
    align-items: end;
  }
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 600;
  text-align: left;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: left;
  }
`;

const ProductBox = ({ _id, title, description, price, images }) => {
  const { addProduct } = useContext(CartContext);
  const url = "/product/" + _id;
  const notify = () => toast("Производот е додаден во корпа!");
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images?.[0]} alt="" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>{price}ден.</Price>
          <Button
            onClick={() => {
              addProduct(_id);
              notify();
            }}
            black
            outline
            flexButton
            block
          >
            <CartIcon /> Додади во корпа
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
};

export default ProductBox;
