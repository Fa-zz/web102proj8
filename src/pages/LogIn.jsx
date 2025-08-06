import { useState } from 'react'
import { supabase } from '../client'
import { useNavigate, Link } from 'react-router-dom';

const LogIn = ({setUser}) => {
    const navigate = useNavigate();
    const [returningUser, setReturningUser] = useState({username: "", password: ""})

    const checkUser = async (event) => {
        event.preventDefault();
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', returningUser.username)
            .eq('password', returningUser.password)
            .single();

        if (error) {
            console.error("Error logging in user:", error);
            alert('Uhh, something went wrong. Your account may not exist')
        } else {
            console.log("Success:", data);
            setUser(returningUser.username);
            navigate('/');
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setReturningUser( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }
    return (
        <div className="signup-form">
            <h2>Log in with your username and password.</h2>
            <br />
            <p>Don't have an account?  <Link to="/signup">Sign up!</Link></p>
            <form>
                <label htmlFor="username">Username</label>
                <input
                type="text"
                id="username"
                name="username"
                value={returningUser.username}
                onChange={handleChange}
                />

                <label htmlFor="password">Password</label>
                <input
                type="password"
                id="password"
                name="password"
                value={returningUser.password}
                onChange={handleChange}
                />

                <input type="submit" value="Submit" onClick={checkUser} />
            </form>
        </div>
    )
}

export default LogIn;