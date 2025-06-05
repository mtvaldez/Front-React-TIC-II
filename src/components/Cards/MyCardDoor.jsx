import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import TextInputBox from '../ui/TextInputBox';
import { createDoor } from '@/services/DoorService';
import { successToast, errorToast } from '../ui/customToasts';
import { refetchDoors } from '@/utils/queryHelpers';

export function MyCardDoor({ closePopover }) {
  const [name, setName] = useState('');
  const [passcode, setPasscode] = useState('');
  const [passcodeRep, setPasscodeRep] = useState('');
  const [level, setLevel] = useState('');
  const [error, setError] = useState('');

  const handleAddDoor = async () => {
    setError('');

    if (!name || !passcode || !passcodeRep || !level) {
      setError('All fields are required.');
      return;
    }

    if (passcode !== passcodeRep) {
      setError('Passcodes do not match');
      return;
    }

    if (!Number.isInteger(Number(level))) {
      setError('Access Level must be an Integer');
      return;
    }

    try {
      await createDoor(name, passcode, level);
      successToast("Door created Successfully!")
      refetchDoors();
    } catch (error) {
      // errorToast("Something went Wrong")
      errorToast(error.message);
    } finally {
      closePopover()
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10 shadow-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-gray-800">
          Add Door
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <TextInputBox
          inputType="text"
          id="name"
          myPlaceholder="Door Name"
          myValue={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextInputBox
          inputType="password"
          id="passcode"
          myPlaceholder="Door Passcode"
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
          onClick={handleAddDoor}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </CardFooter>
    </Card>
  );
}
