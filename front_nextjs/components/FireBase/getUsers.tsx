import { firestore, collection, getDocs } from "@/app/firebase";

export default async function handler(req : any, res : any) {
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

  if (req.method === 'GET') {
    try {
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      const usersQuery = collection(firestore, 'Users');
      const querySnapshot = await getDocs(usersQuery);
      const users = querySnapshot.docs.map(doc => doc.data());

      return res.status(200).json({ users });
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ error: 'Error fetching users' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
