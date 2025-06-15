import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { setUserFace } from '@/services/UserService';
import { errorToast, showImageToast } from '../ui/customToasts';
import { refetchUsers } from '@/query/queryHelpers';

export function MyCardPic({ userId, closePopover }) {
  const [picture, setPicture] = useState(null);
  const [error, setError] = useState('');

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPicture(file);
    }
  };

  const handleLinkPicture = () => {
    setError('');

    if (!picture) {
      setError('Picture is required.');
      return;
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
      try {
        const base64String = reader.result;

        closePopover();
        const base64Trimmed = await setUserFace(userId, base64String.substring(23));
        showImageToast(base64Trimmed, "Face linked successfully!");

        refetchUsers();
      } catch (error) {
        // errorToast("Something went wrong");
        errorToast(error.message);
      }
    };

    reader.readAsDataURL(picture);
  };


  return (
    <Card className="w-full max-w-md mx-auto mt-10 shadow-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-gray-800">
          Link Picture to User
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <p className="text-gray-600">
          Upload a picture for a user to have facial recognition
        </p>

        {/* File Input for Picture */}
        <div className="flex flex-col gap-1">
          <label htmlFor="picture" className="text-sm font-medium text-gray-700">
            Upload Picture
          </label>
          <input
            type="file"
            id="picture"
            accept="image/*"
            onChange={handlePictureChange}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {picture && (
            <p className="text-xs text-gray-500">Selected: {picture.name}</p>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-600 font-medium text-center">{error}</p>
        )}
      </CardContent>

      <CardFooter className="justify-center">
        <button
          onClick={handleLinkPicture}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Link Picture
        </button>
      </CardFooter>
    </Card>
  );
}
