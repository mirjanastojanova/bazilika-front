import Center from "./Center";
import Title from "./Title";
import ActionsGrid from "./ActionsGrid";

const Actions = ({ actions }) => {
  return (
    <Center>
      <Title>АКЦИИ</Title>
      <ActionsGrid products={actions} />
    </Center>
  );
};

export default Actions;
