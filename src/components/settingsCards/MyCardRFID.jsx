import { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TextInputBox from '../TextInputBox';
import { setUserRFID } from '../../services/UserService';

export function MyCardRFID({ userId, closePopover }) {

  const [rfid, setRfid] = useState('');
  const [error, setError] = useState('');
  const [congrat, setCongrat] = useState('');

  const handleAssign = async () => {
    setError('');
    setCongrat('');
    if (!rfid) {
      setError('RFID is required.');
      return;
    }

    try {
      await setUserRFID(userId, rfid); // Make sure this returns a Promise
      closePopover()
    } catch (err) {
      console.error(err);
      setError('Failed to change access level.');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10 shadow-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-gray-800">
          Assign RFID to User
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {/* RFID Input */}
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
