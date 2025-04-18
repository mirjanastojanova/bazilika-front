import Header from "../components/Header";
import Center from "../components/Center";
import Title from "../components/Title";
import PricelistTable from "../components/PricelistTable";

export default function PriceList() {
    
  return (
    <>
      <Header />
      <Center>
        <Title>Ценовник</Title>
        <PricelistTable />
      </Center>

      
    </>
  );
}