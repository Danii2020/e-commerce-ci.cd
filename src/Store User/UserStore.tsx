import { useState, useEffect } from 'react';
import { db } from '../lib/firebase/firebaseConfig';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

//Reintroducing User object and UpdatedUserData type as string
interface User {
  id: string;
  name: string;
  age: number;
}

type UpdatedUserData = {
  [key: string]: any
}

// Setting use age and name usestate parameters
const DisplayUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newAge, setNewAge] = useState<string>('');
  const [newName, setNewName] = useState<string>('');


//Allowing for update methods to adjust firebase data for specific based on user id from on-click
const updateUser = async (userId: string, updatedData: UpdatedUserData) => {
    const userDoc = doc(db, 'users', userId);
    await updateDoc(userDoc, updatedData);
    setUsers((prevUsers) => prevUsers.map((user) => {
      if (user.id === userId) {
        const updatedUser: User = {
          ...user,
          ...updatedData,
          name: (updatedData.name ?? user.name),
          age: (updatedData.age ?? user.age),
        };
        return updatedUser;
      }
      return user;
    }))
  };

//Removing user from fb and repopulating list without deleted user
const deleteUser = async (userId: string) => {
    await deleteDoc(doc(db, 'users', userId))
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId))
  }

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const dataArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];
      setUsers(dataArray);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Users List</h2>
      {users.map((user) => (
        <div
          key={user.id}
          style={{ backgroundColor: 'white', border: '2px solid black', margin: '10px' }}
        >
          <div key={user.id}>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
          </div>
          <input
            onChange={(e) => setNewName(e.target.value)}
            type="string"
            placeholder="Enter new name:"
          />
          <button onClick={() => updateUser(user.id, { name: newName })}>
            Update Name
          </button>
          <input
            onChange={(e) => setNewAge(e.target.value)}
            type="number"
            placeholder="Enter new age:"
          />
          <button onClick={() => updateUser(user.id, { age: newAge })}>
            Update Age
          </button>
           <button style={{ backgroundColor: 'crimson'}} onClick={() => deleteUser(user.id)}>Delete User</button>
        </div>
      ))}
    </div>

  );
};

export default DisplayUser;