import { BackToTopButton } from "../components/BackToTopButton";
import Featured from "../components/Featured";
import Header from "../components/Header";
import NewProducts from "../components/NewProducts";
import { mongooseConnect } from "../lib/mongoose";
import { Product } from "../models/Product";

export default function HomePage({ featuredProduct, newProducts }) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
      <BackToTopButton />
    </div>
  );
}


// using it as a function from Next JS as you need data on request
export const getServerSideProps = async () => {
  const featuredProductId = "65fd89d5ea3e44a52d41421b";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  }); // -1 to be in descending order
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
};
