import React,{ useState, useEffect } from 'react';
import NoteCard from '../../components/NoteCard/NoteCard';
import useNotes from '../../hooks/useNotes';
import Layout from '../../layout/Layout';
import { Box } from '@mui/material';
import { NoteType } from '../../reducer/types';

const Search:React.FC = () => {
  const {notes,isGrid,searchText} = useNotes();
  const [searchNotes,setSearchNotes] = useState<NoteType[]>(notes.filter(note=>note.title.includes(searchText) || note.text.includes(searchText)));

  useEffect(()=>{
    setSearchNotes(notes.filter(note=>note.title.includes(searchText) || note.text.includes(searchText)));
  },[searchText,notes]);
  
  return (
    <Layout>
      <Box sx={{width:'100%',display:'flex',alignItems:'center',flexDirection:'column'}}>
        <Box sx={isGrid?{}:{width:'100%'}}>
          <Box sx={isGrid
            ?{display:'flex',width:'100%',flexDirection:'column',alignItems:'center'}
            :{display:'flex',flexWrap:'wrap',alignItems:'flex-start',width:'100%'}}>
            {searchNotes.length !==0 && searchNotes.map((note)=>(
              <NoteCard data={note} key={note.id} fullWidth={isGrid} isArchive />
            ))}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Search;