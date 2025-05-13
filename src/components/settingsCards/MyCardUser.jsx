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
  const [cid, setEmail] = useState('');
  const [level, setLevel] = useState('');
  const [error, setError] = useState('');
  const [congrat, setCongrat] = useState('');

  const handleAddUser = () => {
    setCongrat('');
    if (!name || !cid || !level) {
      setError('All fields are required.');
      return;
    }
    fetch(`${localStorage.getItem("url")}/add-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        full_name: name, 
        cid: cid, 
        access_level: level
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.result === 1) {
        alert(data.error);
      } else if (data.result == 0) {
        setCongrat('User added successfully')
      }
    })
    .catch(error => {
      console.error("Failed to add user:", error);
    });
    setError('');
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
          id="cid"
          myPlaceholder="ID doc"
          myValue={cid}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex flex-col gap-1">
          <TextInputBox
            inputType="text"
            id="level"
            myPlaceholder="Access Level"
            myValue={level}
            onChange={(e) => setLevel(e.target.value)}
          />
          {/* <p className="text-xs text-gray-500 pl-1">
            suggestion 
          </p> */}
        </div>
        {congrat && (
          <p className="text-sm text-green-600 font-medium">{congrat}</p>
        )}
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
