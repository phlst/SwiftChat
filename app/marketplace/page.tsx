import Filter from "../_components/Filter";
import Layout from "../_components/Layout";
import Marketplace from "../_components/Marketplace";

function page() {
  return <Layout children1={<Filter />} children2={<Marketplace />} />;
}

export default page;
