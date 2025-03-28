import FriendsList from "./FriendsList";
import Search from "./Search";

function MessengerSideBar() {
  return (
    <div className="px-4">
      <Search inputSize="lg" text="Find someone..." />
      <FriendsList />
    </div>
  );
}

export default MessengerSideBar;
