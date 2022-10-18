import React, { useState } from 'react';
import classes from '../Auth.module.css';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import facebook from '../../../assets/Facebook.png';
import apple from '../../../assets/apple.png';
import google from '../../../assets/google.png';
import call from '../../../assets/call.png';
import saly from '../../../assets/Saly-10.png';
import { IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [isView, setIsView] = useState(false);
  const navigate = useNavigate();


  const handleOpenModal = () =>{
    setIsView(true);
  };

  const handleCloseModal = () =>{
    setIsView(false);
  };

  return (
    <>
      <div className={isView?`${classes.wrapper} ${classes.opacity}`:classes.wrapper}>
        <div className={classes.signIn}>
          <div className={classes.signIn__title}>
            <IconButton sx={{padding:0, marginBottom:'5px'}} onClick={()=>navigate('/')} >
              <ArrowBackIcon fontSize="large" sx={{margin:0}}/>
            </IconButton>
            <h1>Sign In</h1>
            <p>If you don't have an account register<br/>
                You can <span> <Link to="/auth/sign-up"> Register here !</Link></span> </p>
          </div>
          <div className={classes.signIn__inputs}>
            <div className={classes.signIn__input}>
              <p>Email</p>
              <div className={classes.input}>
                <EmailOutlinedIcon />
                <input type="text" placeholder="Enter your email address" />
              </div>
            </div>
            <div className={classes.signIn__input}>
              <p>Password</p>
              <div className={classes.input}>
                <LockOutlinedIcon />
                <input type="password" placeholder="Enter your Password" />
                <RemoveRedEyeOutlinedIcon />
              </div>
            </div>
            <div className={classes.signIn__other}>
              <div>
                <input type="checkbox" id="remember" /><label>Remember me</label>
              </div>
              <p>Forgot Password ?</p>
            </div>
          </div>
          <div className={classes.signIn__button} onClick={handleOpenModal}>
              Login
          </div>
          <p className={classes.countinue}>or continue with</p>
          <div className={classes.signIn__socials}>
            <img src={facebook} alt="" />
            <img src={apple} alt="" />
            <img src={google} alt="" />
          </div>
        </div>
        <div className={classes.design}>
          <div className={classes.call}>
            <img src={call} alt="" />
            <p>+ 702 777 3173</p>
          </div>
          <img src={saly} alt="" />
          <div className={classes.design__text}>
            <h1>Sign in KeepGoole</h1>
            <h3>In Keep Google you can make some nodes and make it!</h3>
          </div>
        </div>
      </div>
      <div className={isView?`${classes.succsModal} ${classes.show}`:classes.succsModal}>
        <div className={classes.succsModal__content}>
          <h1>You have successfully logged in!!!&#129395;&#129395;&#129395;</h1>
          <span className={classes.succsModal__close} onClick={handleCloseModal}>X</span>
        </div>
      </div>
    </>
  );
};

export default SignIn;