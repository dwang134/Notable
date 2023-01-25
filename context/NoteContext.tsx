import React, {createContext, useContext, useMemo, useState} from 'react';
import {NoteData, RawNote, Tag} from '../types/Types';
import {useLocalStorage} from '../utils/useLocalStorage';
import {v4 as uuidv4} from 'uuid';

const NoteContext = createContext<NoteContextObject>({
    notes: [],
    setNotes: () => {},
    tags: [],
    setTags: () => {},
    notesWithTags: {},
    onCreateNote: ()=> {}
})

// const [count, setCount] = useState(0);
// const [notes, setNotes] = useLocalStorage<RawNote []>('NOTES', []);
// const [tags, setTags] = useLocalStorage<Tag []>('TAGS', []);

type NoteContextObject = {
    notes: RawNote [];
    setNotes: (value: React.SetStateAction<RawNote[]>) => void
    tags: Tag[];
    setTags: (value: React.SetStateAction<Tag[]>) => void
    notesWithTags: {};
    onCreateNote: ({tags, ...data}: NoteData) => void;
}

export const useNoteContext = () => {
    return useContext(NoteContext);
}

type Props = {
    children: React.ReactNode;
}

export const NoteContextProvider:React.FC<Props> = ({children}) => {

    const [notes, setNotes] = useLocalStorage<RawNote []>('NOTES', []);
    const [tags, setTags] = useLocalStorage<Tag []>('TAGS', []);

    const notesWithTags = useMemo(()=> {
        return notes.map(note => {
          return {...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
        })
      }, [notes, tags])
    
    //store data when a new NoteData is initialized
    const onCreateNote = ({ tags, ...data }: NoteData)=> {
    setNotes(prevNotes => {
        return [
        ...prevNotes,
        {...data, id: uuidv4(), tagIds: tags.map(tag => tag.id) },
        ]
    })
    }

    const NoteContextValue:NoteContextObject = {
        notes,
        setNotes,
        tags,
        setTags,
        notesWithTags,
        onCreateNote
    }

    //Type '{ tags: Tag[]; id: string; title: string; content: string; tagIds: string[]; }[]' is not assignable to type '() => RawNote[]'.

    return ( 
        <NoteContext.Provider value={NoteContextValue}>
        {children}
        </NoteContext.Provider>
    )

}