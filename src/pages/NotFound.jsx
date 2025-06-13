import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigator = useNavigate();

  const gotoLogin = () => {
    navigator('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
        <p className="text-lg text-gray-700">Oops! The page you're looking for doesn't exist.</p>
        <button onClick={gotoLogin} className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 transition">
          Go Back to Login!
        </button>
      </div>
    </div>
  );
}

export default NotFound;
