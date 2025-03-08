import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios/axios';

export const Login = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const navigator = useNavigate()

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        try {
            axios.post('/auth/login', {
                name,
                email
            }).then((res) => {
                if (res.status === 200) {
                    navigator('/')
                }
            })

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <>
            <div className='login'>
                <div className='login_wrapper'>
                    <h1>Logging in</h1>
                    <form onSubmit={onSubmit}>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

