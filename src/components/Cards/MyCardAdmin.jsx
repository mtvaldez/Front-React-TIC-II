import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import TextInputBox from '../ui/TextInputBox';
import { createAdmin } from '@/services/AdminService';
import { errorToast, successToast } from '../ui/customToasts';
import { refetchAdmins } from '@/query/queryHelpers';

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
    
    if(email.indexOf('@') == -1) {
      setError('Invalid Email');
      return;  
    }

    try {
      await createAdmin(email, password)
      successToast("Admin created Successfully!")
      refetchAdmins()
      closePopover();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10 shadow-lg border border-gray-200">
      <form
        onSubmit={(e) => {
          e.preventDefault();  // prevent actual form submission/reload
          handleAddAdmin();    // call your handler
        }}
      >
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-800">
            Add New Admin
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 mt-8">
          <TextInputBox
            inputType="text"
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

        <CardFooter className="justify-center mt-8">
          <button
            type="submit"  // important: triggers onSubmit on Enter
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Add
          </button>
        </CardFooter>
      </form>
    </Card>

  );
}
