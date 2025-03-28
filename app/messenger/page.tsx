import Chat from "../_components/Chat";
import Layout from "../_components/Layout";
import MessengerSideBar from "../_components/MessengerSideBar";

function page() {
  return <Layout children1={<MessengerSideBar />} children2={<Chat />} />;
}

export default page;
