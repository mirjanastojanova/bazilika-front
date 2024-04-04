import Center from "./Center";
import styled from "styled-components";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FeaturedProductImage = styled.img`
  width: auto;
  height: auto;
`

const Bg = styled.div`
  background-color: #EEF5FF;
  color: #211e51;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;
  @media screen and (min-width: 768px){
    font-size: 3rem;
  }
`;

const Desc = styled.p`
  color: #211e51;
  font-size: 1rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img {
    max-width: 50%;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const Featured = ({ product }) => {
  const { addProduct } = useContext(CartContext);
  const notify = () => toast("Производот е додаден во корпа!");
  const addFeaturedToCart = () => {
    addProduct(product._id);
    notify();
  };
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Desc>{product.description}</Desc>
              <ButtonsWrapper>
                <ButtonLink
                  href={"/product/" + product._id}
                  outline={1}
                  white={1}
                  size={"l"}
                >
                  Прочитај повеќе
                </ButtonLink>
                <Button white size={"l"} onClick={addFeaturedToCart}>
                  <CartIcon />
                  Додади во корпа
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <FeaturedProductImage
              src={product.images?.[0]}
              alt=""
            />
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
};

export default Featured;
