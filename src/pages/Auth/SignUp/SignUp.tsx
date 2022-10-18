import React, { useState } from 'react';
import classes from '../Auth.module.css';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import call from '../../../assets/call.png';
import saly from '../../../assets/Saly-10.png';
import { IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
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
            <IconButton sx={{padding:0, marginBottom:'5px'}} onClick={()=>navigate(-1)} >
              <ArrowBackIcon fontSize="large" sx={{margin:0}}/>
            </IconButton>
            <h1>Sign Up</h1>
            <p>If you already have an account register<br/>
                You can <span> <Link to="/auth/sign-in"> Login here !</Link></span> </p>
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
              <p>Full name</p>
              <div className={classes.input}>
                <AccountCircleOutlinedIcon />
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
            <div className={classes.signIn__input}>
              <p>Confirm Password</p>
              <div className={classes.input}>
                <LockOutlinedIcon />
                <input type="password" placeholder="Confirm your Password" />
                <RemoveRedEyeOutlinedIcon />
              </div>
            </div>
          </div>
          <div className={classes.signIn__button} onClick={handleOpenModal} style={{marginTop:'20px'}}>
              Register
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
          <h1>Congratulations on your successful registration!!!&#129395;&#129395;</h1>
          <span className={classes.succsModal__close} onClick={handleCloseModal}>X</span>
        </div>
      </div>
    </>
  );
};

export default SignUp;