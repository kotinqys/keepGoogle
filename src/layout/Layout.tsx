import React, { useState, memo, useCallback } from 'react';
import { Box } from '@mui/material';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';

interface LayoutProps {
    children:React.ReactNode
}

const Layout:React.FC<LayoutProps> = ({children}) => {
  const [isOpen,setIsOpen] = useState(true);
  const [isDark ,setIsDark] = useState(false);

  //Open and close sidebar func
  const toggleSideBar = useCallback(() =>{
    setIsOpen(!isOpen);
  },[isOpen,setIsOpen]);

  const handleChangeThem = () =>{
    setIsDark(!isDark);
  };
   
  
  return (
    <>
      <Header toggleSideBar={toggleSideBar} changeThem={handleChangeThem} isDark={isDark}/>
      <Box sx={{display:'flex'}} >
        <Sidebar isOpen={isOpen}/>
        {children}
      </Box>
    </>
  );
};

export default memo(Layout);