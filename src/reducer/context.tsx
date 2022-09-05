import React, { createContext, useReducer, useState } from 'react';
import { ActionTypes, initialState, reducer, State } from './reducer';
import { idNoteType, NoteType, SearchTextType } from './types';

//Extends type for context to use methods like addNodte
interface StateAndAction extends State {
  isGrid: boolean,
  addNote:({title,text}:{title:string,text:string})=>number,
  deleteNote:({id}:idNoteType)=>void,
  pullOutArchive:({id}:idNoteType)=>void,
  archiveNote:({id}:idNoteType)=>void,
  fixNote:({id}:idNoteType)=>void,
  changeIsGrid:()=>void,
  updateNote:(data:NoteType)=>void,
  addSearchText:({text}:SearchTextType)=>void,
}

//newInitialState with actions(addNote etc)
const newInitialState = {
  ...initialState,
  isGrid:true,
  addNote(){return 0;},
  deleteNote(){},
  fixNote(){},
  changeIsGrid(){},
  archiveNote(){},
  pullOutArchive(){},
  updateNote(){},
  addSearchText(){},
};

export const NotesContext = createContext<StateAndAction>(newInitialState);

interface Provider {
  children: React.ReactNode
}

const NotesProvider = ({children}:Provider) => {
  const [state, dispatch] = useReducer(reducer,initialState);
  const [isGrid,setIsGrid] = useState(true);

  //method add a new node
  const addNote = ({title,text}:{title:string,text:string}) => {
    const id = new Date().getTime();
    dispatch({
      type: ActionTypes.ADD,
      payload: {
        id,
        title,
        text,
      },
    });
    return id;
  };

  //method delete a note
  const deleteNote = ({id}:idNoteType) => {
    dispatch({
      type: ActionTypes.DELETE,
      payload: {
        id,
      },
    });
  };

  //method archive a note
  const archiveNote = ({id}:idNoteType) => {
    dispatch({
      type: ActionTypes.ADDTOARCHIVE,
      payload: {
        id,
      },
    });
  };

  //method pullout from archive a note
  const pullOutArchive = ({id}:idNoteType) => {
    dispatch({
      type: ActionTypes.PULLOUTFROMARCHIVE,
      payload: {
        id,
      },
    });
  };

  //method delete a note
  const fixNote = ({id}:idNoteType) => {
    dispatch({
      type: ActionTypes.FIX,
      payload: {
        id,
      },
    });
  };

  //method update a note
  const updateNote = (data:NoteType) => {
    dispatch({
      type: ActionTypes.UPDATENOTE,
      payload: data,
    });
  };

  //Add SearchText to context
  const addSearchText = ({text}:SearchTextType) =>{
    dispatch({
      type: ActionTypes.SEARCHTEXT,
      payload: {text},
    });
  };

  //Change styles grid or column in notes
  const changeIsGrid = () =>{
    setIsGrid(!isGrid);
  };

  const value = {
    notes: state.notes,
    archive: state.archive,
    searchText:state.searchText,
    addSearchText,
    addNote,
    deleteNote,
    pullOutArchive,
    archiveNote,
    fixNote,
    isGrid,
    changeIsGrid,
    updateNote,
  };

  return (<NotesContext.Provider value={value}>{children}</NotesContext.Provider>);
};

export default NotesProvider;
