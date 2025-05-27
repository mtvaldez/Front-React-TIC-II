import { Card, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { deleteUser } from "@/services/UserService";

export function MyCardDeleteUser({ userId, closePopover }) {

  const handleUserDelete = () => {
    deleteUser(userId);
  };
  

  return (
    <Card className="w-full max-w-md mx-auto mt-10 shadow-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-gray-800">
          Are you sure you want to delete this user?
        </CardTitle>
      </CardHeader>

      <CardFooter className="justify-center">
        <button
          onClick={handleUserDelete}
          className="w-full py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-800 transition"
        >
          Delete
        </button>
        <button
          onClick={closePopover}
          className="w-full py-2 bg-gray-200 text-black font-semibold rounded hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </CardFooter>
    </Card>
  );
}
