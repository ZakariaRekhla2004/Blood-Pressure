import { auth, firestore, doc, setDoc, Timestamp, addDoc, collection } from "@/app/firebase";

export default async function handler(req : any, res : any) {
  if (req.method === 'POST') {
    const { receiverID, message } = req.body;

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

      const currentUserID = currentUser.uid;
      const currentUserEmail = currentUser.email;
      const timestamp = Timestamp.now();

      const newMessage = {
        senderID: currentUserID,
        senderEmail: currentUserEmail,
        receiverID: receiverID,
        message: message,
        timestamp: timestamp,
      };

      const ids = [currentUserID, receiverID].sort();
      const chatRoomID = ids.join('_');
      await addDoc(collection(firestore, `chat_rooms/${chatRoomID}/messages`), newMessage);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error sending message:', error);
      return res.status(500).json({ error: 'Error sending message' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
