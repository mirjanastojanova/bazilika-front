import Center from "./Center";
import ProductsGrid from "./ProductsGrid";
import Title from "./Title";

const NewProducts = ({ products }) => {
  return (
    <Center>
      <Title>НОВИ ПРОИЗВОДИ</Title>
      <ProductsGrid products={products} />
    </Center>
  );
};

export default NewProducts;
