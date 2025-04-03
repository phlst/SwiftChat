"use client";

import FriendsList from "./FriendsList";
import Search from "../Search";
import { searchUsersByPrefix } from "@/app/lib/db/appwrite";
import { useState } from "react";
import Image from "next/image";

interface Friend {
  name: string;
  email: string;
  avatar: string;
}

function MessengerSideBar() {
  const [finding, setFinding] = useState(false);
  const [friends, setFriends] = useState<Friend[]>([]);

  async function onChange(e: string) {
    if (e.length > 0) {
      setFinding(true);
    }
    if (e.length === 0) {
      setFinding(false);
    }
    const data = await searchUsersByPrefix(e);
    if (data.length > 0) {
      setFriends(data);
    } else {
      setFriends([]);
    }
  }

  return (
    <div className="px-4 h-full">
      <h1 className="text-white mb-4 text-2xl font-bold">Chats</h1>
      <Search onChange={onChange} inputSize="lg" text="Find someone..." />
      {finding ? (
        <div className="w-full scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-track-background scrollbar-thumb-zinc-700 mt-5 max-h-full overflow-y-auto overflow-x-hidden flex pb-15 flex-col">
          {friends.map((friend, i) => (
            <div
              className={`flex justify-start items-center space-x-4 p-4 rounded-lg`}
              key={i + friend.name}
            >
              <div className="relative w-16 h-16">
                <Image
                  fill={true}
                  alt="friend's image"
                  src={friend.avatar}
                  sizes="cover"
                  className="rounded-full object-cover"
                  priority={true}
                />
              </div>

              <div>
                <h2 className="text-lg text-white font-semibold">
                  {friend.name}
                </h2>
                {/* <p className="text-gray-600">{friend.lastMessage}</p> */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <FriendsList />
      )}
    </div>
  );
}

export default MessengerSideBar;
