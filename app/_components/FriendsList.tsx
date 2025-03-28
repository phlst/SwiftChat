import Image from "next/image";

const friendData = [
  {
    name: "Magyar",
    img: "/clownImg.jpg",
    lastMessage: "Zjedz mi kar ty lekvar",
    active: false,
  },
  {
    name: "Magyar",
    img: "/clownImg.jpg",
    lastMessage: "Zjedz mi kar ty lekvar",
    active: false,
  },
  {
    name: "Magyar",
    img: "/clownImg.jpg",
    lastMessage: "Zjedz mi kar ty lekvar",
    active: true,
  },
  {
    name: "Magyar",
    img: "/clownImg.jpg",
    lastMessage: "Zjedz mi kar ty lekvar",
    active: false,
  },
  {
    name: "Magyar",
    img: "/clownImg.jpg",
    lastMessage: "Zjedz mi kar ty lekvar",
    active: false,
  },
  {
    name: "Magyar",
    img: "/clownImg.jpg",
    lastMessage: "Zjedz mi kar ty lekvar",
    active: false,
  },
];

function FriendsList() {
  return (
    <div className="w-full mt-5 h-full flex flex-col space-y-4">
      {friendData.map((friend, i) => (
        <div
          className={`flex ${
            friend.active ? "bg-shader/70" : ""
          }  justify-start items-center space-x-4 p-4 rounded-lg`}
          key={i + friend.name}
        >
          <div className="relative w-16 h-16">
            <Image
              fill={true}
              alt="friend's image"
              src={friend.img}
              className="rounded-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-lg text-white font-semibold">{friend.name}</h2>
            <p className="text-gray-600">{friend.lastMessage}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FriendsList;
