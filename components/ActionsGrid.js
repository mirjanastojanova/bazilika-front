import styled from "styled-components";
import ActionBox from "./ActionBox";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  padding: 20px;
  margin:0;
  @media screen and (min-width: 768px){
    grid-template-columns: 1fr 1fr 1fr ;
  }
`;

const ActionsGrid = ({ products }) => {
  return (
    <Grid>
      {products?.length > 0 &&
        products.map((product) => <ActionBox {...product} key={product.id} />)}
    </Grid>
  );
};

export default ActionsGrid;
