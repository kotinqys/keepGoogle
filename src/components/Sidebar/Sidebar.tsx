import React,{ memo } from 'react';
import { Box } from '@mui/material';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import SidebarItem from './SidebarItem';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
    isOpen:boolean,
}

const Sidebar:React.FC<SidebarProps> = ({isOpen}) => {

  const {pathname} = useLocation();
    
  //isOpen - is the sidebar open or not
  return (
    <Box sx={{maxWidth:'280px',marginTop:'8px',marginRight:'25px'}}>
      <Link to="/">
        <SidebarItem 
          icon={<LightbulbOutlinedIcon />} 
          text="Заметки" 
          active={pathname === '/'? true : false } 
          isOpen={isOpen}/>
      </Link>
      <Link to="/archive">
        <SidebarItem 
          icon={<ArchiveOutlinedIcon />} 
          text="Архив" 
          active={pathname === '/archive'? true : false } 
          isOpen={isOpen}/>
      </Link>
    </Box>
  );
};

export default memo(Sidebar);