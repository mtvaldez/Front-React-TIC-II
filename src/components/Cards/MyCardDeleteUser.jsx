import { Card, CardFooter, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { deleteUser } from "@/services/UserService";

export function MyCardDeleteUser({ userId, closePopover }) {

  const handleUserDelete = () => {
    deleteUser(userId);
  };


  return (
    <Card className="w-full max-w-md mx-auto mt-10 shadow-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-gray-800">
          Delete this user?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          This Action cannot be undone.
        </p>
      </CardContent>

      <CardFooter className="flex gap-4 px-4">
        <button onClick={handleUserDelete}
          className="w-full px-6 py-3 bg-red-600 text-white text-lg font-semibold rounded hover:bg-red-800 transition">
          Delete
        </button>
        <button onClick={closePopover}
          className="w-full px-6 py-3 bg-gray-200 text-black text-lg font-semibold rounded hover:bg-gray-300 transition">
          Cancel
        </button>
      </CardFooter>
    </Card>
  );
}
