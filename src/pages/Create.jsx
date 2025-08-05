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
                .insert({ author: newPost.author, body: newPost.body, img_url: newPost.img_url, title: newPost.title, like_count: 10 })
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
    const [newPost, setNewPost] = useState({author: "", body: "", img_url: "", title: ""})

    const handleChange = (event) => {
        const {name, value} = event.target
        console.log(newPost);
        setNewPost( (prev) => {
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
                <input type="text" id="author" name="author" value={newPost.author} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="Author">Title</label> <br />
                <input type="text" id="title" name="title" value={newPost.title} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="body">Body</label> <br />
                <input type="text" id="body" name="body" value={newPost.body} onChange={handleChange} />
                <br />

                <label htmlFor="body">Image URL</label> <br />
                <input type="text" id="img_url" name="img_url" value={newPost.img_url} onChange={handleChange} />
                <br />

                <input type="submit" value="Submit" onClick={create} />
            </form>
        </div>
    )
}

export default Create;