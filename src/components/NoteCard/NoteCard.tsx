import React,{ useState,memo, useCallback } from 'react';
import classes from './NoteCard.module.scss';
import { NoteType } from '../../reducer/types';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';
import { Box, Tooltip, Typography } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import useNotes from '../../hooks/useNotes';
import cn from 'classnames';
import NoteCardModal from '../NoteCardModal/NoteCardModal';


interface NoteCardProps {
    data:NoteType,
    //PushPin icon filled or not
    fixed?:boolean,
    //FullWidth
    fullWidth?:boolean,
    //in archive or not
    isArchive?:boolean
}

const NoteCard: React.FC<NoteCardProps> = ({data,fixed,fullWidth,isArchive}) => {
  const {deleteNote,fixNote,archiveNote,pullOutArchive} = useNotes();

  //State to Modal window
  const [isOpenModal, setIsOpenModal] = useState(false);

  const id = data.id;

  //Delete note method from context
  const handleDeleteNote = () =>{
    deleteNote({id});
  };

  //Fixed note method from context
  const handleFixedNote = () =>{
    fixNote({id});
  };

  //Archive note method from context
  const handleArchiveNote = () =>{
    archiveNote({id});
  };

  //NOT Archive note method from context
  const handlePullOutFromArchiveNote = () =>{
    pullOutArchive({id});
  };

  //Open modal window to show and edit
  const handleOpenModal = useCallback(() =>{
    setIsOpenModal(true);
  },[setIsOpenModal]);
  
  //Close note
  const handleCloseModal = useCallback(() =>{
    setIsOpenModal(false);
  },[setIsOpenModal]);

  return (
    <>
      <Box className={cn(classes.noteCard,{[classes.fullWidth]:fullWidth})} onClick={handleOpenModal}>
        <Box>
          <Box className={classes.text}>
            {data.img && (
              <img src={data.img} alt="" />
            )}
            {data.title && (
              <Typography>{data.title}</Typography>
            )}
            {data.text && (
              <Typography>{data.text}</Typography>
            )}
          </Box>
          {fixed 
            ? <PushPinIcon sx={{position:'absolute',right:'0',top:'15px'}} onClick={handleFixedNote} /> 
            : <PushPinOutlinedIcon sx={{position:'absolute',right:'0',top:'15px'}} onClick={handleFixedNote}/>
          }
        </Box>
        <Box sx={{display:'flex',alignItems:'center',color:'gray',justifyContent:'flex-start',marginLeft:'-14px'}}>
          <Tooltip title="Сохранить напоминание">
            <AddAlertOutlinedIcon sx={{fontSize:'18px'}} />
          </Tooltip>
          {isArchive 
            ? <Tooltip title="Вернуть из архива" onClick={handlePullOutFromArchiveNote}>
              <UnarchiveOutlinedIcon sx={{fontSize:'18px'}}/>
            </Tooltip>
            : <Tooltip title="Добавть в архив" onClick={handleArchiveNote}>
              <ArchiveOutlinedIcon sx={{fontSize:'18px'}}/>
            </Tooltip>
          }
          <Tooltip title="Добавть картинку">
            <ImageOutlinedIcon sx={{fontSize:'18px'}} />
          </Tooltip>
          <Tooltip title="Удалить">
            <DeleteForeverOutlinedIcon sx={{fontSize:'18px'}} onClick={handleDeleteNote}/>
          </Tooltip>
        </Box>  
      </Box>
      <NoteCardModal isOpenModal={isOpenModal} 
        handleCloseModal={handleCloseModal} 
        data={data} 
        handleDeleteNote={handleDeleteNote} 
        handleArchiveNote={handleArchiveNote}
        handleFixedNote={handleFixedNote}
      />
    </>
  );
};

export default memo(NoteCard);