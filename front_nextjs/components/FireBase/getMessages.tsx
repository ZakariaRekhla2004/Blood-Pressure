import { auth, firestore, collection, query, where, orderBy, getDocs } from "@/app/firebase";

export default async function handler(req :any, res:any) {
  if (req.method === 'GET') {
    const { userID, otherUserID } = req.query;

    try {
      const ids = [userID, otherUserID].sort();
      const chatRoomID = ids.join('_');

      const messagesQuery = query(
        collection(firestore, `chat_rooms/${chatRoomID}/messages`),
        orderBy('timestamp', 'asc')
      );

      const querySnapshot = await getDocs(messagesQuery);
      const messages = querySnapshot.docs.map(doc => doc.data());

      return res.status(200).json({ messages });
    } catch (error) {
      console.error('Error fetching messages:', error);
      return res.status(500).json({ error: 'Error fetching messages' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
