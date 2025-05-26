import TextInputBox from '../components/TextInputBox';
import OIP from '../assets/OIP.jpg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';



function Login() {
    const boat = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function loginRequest() {
        fetch(`${localStorage.getItem("url")}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          email: email, 
          password: password 
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.result === 1) {
          alert(data.error);
        } else {
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('ses-mail', email);
          boat("/menu")
        }
      })
      .catch(error => {
        console.error("Login request failed:", error);
      });
    }
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        {/* Logo Section */}
        <div className="flex justify-center mb-4">
            <img src={OIP} className="logo w-24 h-24 object-cover rounded-full" alt="logo" />
        </div>

        {/* Title */}
        <h1 className="text-center text-2xl font-bold mb-4">Welcome!</h1>

        {/* Login Form */}
        <div className="space-y-4">

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

          <div className="flex justify-center mt-4">
            <button 
              onClick={loginRequest}
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600"
            >
              Login
            </button>
          </div>

        </div>

        {/* <div className="text-center mt-6 text-sm text-gray-600">
          <p>Need help? <a href="https://www.youtube.com/watch?v=E4WlUXrJgy4" className="text-blue-500">Contact Support</a></p>
        </div> */}

      </div>

    </div>
  );
}

export default Login;
