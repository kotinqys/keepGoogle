import React,{ memo, useState } from 'react'; 
import SearchBox from '../SearchBox/SearchBox';
import logo from '../../assets/logo.png';
import { AppBar, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ReplayIcon from '@mui/icons-material/Replay';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import SplitscreenOutlinedIcon from '@mui/icons-material/SplitscreenOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import useNotes from '../../hooks/useNotes';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    toggleSideBar: ()=>void,
    changeThem: () =>void,
    isDark: boolean
}

const Header:React.FC<HeaderProps> = ({isDark,toggleSideBar,changeThem}) => {
  const navigate = useNavigate();
  const {changeIsGrid,isGrid} = useNotes();

  const handleNavigate = () =>{
    navigate('/');
  };

  const handleChangeThem =() =>{
    changeThem();
  };


  return (
    <Box sx={{minHeight:'64px'}} className={isDark?'dark':''}>
      <AppBar sx={{boxShadow:'none',borderBottom:'1px solid #dadce0'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleSideBar}
          >
            <MenuIcon />
          </IconButton>
          <img src={logo} alt="KeepGoogle" onClick={handleNavigate}/>
          <Typography sx={{fontSize:'20px',color:'#5f6368',marginRight:'40px',cursor:'pointer'}} onClick={handleNavigate}>
            Keep
          </Typography>
          <SearchBox />
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            {isDark
              ?<Tooltip title="Cветлая тема" onClick={handleChangeThem}>
                <IconButton >
                  <WbSunnyOutlinedIcon />
                </IconButton>
              </Tooltip>
              :<Tooltip title="Темная тема" onClick={handleChangeThem}>
                <IconButton>
                  <DarkModeOutlinedIcon />
                </IconButton>
              </Tooltip>
            }
            <Tooltip title="Обновить">
              <IconButton onClick={()=>window.location.reload()}>
                <ReplayIcon />
              </IconButton>
            </Tooltip>
            {isGrid? <Tooltip title="Сетка" onClick={changeIsGrid}>
              <IconButton>
                <GridViewOutlinedIcon/>
              </IconButton>
            </Tooltip>:<Tooltip title="Cписок" onClick={changeIsGrid}>
              <IconButton>
                <SplitscreenOutlinedIcon/>
              </IconButton>
            </Tooltip>}
            <Tooltip title="Войти" onClick={()=>navigate('/auth/sign-in')}>
              <IconButton>
                <AccountCircleOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default memo(Header);