import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import TextInputBox from "../ui/TextInputBox";

export function DeleteAccountCard({ onDelete }) {

    const [deleteConfirm, setDelete] = useState('')

    const handleDelete = () => {
        if(deleteConfirm === 'delete')
            onDelete();
    }

    return (
        <Card className="w-full max-w-md mx-auto shadow-lg border border-gray-200">
            <CardHeader>
                <CardTitle className="text-center text-2xl font-bold text-gray-800">
                    Delete Account
                </CardTitle>
            </CardHeader>

            <CardContent className="text-center text-gray-700">
                <p className="mb-4">
                    This action is <span className="font-semibold text-red-600">irreversible</span>.
                </p>
                <p className="mb-6">
                    Type <span className="font-semibold">'delete'</span> to confirm account deletion
                </p>
                 <TextInputBox
                    inputType="text"
                    id="confirmDelete"
                    myPlaceholder="delete"
                    value={deleteConfirm}
                    onChange={(e) => setDelete(e.target.value)}
                    
                />
            </CardContent>

            <CardFooter className="justify-center">
                <button onClick={handleDelete} className="w-full py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition" >
                    Delete My Account
                </button>
            </CardFooter>
        </Card>
    );
}
