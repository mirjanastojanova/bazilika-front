import Center from "./Center";
import Title from "./Title";
import ProductsGrid from "./ProductsGrid";

const Actions = ({ actions }) => {
  return (
    <Center>
      <Title>АКЦИИ</Title>
      <ProductsGrid products={actions} />
    </Center>
  );
};

export default Actions;
