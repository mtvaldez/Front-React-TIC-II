import { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TextInputBox from '../TextInputBox'; 

export function MyCardUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [door, setDoor] = useState('');
  const [error, setError] = useState('');

  const handleAddUser = () => {
    if (!name || !email || !door) {
      setError('All fields are required.');
      return;
    }

    setError('');
    console.log({ username: name, email, door });
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
          myPlaceholder="Complete Name"
          myValue={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextInputBox
          inputType="email"
          id="email"
          myPlaceholder="Email"
          myValue={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex flex-col gap-1">
          <TextInputBox
            inputType="text"
            id="door"
            myPlaceholder="Doors (use ',' to list)"
            myValue={door}
            onChange={(e) => setDoor(e.target.value)}
          />
          <p className="text-xs text-gray-500 pl-1">
            e.g. Entrance, Server Room
          </p>
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
          Add User
        </button>
      </CardFooter>
    </Card>
  );
}
