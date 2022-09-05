import React,{ useState, memo } from 'react';
import Modal from '@mui/material/Modal';
import classes from './NoteCardModal.module.scss';
import { Box, Input, Tooltip, Typography } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { NoteType } from '../../reducer/types';
import useNotes from '../../hooks/useNotes';

interface NoteCardModalProps {
    isOpenModal:boolean,
    data:NoteType,
    handleCloseModal:() =>void,
    handleDeleteNote:() =>void,
    handleArchiveNote:() =>void,
    handleFixedNote:() =>void,
}

const NoteCardModal:React.FC<NoteCardModalProps> = ({isOpenModal,handleCloseModal,handleDeleteNote,handleArchiveNote,handleFixedNote,data}) => {

  const {updateNote,deleteNote} = useNotes();

  const [title,setTitle] = useState<string>(data?.title);
  const [text,setText] = useState<string>(data?.text);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setTitle(e.target.value);
  };

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setText(e.target.value);
  };

  //Close and update note
  const handleCloseAndSave = () => {
    handleCloseModal();
    if(title === '' && text === ''){
      const id = data.id;
      deleteNote({id});
    }else{
      updateNote({...data,title,text});
    }
  };

  return (
    <Modal 
      open={isOpenModal}
      onClose={handleCloseAndSave}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classes.modal}>
        <Box className={classes.fullInput}>
          <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <Input 
              multiline
              placeholder="Введите заголовк" 
              disableUnderline sx={{fontSize:'16px',width:'100%'}} 
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
      </Box>
    </Modal>
  );
};

export default memo(NoteCardModal);