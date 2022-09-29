import { useEffect } from "react";
import io from "socket.io-client";
import { Message } from "../domain/message";

const socket = io();

export default function useSocket(eventName: string, cb: (m: Message) => void) {
  useEffect(() => {
    socket.on(eventName, cb);

    return function useSocketCleanup() {
      socket.off(eventName, cb);
    };
  }, [eventName, cb]);

  return socket;
}
