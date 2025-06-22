import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import TextInputBox from '../ui/TextInputBox';
import { changeDoorAccessLevel } from '@/services/DoorService';
import { successToast, errorToast } from '../ui/customToasts';
import { refetchDoors } from '@/query/queryHelpers';

export function MyCardDoorAL({ doorId, closePopover }) {
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
      await changeDoorAccessLevel(doorId, level);
      successToast("Door Access Level changed Successfully!")
      refetchDoors();
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
          Change Door Access Level
        </CardTitle>
      </CardHeader>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAccessChange();
        }}
      >
        <CardContent className="flex flex-col gap-4">
          <p className="text-gray-600">
            A door access level represents the minimum level a user must have to access
          </p>
          <TextInputBox
            inputType="text"
            id="level"
            myPlaceholder="New Access Level"
            myValue={level}
            onChange={(e) => setLevel(e.target.value)}
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
            Apply Access Change
          </button>
        </CardFooter>
      </form>
    </Card>
  );

}

