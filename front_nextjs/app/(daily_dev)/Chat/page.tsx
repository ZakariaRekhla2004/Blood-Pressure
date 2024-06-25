'use client'
import { authOptions, CustomSession } from '@/app/api/auth/[...nextauth]/authOptions';
import ChatPage from '@/components/base/ChatRoom';
import UserList from '@/components/base/DisplayUsers';
import { getServerSession } from 'next-auth';
import { useState } from 'react';


const Chat = () => {
  const [selectedUser, setSelectedUser] = useState<{ receiverEmail: string, receiverID: string } | null>(null);

  const handleUserSelect = (user: { uid: string, email: string }) => {
    setSelectedUser({ receiverEmail: user.email, receiverID: user.uid });
  };

  return (
    <div className="flex h-screen w-full">
      <div className="w-1/3 border-r">
        <UserList onSelectUser={handleUserSelect} />
      </div>
      <div className="w-2/3">
        {selectedUser ? (
          <ChatPage receiverEmail={selectedUser.receiverEmail} receiverID={selectedUser.receiverID} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;