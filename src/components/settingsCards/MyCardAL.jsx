import { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TextInputBox from '../TextInputBox';

export function MyCardAL() {
  const [email, setEmail] = useState('');
  const [selectedDoor, setSelectedDoor] = useState('');
  const [accessType, setAccessType] = useState('add'); // 'add' or 'remove'
  const [error, setError] = useState('');

  const handleAccessChange = () => {
    if (!email || !selectedDoor || !accessType) {
      setError('All fields are required.');
      return;
    }

    setError('');
    console.log({ email, door: selectedDoor, action: accessType });
    // Add your API/backend call here
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10 shadow-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-gray-800">
          Change User Access
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {/* Email input */}
        <TextInputBox
          inputType="email"
          id="email"
          myPlaceholder="User Email"
          myValue={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Door dropdown */}
        <div className="flex flex-col gap-1">
          <label htmlFor="door" className="text-sm font-medium text-gray-700">
            Select Door
          </label>
          <select
            id="door"
            value={selectedDoor}
            onChange={(e) => setSelectedDoor(e.target.value)}
            className="border rounded px-3 py-2 text-gray-800 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">-- Choose a door --</option>
            <option value="Entrance">Entrance</option>
            <option value="Server Room">Server Room</option>
            <option value="Office">Office</option>
          </select>
        </div>

        {/* Access type: Add or Remove */}
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="accessType"
              value="add"
              checked={accessType === 'add'}
              onChange={() => setAccessType('add')}
              className="accent-blue-600"
            />
            <span>Add Access</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="accessType"
              value="remove"
              checked={accessType === 'remove'}
              onChange={() => setAccessType('remove')}
              className="accent-red-600"
            />
            <span>Remove Access</span>
          </label>
        </div>

        {error && (
          <p className="text-sm text-red-600 font-medium">{error}</p>
        )}
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
