import React,{ memo } from 'react'; 
import SearchBox from '../SearchBox/SearchBox';
import logo from '../../assets/logo.png';
import { AppBar, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ReplayIcon from '@mui/icons-material/Replay';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import SplitscreenOutlinedIcon from '@mui/icons-material/SplitscreenOutlined';
import useNotes from '../../hooks/useNotes';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    toggleSideBar: ()=>void,
}

const Header:React.FC<HeaderProps> = ({toggleSideBar}) => {

  const navigate = useNavigate();
  const {changeIsGrid,isGrid} = useNotes();

  const handleNavigate = () =>{
    navigate('/');
  };

  return (
    <Box sx={{minHeight:'64px'}}>
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
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default memo(Header);