import { useContext } from 'react';
import { NotesContext } from '../reducer/context';

const useNotes = () => {
  //get data from context
  const context = useContext(NotesContext);
  
  return context;
};
  
export default useNotes;