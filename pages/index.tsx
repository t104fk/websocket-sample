import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { Message } from "../domain/message";
import useSocket from "../hooks/useSocket";

type Props = {
  messages: Message[];
};
export const ChatOne: NextPage<Props> = (props) => {
  const [field, setField] = useState("");
  const [newMessage, setNewMessage] = useState(0);
  const [messages, setMessages] = useState<Message[]>(props.messages || []);

  const socket = useSocket("message.chat1", (message) => {
    setMessages((messages) => [...messages, message]);
  });

  useSocket("message.chat2", () => {
    setNewMessage((newMessage) => newMessage + 1);
  });

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    // create message object
    const message = {
      id: new Date().getTime(),
      value: field,
    };

    // send object to WS server
    socket.emit("message.chat1", message);
    setField("");
    setMessages((messages) => [...messages, message]);
  };

  return (
    <main>
      <div>
        <Link href="/">
          <a>{"Chat One"}</a>
        </Link>
        <br />
        <Link href="/clone">
          <a>
            {`Chat Two${
              newMessage > 0 ? ` ( ${newMessage} new message )` : ""
            }`}
          </a>
        </Link>
        <ul>
          {messages.map((message) => (
            <li key={message.id}>{message.value}</li>
          ))}
        </ul>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            onChange={(e) => setField(e.target.value)}
            type="text"
            placeholder="Hello world!"
            value={field}
          />
          <button>Send</button>
        </form>
      </div>
    </main>
  );
};

export default ChatOne;
