import {useState} from 'react';
import Select from 'react-select';

interface IProps {
    breed: string[];
    selectedBreeds: string[];
    show: () => void;
    onSelectBreeds: (breed: string[]) => void;
}

export const BreedModal = (props: IProps) => {
    const {breed, show, onSelectBreeds, selectedBreeds} = props
    const [selectedBreed, setSelectedBreed] = useState<string[]>(selectedBreeds || [])
    

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSelectBreeds(selectedBreed)
        show()
    }

    return (
        <>
            <h1>Breed Modal</h1>
            <button onClick={show}>Close</button>
            <form onSubmit={onSubmit}>
                <Select
                isMulti
                isSearchable
                options={breed.map((breed) => ({value: breed, label: breed}))}
                onChange={(selectedBreed) => {
                    setSelectedBreed(selectedBreed.map((breed) => breed.value))
                }}
                value={selectedBreed.map((breed) => ({value: breed, label: breed}))}
                placeholder="Select Breed"
                />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}