import fetch from "isomorphic-unfetch";
import { ChatOne } from ".";

const ChatClone = ChatOne;

ChatClone.getInitialProps = async () => {
  const response = await fetch("http://localhost:3000/messages/chat2");
  const messages = await response.json();
  return { messages };
};

export default ChatClone;
