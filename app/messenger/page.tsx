import Chat from "../_components/Chat";
import FriendsList from "../_components/FriendsList";
import Layout from "../_components/Layout";

function page() {
  return <Layout children1={<FriendsList />} children2={<Chat />} />;
}

export default page;
