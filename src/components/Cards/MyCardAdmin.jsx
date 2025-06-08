import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import TextInputBox from '../ui/TextInputBox';
import { createAdmin } from '@/services/AdminService';
import { errorToast, successToast } from '../ui/customToasts';

export function MyCardAdmin({ closePopover }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAddAdmin = async () => {
    setError('');

    if (!email || !password) {
      setError('All fields are required.');
      return;
    }

    try {
      await createAdmin(email, password)
      successToast("Admin created Successfully!")
    } catch (error) {
      // errorToast("Something went Wrong")
      errorToast(error.message);
    } finally {
      closePopover();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10 shadow-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-gray-800">
          Add New Admin
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <TextInputBox
          inputType="email"
          id="email"
          myPlaceholder="Email"
          myValue={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex flex-col gap-1">
          <TextInputBox
            inputType="password"
            id="password"
            myPlaceholder="Password"
            myValue={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 font-medium">{error}</p>
        )}
      </CardContent>

      <CardFooter className="justify-center">
        <button
          onClick={handleAddAdmin}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </CardFooter>
    </Card>
  );
}
