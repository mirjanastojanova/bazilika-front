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
  border: 1px solid #dddddd;
  border-radius: 10px;
  padding: 10px;
  @media screen and (min-width: 768px) {
    width: 100%;
    height: 280px;
  }
  @media screen and (min-width: 992px) {
    width: 80%;
    height: 280px;
  }
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
  @media screen and (min-width: 768px) {
    img {
      max-width: 100%;
      max-height: 160px;
    }
  }
`;

const Title = styled(Link)`
  font-weight: 600;
  font-size: 1rem;
  color:#0C356A;
  text-decoration: none;
  border-top: 1px solid #dddddd;
  padding-top: 5px;
`;

const ProductInfoBox = styled.div`
  /* margin-top: 10px; */
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
    margin: 0;
  }
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 600;
  text-align: left;
  color: #211e51;
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
      <Title href={url}>{title}</Title>
      <ProductInfoBox>
        <PriceRow>
          <Price>{price}ден.</Price>
          <Button
            onClick={() => {
              addProduct(_id);
              notify();
            }}
            flexButton="true"
            block="true"
          >
            <CartIcon /> Додади во корпа
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
};

export default ProductBox;
