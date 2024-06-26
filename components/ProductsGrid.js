import styled from "styled-components";
import ProductBox from "./ProductBox";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  padding-top: 30px;
  padding-bottom: 50px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const ProductsGrid = ({ products }) => {
  return (
    <Grid>
      {products?.length > 0 &&
        products.map((product) => (
          <ProductBox {...product} key={product._id} />
        ))}
    </Grid>
  );
};

export default ProductsGrid;
