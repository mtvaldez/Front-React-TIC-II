import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import TextInputBox from '../ui/TextInputBox';
import { setUserRFID } from '../../services/UserService';
import { successToast, errorToast } from '../ui/customToasts';
import { refetchUsers } from '@/query/queryHelpers';

export function MyCardRFID({ userId, closePopover }) {
  const [rfid, setRfid] = useState('');
  const [error, setError] = useState('');

  const handleAssign = async () => {
    setError('');

    if (!rfid) {
      setError('RFID is required.');
      return;
    }

    try {
      await setUserRFID(userId, rfid);
      successToast("User RFID set Successfully!")
      refetchUsers();
    } catch (error) {
      errorToast(error.message)
    } finally {
      closePopover()
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10 shadow-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-gray-800">
          Assign RFID to User
        </CardTitle>
      </CardHeader>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAssign();
        }}
      >
        <CardContent className="flex flex-col gap-4">
          <p className="text-gray-600">Assign an RFID access key to a user</p>

          <TextInputBox
            inputType="text"
            myID="rfid"
            myPlaceholder="RFID Tag"
            myValue={rfid}
            onChange={(e) => setRfid(e.target.value)}
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
            Assign RFID
          </button>
        </CardFooter>
      </form>
    </Card>
  );
}
