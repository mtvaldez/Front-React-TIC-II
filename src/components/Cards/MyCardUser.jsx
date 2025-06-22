import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import TextInputBox from '../ui/TextInputBox';
import { createUser } from '@/services/UserService';
import { successToast, errorToast } from '../ui/customToasts';
import { refetchUsers } from '@/query/queryHelpers';

export function MyCardUser({ closePopover }) {
  const [name, setName] = useState('');
  const [cid, setCid] = useState('');
  const [level, setLevel] = useState('');
  const [error, setError] = useState('');

  const handleAddUser = async () => {
    setError('');

    if (!name || !cid || !level) {
      setError('All fields are required.');
      return;
    }

    if (!Number.isInteger(Number(level))) {
      setError('Access Level must be an Integer');
      return;
    }

    try {
      await createUser(name, cid, level);
      successToast("User created Successfully!")
      refetchUsers();
      closePopover()
    } catch (error) {
      setError(error.message);
    } 
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10 shadow-lg border border-gray-200">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddUser();
        }}
      >
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-800">
            Add User
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 mt-8">
          <TextInputBox
            inputType="text"
            id="name"
            myPlaceholder="Full Name"
            myValue={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextInputBox
            inputType="text"
            id="cid"
            myPlaceholder="ID doc"
            myValue={cid}
            onChange={(e) => setCid(e.target.value)}
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

        <CardFooter className="justify-center mt-8">
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Add
          </button>
        </CardFooter>
      </form>
    </Card>

  );
}
