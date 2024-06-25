// // src/components/Auth/Login.tsx
// import React, { useState } from 'react';
// import { Auth, Storage, API } from '@aws-amplify/auth';

// const Login: React.FC = () => {
//     const [username, setUsername] = useState<string>('');
//     const [password, setPassword] = useState<string>('');

//     const buttonOnClick = async () => {
//         try {
//             await Auth.signIn(username, password);
//             console.log('User signed in');
//         } catch (error) {
//             console.log('Error signing in', error);
//         }
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
//             <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//             <button type="submit" onClick={signIn}>
//                 Sign In
//             </button>
//         </div>
//     );
// };

// export default Login;
export {};
