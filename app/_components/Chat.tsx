"use client";
import React, { useEffect, useRef } from "react";
import Search from "./Search";

const messages = [
  {
    receiver: true,
    message: "Hello baby girl",
  },
  {
    receiver: true,
    message:
      "Hello baby girl this fine evening i have went to the beatifull park next to my house to look at little children and buy some ice cream",
  },
  {
    receiver: false,
    message: "Hello baby girl",
  },
  {
    receiver: true,
    message: "Hello baby girl",
  },
  {
    receiver: false,
    message: "Hello baby girl",
  },
  {
    receiver: false,
    message: "Hello baby girl",
  },
  {
    receiver: true,
    message: "Hello baby girl",
  },
  {
    receiver: true,
    message:
      "Hello baby girl this fine evening i have went to the beatifull park next to my house to look at little children and buy some ice cream",
  },
  {
    receiver: false,
    message: "Hello baby girl",
  },
  {
    receiver: true,
    message: "Hello baby girl",
  },
  {
    receiver: false,
    message: "Hello baby girl",
  },
  {
    receiver: false,
    message: "Hello baby girl",
  },
  {
    receiver: true,
    message: "Hello baby girl",
  },
  {
    receiver: true,
    message:
      "Hello baby girl this fine evening i have went to the beatifull park next to my house to look at little children and buy some ice cream",
  },
  {
    receiver: false,
    message: "Hello baby girl",
  },
  {
    receiver: true,
    message: "Hello baby girl",
  },
  {
    receiver: false,
    message: "Hello baby girl",
  },
  {
    receiver: false,
    message: "Hello baby girl",
  },
  {
    receiver: true,
    message: "Hello baby girl",
  },
  {
    receiver: true,
    message:
      "Hello baby girl this fine evening i have went to the beatifull park next to my house to look at little children and buy some ice cream",
  },
  {
    receiver: false,
    message: "Hello baby girl",
  },
  {
    receiver: true,
    message: "Hello baby girl",
  },
  {
    receiver: false,
    message: "Hello baby girl",
  },
  {
    receiver: false,
    message: "Hello baby girl",
  },
  {
    receiver: true,
    message: "Hello baby girl",
  },
  {
    receiver: true,
    message:
      "Hello baby girl this fine evening i have went to the beatifull park next to my house to look at little children and buy some ice cream",
  },
  {
    receiver: false,
    message: "Hello baby girl",
  },
  {
    receiver: true,
    message: "Hello baby girl",
  },
  {
    receiver: false,
    message: "Hello baby girl",
  },
  {
    receiver: false,
    message: "Hello baby girl",
  },
  {
    receiver: true,
    message: "Hello baby girl",
  },
  {
    receiver: true,
    message:
      "Hello baby girl this fine evening i have went to the beatifull park next to my house to look at little children and buy some ice cream",
  },
  {
    receiver: false,
    message: "Hello baby girl",
  },
  {
    receiver: true,
    message: "Hello baby girl",
  },
  {
    receiver: false,
    message: "Hello baby girl",
  },
  {
    receiver: false,
    message: "Hello baby girl",
  },
];

function Chat() {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="flex flex-col h-full justify-end">
      <div className="flex flex-col-reverse overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-track-background  scrollbar-thumb-zinc-700 ">
        {messages.map((message, i) => (
          <span
            className={`${
              message.receiver
                ? "bg-shader/20 self-start ml-2"
                : "bg-dark-blue/20 self-end mr-2"
            }  p-1 md:max-w-sm max-w-xs text-shader/80 font-bold rounded-lg mb-2`}
            key={i + message.message}
          >
            {message.message}
          </span>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <Search
        className="p-5 my-2"
        text="Type something ..."
        inputSize="lg"
        wantIcon={false}
      />
    </div>
  );
}

export default Chat;
