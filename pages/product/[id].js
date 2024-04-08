import styled from "styled-components";
import Center from "../../components/Center";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { mongooseConnect } from "../../lib/mongoose";
import { Product } from "../../models/Product";
import Box from "../../components/Box";
import ProductImages from "../../components/ProductImages";
import Button from "../../components/Button";
import CartIcon from "../../components/icons/CartIIcon";
import { useContext } from "react";
import { CartContext } from "../../components/CartContext";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;
const Text = styled.span`
  border-left: 1px solid #dddddd;
  padding-left: 25px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Price = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #211e51;
`;

const ProductPage = ({ product }) => {
  const { addProduct } = useContext(CartContext);
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <Box>
            <ProductImages images={product.images} />
          </Box>
          <Text>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <Price>{product.price}ден.</Price>
              <div>
                <Button
                  flexButton="true"
                  block="true"
                  onClick={() => addProduct(product._id)}
                >
                  <CartIcon />
                  Додади во корпа
                </Button>
              </div>
            </PriceRow>
          </Text>
        </ColWrapper>
      </Center>
    </>
  );
};

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}

export default ProductPage;
