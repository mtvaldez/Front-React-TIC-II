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
  const [cid, setCid] = useState('');
  const [level, setLevel] = useState('');
  const [error, setError] = useState('');
  const [congrat, setCongrat] = useState('');

  const handleAccessChange = () => {
    setCongrat('');
    setError('');
    if (!cid || !level) {
      setError('All fields are required.');
      return;
    }

    fetch(`${localStorage.getItem("url")}/change-level`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cid: cid,
        level: level
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.result == 1) {
          alert(data.error);
        } else if (data.result == 0) {
          setCongrat('Access level changed successfully');
        }
      })
      .catch(error => {
        console.error("Failed to change access level:", error);
      });    
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10 shadow-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-gray-800">
          Change User Access
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {/* cid input */}
        <TextInputBox
          inputType="text"
          id="cid"
          myPlaceholder="ID doc"
          myValue={cid}
          onChange={(e) => setCid(e.target.value)}
        />

        {/* level input */}
        <TextInputBox
          inputType="text"
          id="level"
          myPlaceholder="New Access Level"
          myValue={level}
          onChange={(e) => setLevel(e.target.value)}
        />
        {congrat && (
          <p className="text-sm text-green-600 font-medium">{congrat}</p>
        )}
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
