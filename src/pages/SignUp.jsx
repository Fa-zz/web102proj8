import { useState } from 'react'
import { supabase } from '../client'
import { useNavigate, Link } from 'react-router-dom';

const SignUp = ({setUser}) => {
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState({username: "", password: ""})

    const createUser = async (event) => {
        event.preventDefault();
        const { data, error } = await supabase
            .from('users')
            .insert({ username: newUser.username, password: newUser.password })
            .select();

        if (error) {
            console.error("Error creating user:", error);
            alert('Uhh, something went wrong. Someone already has your username?')
        } else {
            console.log("Successfully created:", data);
            setUser(newUser.username);
            navigate('/');
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setNewUser( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }
    return (
        <div className="signup-form">
            <h2>Enter a unique username and secure password, dude.</h2>
            <br />
            <p>Already have an account?  <Link to="/login">Log in!</Link></p>
            <form>
                <label htmlFor="username">Username</label>
                <input
                type="text"
                id="username"
                name="username"
                value={newUser.username}
                onChange={handleChange}
                />

                <label htmlFor="password">Password</label>
                <input
                type="password"
                id="password"
                name="password"
                value={newUser.password}
                onChange={handleChange}
                />

                <input type="submit" value="Submit" onClick={createUser} />
            </form>
        </div>
    )
}

export default SignUp;