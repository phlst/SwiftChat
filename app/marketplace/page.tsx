import Filter from "../_components/Filter";
import Layout from "../_components/Layout";
import Marketplace from "../_components/Marketplace";
import ProtectedRoutes from "../_components/ProtectedRoutes";
import { createSessionClient } from "../lib/db/appwrite";

async function page() {
  const user = await (
    await createSessionClient()
  ).account.client.config.session;

  return (
    <ProtectedRoutes user={user}>
      <Layout children1={<Filter />} children2={<Marketplace />} />
    </ProtectedRoutes>
  );
}

export default page;
