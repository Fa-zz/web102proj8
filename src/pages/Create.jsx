import { useState } from 'react'
import { supabase } from '../client'
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const navigate = useNavigate();

    const create = async (event) => {
        event.preventDefault();
        try {
            const { data, error } = await supabase
                .from('posts')
                .insert({ author: posts.author, body: posts.body, img_url: posts.img_url, like_count: 10 })
                .select();

            if (error) {
                console.error("Error creating post:", error);
            } else {
                console.log("Successfully created:", data);
                navigate('/');
            }
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    }
    const [posts, setPosts] = useState({author: "", body: "", img_url: ""})

    const handleChange = (event) => {
        const {name, value} = event.target
        setPosts( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }
    return (
        <div>
            <form>
                <label htmlFor="Author">Author</label> <br />
                <input type="text" id="author" name="author" value={posts.author} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="body">Body</label> <br />
                <input type="text" id="body" name="body" value={posts.body} onChange={handleChange} />
                <br />

                <label htmlFor="body">Image URL</label> <br />
                <input type="text" id="img_url" name="img_url" value={posts.img_url} onChange={handleChange} />
                <br />

                <input type="submit" value="Submit" onClick={create} />
            </form>
        </div>
    )
}

export default Create;