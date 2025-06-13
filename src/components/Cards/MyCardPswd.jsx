import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import TextInputBox from '../ui/TextInputBox';
import { changePassword } from '@/services/AdminService';
import { successToast, errorToast } from '../ui/customToasts';

export function MyCardPswd() {
  const [oldPswd, setOldPswd] = useState('');
  const [newPswd, setNewPswd] = useState('');
  const [newPswdR, setNewPswdR] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = async () => {
    setError('');

    if (newPswd !== newPswdR) {
      setError('New passwords do not match.');
      return;
    }

    if (!newPswd || !newPswdR || !oldPswd) {
      setError('All fields must be filled.');
      return;
    }

    try {
      await changePassword(oldPswd, newPswd);
      successToast("Password changed Successfully!")
    } catch (error) {
      // errorToast("Something went wrong")
      errorToast(error.message)
    } finally {
      setOldPswd("");
      setNewPswd("");
      setNewPswdR("");
      
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10 shadow-lg border border-gray-200">
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent page reload
          handleConfirm();    // Trigger your confirm logic
        }}
      >
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-800">
            Change Password
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <TextInputBox
            inputType="password"
            id="oldPswd"
            myPlaceholder="Old Password"
            value={oldPswd}
            onChange={(e) => setOldPswd(e.target.value)}
          />
          <TextInputBox
            inputType="password"
            id="newPswd"
            myPlaceholder="New Password"
            value={newPswd}
            onChange={(e) => setNewPswd(e.target.value)}
          />
          <TextInputBox
            inputType="password"
            id="newPswdR"
            myPlaceholder="Repeat New Password"
            value={newPswdR}
            onChange={(e) => setNewPswdR(e.target.value)}
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
            Confirm
          </button>
        </CardFooter>
      </form>
    </Card>

  );
}
