import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import TextInputBox from '../ui/TextInputBox';
import { createUser } from '@/services/UserService';

export function MyCardUser({ closePopover }) {
  const [name, setName] = useState('');
  const [cid, setEmail] = useState('');
  const [level, setLevel] = useState('');
  const [error, setError] = useState('');

  const handleAddUser = () => {
    setError('');

    if (!name || !cid || !level) {
      setError('All fields are required.');
      return;
    }

    if (!Number.isInteger(Number(level))) {
      setError('Access Level must be an Integer');
      return;
    }

    try {
      createUser(name, cid, level);
      // Toast
      closePopover();
    } catch (err) {
      console.error(err);
      setError('Failed Creating User.');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10 shadow-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-gray-800">
          Add User
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <TextInputBox
          inputType="text"
          id="name"
          myPlaceholder="Full Name"
          myValue={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextInputBox
          inputType="email"
          id="cid"
          myPlaceholder="ID doc"
          myValue={cid}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex flex-col gap-1">
          <TextInputBox
            inputType="text"
            id="level"
            myPlaceholder="Access Level (eg. 1,2,3)"
            myValue={level}
            onChange={(e) => setLevel(e.target.value)}
          />
          
        </div>
        
        {error && (
          <p className="text-sm text-red-600 font-medium">{error}</p>
        )}
      </CardContent>

      <CardFooter className="justify-center">
        <button
          onClick={handleAddUser}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </CardFooter>
    </Card>
  );
}
