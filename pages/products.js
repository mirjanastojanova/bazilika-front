import Header from "../components/Header";
import Center from "../components/Center";
import { mongooseConnect } from "../lib/mongoose";
import { Product } from "../models/Product";
import ProductsGrid from "../components/ProductsGrid";
import Title from "../components/Title";
import { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/custom/Input";

const UlStyle = styled.ul`
  display: flex;
  gap: 15px;
  list-style: none;
  justify-content: center;
  padding: 0;
`;

const ProductsPage = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const records = products.slice(firstIndex, lastIndex);
  const npage = Math.ceil(products.length / productsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changeCurrentPage = (id) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    if (lastIndex < products.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  //search bar implementation
  const [query, setQuery] = useState("");

  //Our search filter function
  const searchFilter = (array) => {
    return array.filter((el) => el.title.toLowerCase().includes(query));
  };

  //Applying our search filter function to our array of countries recieved from the API
  const filtered = searchFilter(products);

  //Handling the input on our search bar
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <Header />
      <Center>
        <Title>Сите производи</Title>
        <Input search={handleChange}/>
        <ProductsGrid products={filtered} />
        <nav>
          <UlStyle>
            <li>
              <Button href="#" onClick={prevPage}>
                {"<<"}
              </Button>
            </li>
            {numbers.map((n, i) => (
              <li key={i}>
                <Button href="#" onClick={() => changeCurrentPage(n)}>
                  {n}
                </Button>
              </li>
            ))}
            <li>
              <Button href="#" onClick={nextPage}>
                {">>"}
              </Button>
            </li>
          </UlStyle>
        </nav>
      </Center>
    </>
  );
};

export async function getServerSideProps(req, res) {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

export default ProductsPage;
