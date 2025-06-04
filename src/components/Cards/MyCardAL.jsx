import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import TextInputBox from '../ui/TextInputBox';
import { changeUserAccessLevel } from '../../services/UserService';
import { errorToast, successToast } from '../ui/customToasts';

export function MyCardAL({ userId, closePopover }) {
  const [level, setLevel] = useState('');
  const [error, setError] = useState('');

  const handleAccessChange = async () => {
    setError('');

    if (!level) {
      setError('The field is required.');
      return;
    }

    if (!Number.isInteger(Number(level))) {
      setError('Access Level must be an Integer');
      return;
    }

    try {
      await changeUserAccessLevel(userId, level);
      successToast("User Access Level changed Successfully!")
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
          Change User Access
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <p className="text-gray-600">
          Enter a new access level for this user
        </p>
        <TextInputBox
          inputType="text"
          id="level"
          myPlaceholder="New Access Level"
          myValue={level}
          onChange={(e) => setLevel(e.target.value)}
        />
        
        {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
      </CardContent>

      <CardFooter className="justify-center">
        <button
          onClick={handleAccessChange}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Apply Access Change
        </button>
      </CardFooter>
    </Card>
  );
}

