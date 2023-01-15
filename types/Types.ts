export type Note = {
    id: string
} & NoteData

export type RawNoteData = {
    title: string;
    tagIds: string [];
    content: string [];
}

export type NoteData = {
    title: string;
    tag: Tag [];
    content: string;
}

export type Tag = {
    id: string;
    name: string;
}

export type RawNote= {
    id: string;
}