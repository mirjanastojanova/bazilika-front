import styled from "styled-components";
import Header from "../components/Header";
import Center from "../components/Center";
import Button from "../components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../components/CartContext";
import axios from "axios";
import Table from "../components/Table";
import Input from "../components/Input";
import { useRouter } from "next/router";
import Box from "../components/Box";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  margin-top: 40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.3fr 0.7fr;
  }
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 100px;
  height: 100px;
  padding: 2px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 80px;
    max-height: 80px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
  }
`;
const QuantityLabel = styled.span`
  padding: 0 3px;
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const CartPage = () => {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (cartProducts?.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  const increaseQuantity = (productId) => {
    addProduct(productId);
  };
  const decreaseQuantity = (productId) => {
    removeProduct(productId);
  };

  const goToPayment = async () => {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });
    if (response?.data?.url) {
      window.location = response.data.url;
    }
    if (response.data.success === true) {
      setIsSuccess(true);
    }
  };

  let total = 0;
  for (const prodId of cartProducts) {
    const price = products.find((p) => p._id === prodId)?.price || 0;
    total += price;
  }

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Благодариме за нарачката!</h1>
              <p>Ќе бидете контактирани во најбрзо време.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Корпа</h2>
            {!cartProducts?.length && <div>Вашата корпа е празна.</div>}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Производ</th>
                    <th>Количина</th>
                    <th>Цена</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} />
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button onClick={() => decreaseQuantity(product._id)}>
                          -
                        </Button>
                        <QuantityLabel>
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                        </QuantityLabel>
                        <Button onClick={() => increaseQuantity(product._id)}>
                          +
                        </Button>
                      </td>
                      <td>
                        {cartProducts.filter((id) => id === product._id)
                          .length * product.price}
                        ден.
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <ProductInfoCell>
                      <b>{total}ден.</b>
                    </ProductInfoCell>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {!!cartProducts?.length > 0 && (
            <Box>
              <h2>Информации за корисникот</h2>
              <Input
                type="text"
                placeholder="Име"
                value={name}
                name="name"
                onChange={(ev) => setName(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Емејл"
                value={email}
                name="email"
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Град"
                value={city}
                name="city"
                onChange={(ev) => setCity(ev.target.value)}
              />
              <CityHolder>
                <Input
                  type="text"
                  placeholder="Поштенски број"
                  value={postalCode}
                  name="postalCode"
                  onChange={(ev) => setPostalCode(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Улица"
                  value={streetAddress}
                  name="streetAddress"
                  onChange={(ev) => setStreetAddress(ev.target.value)}
                />
              </CityHolder>
              <Input
                type="text"
                placeholder="Држава"
                value={"Македонија"}
                name="country"
                onChange={(ev) => setCountry(ev.target.value)}
              />
              <Button
                black="true"
                block="true"
                primary="true"
                onClick={goToPayment}
              >
                Порачај
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
};

export default CartPage;
