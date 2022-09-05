import React,{ memo } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import classes from './Sidebar.module.scss';
import cn from 'classnames';

interface SideBarItem {
    icon:React.ReactNode,
    text:string,
    active?:boolean,
    isOpen:boolean
}


const SidebarItem:React.FC<SideBarItem> = ({icon,text,active,isOpen}) => {

  return (
    <Box className={cn(classes.item, { [classes.active]: active },{[classes.open]:isOpen})}>
      <IconButton color="inherit">
        {icon}
      </IconButton>
      {<Typography sx={{fontWeight:'400',fontSize:'14px',marginLeft:'20px'}}>{text}</Typography>}
    </Box>
  );
};

export default memo(SidebarItem);