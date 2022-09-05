export type addNoteType = {
  id:number,
  title:string,
  text:string
}

export type SearchTextType = {
  text:string,
}


export type idNoteType = {
  id:number,
}

export type NoteType = {
  id:number,
  title: string,
  text: string,
  img?:string,
  timer?:string,
  fixed: boolean
}
