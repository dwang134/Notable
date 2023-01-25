//note object displayed on main page
export type Note = {
    id: string
} & NoteData

//obj type for form note data
export type NoteData = {
    title: string;
    content: string;
    tags: Tag [];
}

export type RawNoteData = {
    title: string;
    content: string;
    //stores the ids of the tags (categories) instead of the actual name
    //and then conerted to actual tags for when storing as NoteData
    tagIds: string[];
}

export type RawNote= {
    id: string;
} & RawNoteData

//obj type for tag category with id attached to corresponding note obj
export type Tag = {
    id: string;
    name: string;
}
