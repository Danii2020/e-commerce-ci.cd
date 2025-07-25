import React, { useState } from 'react';
import { db } from '../lib/firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

//Initiating User object and creating User for firestore db
interface User {
  id?: string;
  name: string;
  age: number;
}

//Adding additional user to User database
const AddUserForm = () => {
  const [data, setData] = useState<Omit<User, 'id'>>({ name: '', age: 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: name === 'age' ? parseInt(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'users'), data);
      alert('Data added!');
      setData({ name: '', age: 0 });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={data.name} onChange={handleChange} placeholder="Name" />
      <input name="age" type="number" value={data.age} onChange={handleChange} placeholder="Age" />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUserForm;