import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import TextInputBox from '../ui/TextInputBox';
import { changeDoorPasscode } from '@/services/DoorService';
import { successToast, errorToast } from '../ui/customToasts';

export function MyCardDoorPasscode({ doorId, closePopover }) {
  const [passcode, setPasscode] = useState('');
  const [passcodeRep, setPasscodeRep] = useState('');
  const [error, setError] = useState('');

  const handleChangePasscode = async () => {
    setError('');

    if (!passcode || !passcodeRep) {
      setError('Both fields are required.');
      return;
    }

    if (passcode !== passcodeRep) {
      setError('Passcodes do not match');
      return;
    }

    try {
      await changeDoorPasscode(doorId, passcode);
      successToast("Door Passcode changed Successfully!")
    } catch (error) {
      errorToast(error.message);
    } finally {
      closePopover()
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto mt-10 shadow-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-gray-800">
          Set New Passcode
        </CardTitle>
      </CardHeader>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleChangePasscode();
        }}
      >
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

          {error && (
            <p className="text-sm text-red-600 font-medium">{error}</p>
          )}
        </CardContent>

        <CardFooter className="justify-center mt-4">
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Set
          </button>
        </CardFooter>
      </form>
    </Card>
  );

}
