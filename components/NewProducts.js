import Center from "./Center";
import ProductsGrid from "./ProductsGrid";
import Title from "./Title";

const NewProducts = ({ products, title, color }) => {
  return (
    <Center>
      {title ? <Title color>{title}</Title> : <Title>НОВИ ПРОИЗВОДИ</Title>}
      <ProductsGrid products={products} />
    </Center>
  );
};

export default NewProducts;
