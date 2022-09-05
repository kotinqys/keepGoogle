import React from 'react';
import NoteCard from '../../components/NoteCard/NoteCard';
import useNotes from '../../hooks/useNotes';
import Layout from '../../layout/Layout';
import { Box } from '@mui/material';

const Archive:React.FC = () => {
  const {archive,isGrid} = useNotes();

  return (
    <Layout>
      <Box sx={{width:'100%',display:'flex',alignItems:'center',flexDirection:'column'}}>
        <Box sx={isGrid?{}:{width:'100%'}}>
          <Box sx={isGrid
            ?{display:'flex',width:'100%',flexDirection:'column',alignItems:'center'}
            :{display:'flex',flexWrap:'wrap',alignItems:'flex-start',width:'100%'}}>
            {archive.map((note)=>(
              <NoteCard data={note} key={note.id} fullWidth={isGrid} isArchive />
            ))}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Archive;