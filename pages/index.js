import { ToastContainer } from "react-toastify";
import { BackToTopButton } from "../components/BackToTopButton";
import Featured from "../components/Featured";
import Header from "../components/Header";
import NewProducts from "../components/NewProducts";
import { mongooseConnect } from "../lib/mongoose";
import { Product } from "../models/Product";
import Actions from "../components/Actions";
import { Action } from "../models/Action";

export default function HomePage({ featuredProduct, newProducts, actions }) {
  return (
    <div>
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
      <Featured product={featuredProduct} />
      <Actions actions={actions} />
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
  const actions = await Action.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  }); // -1 to be in descending order
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      actions: JSON.parse(JSON.stringify(actions)),
    },
  };
};
