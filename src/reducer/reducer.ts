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

export const initialState:State = {
  notes: [],
  archive:[],
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
    
    return {
      ...state,
      notes: [...state.notes, note],
    };
  case ActionTypes.DELETE:
    return {
      ...state,
      notes: state.notes.filter((el)=>el.id !== action.payload.id),
      archive: state.archive.filter((el)=>el.id !== action.payload.id),
    };
  case ActionTypes.FIX:
    const newNotes = state.notes.map(note=>{
      if(note.id === action.payload.id){
        return {...note,fixed:!note.fixed};
      }
      return note;
    });

    return { 
      ...state, 
      notes: newNotes, 
    };
  case ActionTypes.ADDTOARCHIVE:
    const index = state.notes.findIndex(note=>note.id === action.payload.id);
    return {
      ...state,
      archive: [...state.archive,{...state.notes[index]}],
      notes: state.notes.filter((el)=>el.id !== action.payload.id),
    };
  case ActionTypes.PULLOUTFROMARCHIVE:
    const id = state.archive.findIndex(note=>note.id === action.payload.id);
    return {
      ...state,
      notes: [...state.notes,{...state.archive[id]}],
      archive: state.archive.filter((el)=>el.id !== action.payload.id),
    };
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
