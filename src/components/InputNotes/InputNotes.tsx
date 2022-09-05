import React, { useState,memo, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import classes from './InputNotes.module.scss';
import FullInputsNote from './FullInputsNote';


const InputNotes:React.FC = () => {
  //State for open full Inputs
  const [isOpenFullInputNotes,setIsOpenFullInputNotes] = useState(false);

  //Close full note inputs
  const handleFullInputNotes = useCallback(() => {
    setIsOpenFullInputNotes(false);
  },[setIsOpenFullInputNotes]);

  //Opean full note inputs
  const handleOpenFullInputNotes = useCallback(() =>{
    setIsOpenFullInputNotes(true);
  },[setIsOpenFullInputNotes]);

  return (
    <>
      {isOpenFullInputNotes
        ?(
          <FullInputsNote handleFullInputNotes={handleFullInputNotes}/>
        )
        :(
          <Box className={classes.input} onClick={handleOpenFullInputNotes}>
            <Typography color={'gray'}>Заметки...</Typography>
            <Box>
            </Box>
          </Box>
        )
      }
    </>
  );
};

export default memo(InputNotes);