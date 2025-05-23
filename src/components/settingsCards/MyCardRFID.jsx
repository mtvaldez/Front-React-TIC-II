import { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TextInputBox from '../TextInputBox';

export function MyCardRFID() {
  const [email, setEmail] = useState('');
  const [rfid, setRfid] = useState('');
  const [error, setError] = useState('');
  const [congrat, setCongrat] = useState('');

  const handleAssign = () => {
    setCongrat('');
    if (!email || !rfid) {
      setError('Email and RFID are required.');
      return;
    }
    fetch(`${localStorage.getItem("url")}/add-rfid`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({  
        email: email, 
        rfid: rfid
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.result === 1) {
        alert(data.error);
      } else if (data.result == 0) {
        setCongrat('RFID asociated successfully')
      }
    })
    .catch(error => {
      console.error("Failed to asociate RFID:", error);
    });

    setError('');
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10 shadow-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-gray-800">
          Assign RFID to User
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <TextInputBox
          inputType="email"
          myID="email"
          myPlaceholder="User Email"
          myValue={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInputBox
          inputType="text"
          myID="rfid"
          myPlaceholder="RFID Tag"
          myValue={rfid}
          onChange={(e) => setRfid(e.target.value)}
        />
        {congrat && (
          <p className="text-sm text-green-600 font-medium">{congrat}</p>
        )}
        {error && (
          <p className="text-sm text-red-600 font-medium">{error}</p>
        )}
      </CardContent>

      <CardFooter className="justify-center">
        <button
          onClick={handleAssign}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Assign RFID
        </button>
      </CardFooter>
    </Card>
  );
}
