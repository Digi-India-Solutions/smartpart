import React, { useState } from 'react';
import './Login.css';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => { 
    e.preventDefault();
    if (email !== 'monnie@gmail.com' || password !== '123456') {
      toast.error('Invalid Email Address or password');
      return;
    } else {
      sessionStorage.setItem('login', true);
      window.location.href = '/dashboard';
    }
  };
  
  return (
    <div className="main-login">
      <div className="login-container"> 
        <h2 className="login-title">
          <span style={{ color: '#fff' }}> Admin</span><br/>
          <span style={{ color: '#000' }}>Smart Parts Exports</span>
        </h2>
        <p className="login-subtitle">Login for manage the dashboard</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
            />   
          </div>

          <div className="form-group">
            <label>Password</label>
            <input  type={showPassword ? 'text' : 'password'} className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required   placeholder="Enter password"/>
            <div className="show-password">
              <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} id="show-password-checkbox"/>
              <label htmlFor="show-password-checkbox">Show Password</label>
            </div>
          </div>
          <button type="submit" className="login-button"> Login </button>
        </form>
{/* 
        <a href="#" className="forgot-password">Forgot Password?</a> */}
        {/* <p style={{ marginTop: '10px', fontSize: '14px' }}>
          Don’t have an account? <a href="#" className="signup-link">Sign Up</a>
        </p> */}
      </div>
    </div>
  );
};

export default Login;



















// import React, { useState } from 'react';
// import './Login.css'; // Make sure to create and import a CSS file for styling
// import { toast } from 'react-toastify';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (email !== 'monnie@gmail.com' || password !== 'Ujjwal@123') {
//       toast.error('Invalid Email Address or password');
//     } else {
//       sessionStorage.setItem('login', true);
//       window.location.href = '/dashboard';
//     }
//   };


  
//   return (
//     <>
//       <div className="main-login">
//         <div className="login-container">
//           <h2 className="login-title">Admin Login</h2>
//           <form onSubmit={handleSubmit} className="login-form">
//             <div className="form-group">
//               <label>Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="form-control"
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Password</label>
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="form-control"
//                 required
//               />
//               <div className="show-password">
//                 <input
//                   type="checkbox"
//                   checked={showPassword}
//                   onChange={() => setShowPassword(!showPassword)}
//                   id="show-password-checkbox"
//                 />
//                 <label htmlFor="show-password-checkbox">Show Password</label>
//               </div>
//             </div>
//             <button type="submit" className="login-button">Login</button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;
