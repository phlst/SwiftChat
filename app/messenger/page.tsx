import Chat from "../_components/Messenger/Chat";
import Layout from "../_components/Layout";
import MessengerSideBar from "../_components/Messenger/MessengerSideBar";
import ProtectedRoutes from "../_components/ProtectedRoutes";
import { createSessionClient } from "../lib/db/appwrite";

async function page() {
  const user = await (
    await createSessionClient()
  ).account.client.config.session;

  return (
    <ProtectedRoutes user={user}>
      <Layout children1={<MessengerSideBar />} children2={<Chat />} />
    </ProtectedRoutes>
  );
}

export default page;
