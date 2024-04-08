import Header from "../components/Header";
import Center from "../components/Center";
import { mongooseConnect } from "../lib/mongoose";
import { Product } from "../models/Product";
import ProductsGrid from "../components/ProductsGrid";
import Title from "../components/Title";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/custom/Input";
import { Category } from "../models/Category";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  useMediaQuery,
} from "@mui/material";

const GridBox = styled.div`
  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 10px;
  }
`;

const Categories = styled.div`
  border: 1px solid #dddddd;
  border-radius: 10px;
  margin-top: 30px;
  height: max-content;
`;

const CatTitleContainer = styled.div`
  background-color: #597e52;
  border-top: 1px solid #597e52;
  border-radius: 10px 10px 0 0;
  padding: 10px 10px;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  color: #eeeeee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (min-width: 768px) {
    justify-content: center;
  }
`;

const CatTitle = styled.span``;

const CatList = styled(FormGroup)`
  margin: 10px;
  ${(props) =>
    props.mobileView
      ? `
    display: flex;
    flex-direction: column;
  `
      : `
    display: none;
  `}
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;

const CatLabel = styled(FormControlLabel)`
  /* border-bottom: 1px solid black; */
`;

const UlStyle = styled.ul`
  display: flex;
  gap: 15px;
  list-style: none;
  justify-content: center;
  padding: 0;
`;

const ProductsPage = ({ products, categories }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const records = products.slice(firstIndex, lastIndex);
  const npage = Math.ceil(products.length / productsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [mobileView, setMobileView] = useState(false);

  const isMobileScreen = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    setMobileView(isMobileScreen);
  }, []);

  // Pages
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

  // Search bar implementation
  const [query, setQuery] = useState("");

  const searchFilter = (array) => {
    return array.filter((el) => el.title.toLowerCase().includes(query));
  };

  let filtered = searchFilter(products);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // Setting for search through category selection
  const categoryHandler = (id) => {
    const index = selectedCategories.indexOf(id);
    if (index === -1) {
      setSelectedCategories([...selectedCategories, id]);
    } else {
      setSelectedCategories(selectedCategories.filter((catId) => catId !== id));
    }
  };

  // Function to filter products based on selected categories
  const filteredProducts =
    selectedCategories.length > 0
      ? products.filter((p) => selectedCategories.includes(p.category))
      : filtered;

  return (
    <>
      <Header />
      <Center>
        <Title>СИТЕ ПРОИЗВОДИ</Title>
        <Input search={handleChange} />
        <GridBox>
          <Categories>
            <CatTitleContainer>
              <CatTitle>КАТЕГОРИИ</CatTitle>
              {isMobileScreen && (
                <Button onClick={() => setMobileView((prev) => !prev)} catplus="true">
                  +
                </Button>
              )}
            </CatTitleContainer>
            <CatList mobileView={mobileView}>
              {categories?.map((c) => (
                <CatLabel
                  key={c._id}
                  control={<Checkbox />}
                  label={c.name}
                  onChange={() => categoryHandler(c._id)}
                  checked={selectedCategories.includes(c._id)}
                >
                  {c.name}
                </CatLabel>
              ))}
            </CatList>
          </Categories>
          <ProductsGrid products={filteredProducts} />
        </GridBox>
        <nav>
          <UlStyle>
            <li>
              <Button href="#" onClick={prevPage} numbers="true">
                {"<<"}
              </Button>
            </li>
            {numbers.map((n, i) => (
              <li key={i}>
                <Button href="#" onClick={() => changeCurrentPage(n)} numbers>
                  {n}
                </Button>
              </li>
            ))}
            <li>
              <Button href="#" onClick={nextPage} numbers>
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
  const categories = await Category.find({}, null, { sort: { name: 1 } });
  console.log(categories);
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}

export default ProductsPage;
