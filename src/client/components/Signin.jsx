import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Axios from 'axios';
import '../stylesheets/signup.css';
import userIcon from '../images/user.png';
import passwordIcon from '../images/password.png';
import logo from '../images/logo.png';


const Signin = ({closeModal}) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currUser, setCurrUser] = useState({
    id:'',
    username:''
  })



  useEffect(() => {
    // console.log('user state', currUser);
    if (currUser.username != '') navigate("/main", { state: currUser });
  }, [currUser]);

  const signinAction = async () => {
    if (username === '' || password === '') alert('Please complete every field')

    try {
      const response = await Axios.post('api/user/login', {
        username,
        password
      });
      if (response.data === 'incorrect password or username') {
        setLoginStatus('Incorrect username password combination');
      } else {
        setLoginStatus('');
        navigate('/main');
      }
      await setCurrUser({
        id: response.data.id, 
        username: response.data.username
      });
    } catch (err) { console.log(err) };
  };

  return (
      <div className="modalBackground">
          <div id='login-container' className="login-container">
              <div className="closeModal">
                  <img src={logo} alt="chuckler" className='logo' style={{width:'150px'}} />
                  <button 
                      className='closeModal-btn' 
                      onClick={() => closeModal(false)}> X </button>
              </div>
              <div className="logo-title">
                  <div className="title">Welcome Back</div>
              </div>
              
              <div className="inputs">
                  <div className="input">
                      <img src={userIcon} alt="" style={{width:'30px'}}/>
                      <input type="text" placeholder="Name" 
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                      />
                  </div>
                  <div className="input">
                      <img src={passwordIcon} alt="password-icon"  style={{width:'30px'}}/>
                      <input type="password" placeholder="Password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                  </div>
              </div>
              <div  className="signup-btn">
                  <button onClick={signinAction}>Sign in</button>
              </div>
          </div>
      </div>
  )
}

export default Signin;