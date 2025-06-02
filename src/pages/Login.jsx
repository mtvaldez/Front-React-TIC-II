import TextInputBox from '../components/ui/TextInputBox';
import OIP from '../assets/OIP.jpg';
import { useState } from 'react';
import { login } from '@/services/AdminService';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    setError('')

    if (!email || !password) {
      setError('Both fields must be completed');
      return;
    }

    try {
      await login(email, password);
      navigate("/menu")
    } catch (error) {
      setError('Wrong Email or Password')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <div className="flex justify-center mb-4">
          <img src={OIP} className="logo w-24 h-24 object-cover rounded-full" alt="logo" />
        </div>

        <h1 className="text-center text-2xl font-bold mb-4">Welcome!</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="space-y-4"
        >
          <TextInputBox
            label="Email"
            myPlaceholder=" jhon@email.com"
            myID="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextInputBox
            label="Password"
            myPlaceholder=" ******"
            inputType="password"
            myID="pswd"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (<p className="text-red-500 text-sm text-center">{error}</p>)}

          <div className="flex justify-center mt-4">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 transition">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );

}

export default Login;