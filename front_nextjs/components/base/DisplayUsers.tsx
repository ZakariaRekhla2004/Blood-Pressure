'use client'

import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'; // Import useAuthState hook
import { auth, firestore } from '@/app/firebase';
import { collection, getDocs } from 'firebase/firestore';

interface User {
  uid: string;
  email: string;
}

interface UserListProps {
  onSelectUser: (user: User) => void;
}

const UserList = ({ onSelectUser }: UserListProps) => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, userLoading, userError] = useAuthState(auth); // Get current user using useAuthState hook

  useEffect(() => {
    const fetchUsers = async () => {
      try {

        const usersQuery = collection(firestore, 'Users');
        const querySnapshot = await getDocs(usersQuery);
        const usersData = querySnapshot.docs.map(doc => doc.data());
        
        // Filter out the current user from the list based on email
        const currentUserEmail = user?.email;
        const filteredUsers = usersData.filter(userData => userData.email !== currentUserEmail);

        setUsers(filteredUsers);
      } catch (err) {
        setError('Error fetching users');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]); // Include user in the dependency array

  if (loading || userLoading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error || userError) {
    // return <div className="text-center mt-4 text-red-500">{error || userError}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">User List</h2>
      <ul className="space-y-2">
        {users.map((userData) => (
          <li key={userData.uid} className="p-4 border rounded-lg bg-white shadow cursor-pointer" onClick={() => onSelectUser(userData)}>
            <div className="flex items-center">
              <div className="bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-4">
                {userData.email.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-lg font-medium">{userData.email}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
