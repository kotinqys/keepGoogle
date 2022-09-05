import React, { useState, useRef, memo } from 'react';
import { Box, Input, Tooltip, Typography } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import classes from './InputNotes.module.scss';
import useNotes from '../../hooks/useNotes';

interface FullInputsNoteProps {
    handleFullInputNotes:()=>void,
}

const FullInputsNote:React.FC<FullInputsNoteProps> = ({handleFullInputNotes}) => {

  const nid = useRef<number>(0);
  const {addNote,fixNote,archiveNote} = useNotes();
  const [title,setTitle] = useState<string>('');
  const [text,setText] = useState<string>('');

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setTitle(e.target.value);
  };

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setText(e.target.value);
  };

  //Close and save notes 
  const handleCloseAndSave = () => {
    handleFullInputNotes();
    if(title !== '' || text !== ''){
      nid.current = addNote({title,text});
      setTitle('');
      setText('');
    }
  };

  //Delete note
  const handleDeleteNote = () =>{
    handleFullInputNotes();
    setTitle('');
    setText('');
  };

  //Fixed note
  const handleFixedNote = () =>{
    handleCloseAndSave();
    const id = nid.current;
    fixNote({id});
  };

  //Archive note
  const handleArchiveNote = () =>{
    handleCloseAndSave();
    const id = nid.current;
    archiveNote({id});
  };

  return (
    <>
      <Box className={classes.fullInput}>
        <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <Input 
            multiline
            placeholder="Введите заголовк" 
            disableUnderline 
            sx={{fontSize:'16px',width:'100%'}} 
            value={title} 
            onChange={onChangeTitle} />
          <PushPinOutlinedIcon onClick={handleFixedNote}/>
        </Box>
        <Box>
          <Input
            multiline
            placeholder="Заметка..." 
            disableUnderline 
            sx={{fontSize:'14px',width:'100%'}} 
            value={text} 
            onChange={onChangeText} />
        </Box>
        <Box sx={{display:'flex',alignItems:'center',color:'gray',position:'relative'}}>
          <Tooltip title="Сохранить напоминание">
            <AddAlertOutlinedIcon sx={{fontSize:'18px'}} />
          </Tooltip>
          <Tooltip title="Добавть в архив" onClick={handleArchiveNote}>
            <ArchiveOutlinedIcon sx={{fontSize:'18px'}}/>
          </Tooltip>
          <Tooltip title="Добавть картинку">
            <ImageOutlinedIcon sx={{fontSize:'18px'}} />
          </Tooltip>
          <Tooltip title="Удалить" onClick={handleDeleteNote}>
            <DeleteForeverOutlinedIcon sx={{fontSize:'18px'}}/>
          </Tooltip>
          <Typography sx={{position:'absolute', right:'20px', fontSize:'14px',cursor:'pointer'}} onClick={handleCloseAndSave}>Закрыть</Typography>
        </Box>  
      </Box>
    </>
  );
};

export default memo(FullInputsNote);