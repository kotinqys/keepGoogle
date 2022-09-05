import React,{ useState,useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Layout from '../../layout/Layout';
import InputNotes from '../../components/InputNotes/InputNotes';
import useNotes from '../../hooks/useNotes';
import NoteCard from '../../components/NoteCard/NoteCard';

const Notes:React.FC = () =>{
  //IsGrid style notes
  const {notes,isGrid} = useNotes();
  //Fixed notes(filtred by fixed value)
  const [newNotes,setNewNotes] = useState(notes.filter(note=>!note.fixed));
  //Other notes(filtred by fixed value)
  const [fixedNotes,setFixedNotes] = useState(notes.filter(note=>note.fixed));

  //Actual value
  useEffect(()=>{
    setFixedNotes(notes.filter(note=>note.fixed));
    setNewNotes(notes.filter(note=>!note.fixed));
  },[notes]);
  
  return (
    <Layout>
      <Box sx={{width:'100%',display:'flex',alignItems:'center',flexDirection:'column'}}>
        <InputNotes />
        {fixedNotes.length !== 0 && (
          <Box sx={isGrid?{}:{width:'100%'}}>
            <Typography variant="overline" sx={{fontSize:'11px',marginLeft:'20px'}}>Закрепленные</Typography>
            <Box sx={isGrid
              ?{display:'flex',width:'100%',flexDirection:'column',alignItems:'center'}
              :{display:'flex',flexWrap:'wrap',alignItems:'flex-start',width:'100%'}}>
              {fixedNotes.map((note)=>(
                <NoteCard data={note} key={note.id} fixed fullWidth={isGrid}/>
              ))}
            </Box>
          </Box>
        )}
        <Box sx={isGrid?{}:{width:'100%'}}>
          {(fixedNotes.length > 0) && ( newNotes.length !== 0 ) && <Typography variant="overline" sx={{fontSize:'11px',marginLeft:'20px'}}>Другие заметки</Typography>}
          <Box sx={isGrid
            ?{display:'flex',width:'100%',flexDirection:'column',alignItems:'center'}
            :{display:'flex',flexWrap:'wrap',alignItems:'flex-start',width:'100%'}}>
            {newNotes.map((note)=>(
              <NoteCard data={note} key={note.id} fullWidth={isGrid}/>
            ))}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Notes;