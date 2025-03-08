import {useEffect, useState} from 'react';
import axios from '../axios/axios';
import {BreedModal} from '../Modal/breedModal';

export const Main = () => {
    const [breeds, setBreeds] = useState<string[]>([])
    const [selectedBreeds, setSelectedBreeds] = useState<string[]>([])
    const [showModal, setShowModal] = useState(true)

    useEffect(() => {
        axios.get('/dogs/breeds').then(res => {setBreeds(res.data)})
    }, [])

    const handleShowModal = () => {
        setShowModal(!showModal)
    }

    const handleSelectBreeds = (breed: string[]) => {
        setSelectedBreeds(breed)
    }

    return(
        <>
          <h1>Main</h1>
          <div>
            <h2>Selected Breeds</h2>
            <ul>
                {selectedBreeds.map((breed, index) => (
                    <li key={index}>{breed}</li>
                ))}
            </ul>
            <div>
                <button onClick={handleShowModal}>Show</button>
            </div>
            {showModal && <BreedModal show={handleShowModal} breed={breeds} onSelectBreeds={handleSelectBreeds} selectedBreeds={selectedBreeds}  />}
          </div>
        </>
    )

}