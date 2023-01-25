import {useEffect, useState} from 'react';

export const useLocalStorage = <T,>(key: string, initialValue: T | (()=> T)) => {

    //check if value exists yet
    const [value, setValue] = useState<T>(()=> {
        const jsonValue = localStorage.getItem(key);
        if (jsonValue == null){
            if (typeof initialValue === "function"){
                return (initialValue as () => T)();
            }
        }else{
            return JSON.parse(jsonValue);
        }
    })

    useEffect(()=> {
        //updates the array of key type whenver value or key changes
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key])

    return [value, setValue] as [T, typeof setValue]
}