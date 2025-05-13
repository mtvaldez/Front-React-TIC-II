import { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TextInputBox from '../TextInputBox'; 

export function MyCardPic() {
  const [cid, setCid] = useState('');
  const [picture, setPicture] = useState(null);
  const [error, setError] = useState('');
  const [congrat, setCongrat] = useState('');


  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPicture(file);
    }
  };

  const handleLinkPicture = () => {
    setError('');
    setCongrat('');
  
    if (!cid) {
      setError('ID is required.');
      return;
    }
  
    if (!picture) {
      setError('Picture is required.');
      return;
    }
  
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
  
      fetch(`${localStorage.getItem("url")}/link-pic`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cid: cid,
          pic: base64String
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.result == 1) {
            alert(data.error);
          } else if (data.result == 0) {
            console.log(data.picst);
            setCongrat('Picture linked successfully');
          }
        })
        .catch(error => {
          console.error("Failed to link picture:", error);
        });
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
        <TextInputBox
          inputType="cid"
          id="cid"
          myPlaceholder="ID doc"
          myValue={cid}
          onChange={(e) => setCid(e.target.value)}
        />

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
        {congrat && (
          <p className="text-sm text-green-600 font-medium">{congrat}</p>
        )}
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
