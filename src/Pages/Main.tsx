import {useEffect, useState} from 'react';
import axios from '../axios/axios';

export const Main = () => {


    useEffect(() => {
        axios.get('/dogs/breeds').then(res => {console.log(res)})

    }, [])

    return(
        <>
            <h1>Main Content</h1>
        </>
    )

}