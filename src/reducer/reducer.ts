import {  addNoteType, idNoteType, NoteType, SearchTextType } from './types';

export enum ActionTypes {
  ADD = 'ADD',
  DELETE = 'DELETE',
  FIX = 'FIX',
  ADDTOARCHIVE = 'ADDTOARCHIVE',
  PULLOUTFROMARCHIVE = 'PULLOUTFROMARCHIVE',
  UPDATENOTE = 'UPDATENOTE',
  SEARCHTEXT = 'SEARCHTEXT',
};

export interface State {
  notes: NoteType[],
  archive: NoteType[],
  searchText: string,
};


export const initialState:any = {
  notes: JSON.parse(localStorage.getItem('notes') || '[]'),
  archive:JSON.parse(localStorage.getItem('archive') || '[]'),
  searchText: '',
};

export function reducer(state:State,action:NoteActionsType){
  switch (action.type) {
  case ActionTypes.ADD: 
    const note:NoteType = {
      id: action.payload.id,
      title:action.payload.title,
      text:action.payload.text,
      fixed:false,
    };
    
    const data = {
      ...state,
      notes: [...state.notes, note],
    };

    localStorage.setItem('notes',JSON.stringify(data.notes));

    return data;
  case ActionTypes.DELETE:
    const newState = {
      ...state,
      notes: state.notes.filter((el)=>el.id !== action.payload.id),
      archive: state.archive.filter((el)=>el.id !== action.payload.id),
    };

    localStorage.setItem('notes',JSON.stringify(newState.notes));

    return newState;
  case ActionTypes.FIX:
    const newNotes = state.notes.map(note=>{
      if(note.id === action.payload.id){
        return {...note,fixed:!note.fixed};
      }
      return note;
    });

    localStorage.setItem('notes',JSON.stringify(newNotes));

    return { 
      ...state, 
      notes: newNotes, 
    };
  case ActionTypes.ADDTOARCHIVE:
    const index = state.notes.findIndex(note=>note.id === action.payload.id);
    const archive =  {
      ...state,
      archive: [...state.archive,{...state.notes[index]}],
      notes: state.notes.filter((el)=>el.id !== action.payload.id),
    };

    localStorage.setItem('archive',JSON.stringify(archive.archive));
    localStorage.setItem('notes',JSON.stringify(archive.notes));

    return archive;
  case ActionTypes.PULLOUTFROMARCHIVE:
    const id = state.archive.findIndex(note=>note.id === action.payload.id);
    const res =  {
      ...state,
      notes: [...state.notes,{...state.archive[id]}],
      archive: state.archive.filter((el)=>el.id !== action.payload.id),
    };

    localStorage.setItem('archive',JSON.stringify(res.archive));
    localStorage.setItem('notes',JSON.stringify(res.notes));

    return res;
  case ActionTypes.UPDATENOTE:
    const newNotesWithUpdate = state.notes.map(note=>{
      if(note.id === action.payload.id){
        return {...note,
          title:action.payload.title,
          text:action.payload.text,
          fixed:action.payload.fixed,
        };
      }
      return note;
    });

    localStorage.setItem('notes',JSON.stringify(newNotesWithUpdate));
    
    return {
      ...state,
      notes: newNotesWithUpdate,
    };
  case ActionTypes.SEARCHTEXT:
    return {
      ...state,
      searchText: action.payload.text,
    };
  default:
    return state;
  }
}

//Actions types
interface AddNoteAction {
  type: ActionTypes.ADD;
  payload: addNoteType ;
}

interface DeleteNoteAction {
  type: ActionTypes.DELETE;
  payload: idNoteType ;
}

interface FixNoteAction {
  type: ActionTypes.FIX;
  payload: idNoteType ;
}


interface AddNoteToArchiveAction {
  type: ActionTypes.ADDTOARCHIVE;
  payload: idNoteType ;
}

interface PullOutFromArchiveAction {
  type: ActionTypes.PULLOUTFROMARCHIVE;
  payload: idNoteType;
}

interface UpdateNoteAction {
  type: ActionTypes.UPDATENOTE;
  payload: NoteType;
}

interface SearchTextAction {
  type: ActionTypes.SEARCHTEXT;
  payload: SearchTextType;
}

export type NoteActionsType = AddNoteAction 
                              | DeleteNoteAction 
                              | FixNoteAction 
                              | AddNoteToArchiveAction 
                              | PullOutFromArchiveAction 
                              | UpdateNoteAction 
                              | SearchTextAction
