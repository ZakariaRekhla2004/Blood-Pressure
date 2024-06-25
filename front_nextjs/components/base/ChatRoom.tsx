"use client";
import { useState, useEffect } from "react";
import axios from "axios";
// import { auth } from "@/app/firebase";
import {
  auth,
  firestore,
  doc,
  setDoc,
  Timestamp,
  addDoc,
  collection,
  orderBy,
  getDocs,
  query,
} from "@/app/firebase";

import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";

interface ChatPageProps {
  receiverEmail: string;
  receiverID: string;
}

interface Message {
  senderID: string;
  message: string;
  timestamp: {
    seconds: number;
  };
}

export default function ChatPage({ receiverEmail, receiverID }: ChatPageProps) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const authUser = auth.currentUser;
  console.log(authUser);
  const currentUserID = auth.currentUser?.uid;
  const currentUserEmail = auth.currentUser?.uid;
  console.log(currentUserID);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (authUser) {
        setCurrentUser(authUser);
        fetchMessages(authUser!.uid);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, [receiverID]);

  const fetchMessages = async (senderID: string) => {
    try {
      const ids = [authUser!.uid, receiverID].sort();
      const chatRoomID = ids.join("_");

      const messagesQuery = query(
        collection(firestore, `chat_rooms/${chatRoomID}/messages`),
        orderBy("timestamp", "asc")
      );

      const querySnapshot = await getDocs(messagesQuery);
      const messages = querySnapshot.docs.map((doc) => doc.data());
      setMessages(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    try {
    
      const timestamp = Timestamp.now();
      const newMessage = {
        senderID: currentUserID,
        senderEmail: currentUserEmail,
        receiverID: receiverID,
        message: message,
        timestamp: timestamp,
      };
      const ids = [currentUserID, receiverID].sort();
      const chatRoomID = ids.join("_");
      await addDoc(
        collection(firestore, `chat_rooms/${chatRoomID}/messages`),
        newMessage
      );
      
      setMessage("");
      fetchMessages(authUser!.uid);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between bg-blue-500 text-white p-4">
        <div className="flex items-center">
          {/* <img
            src="/path/to/your/placeholder.png"
            alt="Receiver Avatar"
            className="w-10 h-10 rounded-full mr-4"
          /> */}
          <div>
            <h2 className="text-lg">{receiverEmail}</h2>
            <p className="flex items-center">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full inline-block mr-2"></span>
              online
            </p>
          </div>
        </div>
      </header>

      <div className="flex-1 p-2 overflow-y-auto ">
        {" "}
        {/* Adjusted padding */}
        {messages.slice().reverse().map((msg, index) => ( 
          <div
            key={index}
            className={`p-2  rounded-lg mb-2 relative   ${
              /* Adjusted padding */
              msg.senderID === currentUser?.uid
                ? "bg-blue-200 self-end"
                : "bg-gray-200 self-start"
            }`}
            style={{ fontSize: "0.9rem" }} // Adjusted font size
          >
            <p>{msg.message}</p>
            <span className="text-xs text-gray-600 absolute bottom-1 right-2">
              {new Date(msg.timestamp.seconds * 1000).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center p-4 bg-gray-100">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 p-2 border border-gray-300 rounded-lg mr-2"
        />
        <button
          onClick={handleSendMessage}
          className="p-2 bg-blue-500 text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
