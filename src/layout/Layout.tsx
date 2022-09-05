import React, { useState, memo, useCallback } from 'react';
import { Box } from '@mui/material';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';

interface LayoutProps {
    children:React.ReactNode
}

const Layout:React.FC<LayoutProps> = ({children}) => {
  const [isOpen,setIsOpen] = useState(true);

  //Open and close sidebar func
  const toggleSideBar = useCallback(() =>{
    setIsOpen(!isOpen);
  },[isOpen,setIsOpen]);
  
  return (
    <>
      <Header toggleSideBar={toggleSideBar}/>
      <Box sx={{display:'flex'}}>
        <Sidebar isOpen={isOpen}/>
        {children}
      </Box>
    </>
  );
};

export default memo(Layout);