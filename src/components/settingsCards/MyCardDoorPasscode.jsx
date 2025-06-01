import { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TextInputBox from '../TextInputBox';
import { changeDoorPasscode } from '@/services/DoorService';

export function MyCardDoorPasscode({ doorId, closePopover }) {
  const [passcode, setPasscode] = useState('');
  const [passcodeRep, setPasscodeRep] = useState('');
  const [error, setError] = useState('');
  const [congrat, setCongrat] = useState('');

  const handleChangePasscode = () => {
    setCongrat('');
    setError('');

    if (!passcode || !passcodeRep) {
      setError('Both fields are required.');
      return;
    }

    if(passcode !== passcodeRep) {
        setError('Passcodes do not match');
        return;
    }

    try {
        changeDoorPasscode(doorId, passcode);
        closePopover();
    } catch (err) {
      console.error(err);
      setError('Failed Creating Door.');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10 shadow-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-gray-800">
          Set New Passcode
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">

        <TextInputBox
          inputType="password"
          id="passcode"
          myPlaceholder="New Door Passcode"
          myValue={passcode}
          onChange={(e) => setPasscode(e.target.value)}
        />

        <TextInputBox
          inputType="password"
          id="passcodeRep"
          myPlaceholder="Repeat Door Passcode"
          myValue={passcodeRep}
          onChange={(e) => setPasscodeRep(e.target.value)}
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
          onClick={handleChangePasscode}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Set
        </button>
      </CardFooter>
    </Card>
  );
}
