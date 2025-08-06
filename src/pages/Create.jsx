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
                let id = data[0].id
                navigate(`/view/${id}`);
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
        <div className="create-post-form">
            <h2>What's on your mind?</h2>
            <form>
                <label htmlFor="author">Author</label>
                <input
                type="text"
                id="author"
                name="author"
                value={newPost.author}
                onChange={handleChange}
                />

                <label htmlFor="title">Title</label>
                <input
                type="text"
                id="title"
                name="title"
                value={newPost.title}
                onChange={handleChange}
                />

                <label htmlFor="body">Body</label>
                <input
                type="text"
                id="body"
                name="body"
                value={newPost.body}
                onChange={handleChange}
                />

                <label htmlFor="img_url">Image URL</label>
                <input
                type="text"
                id="img_url"
                name="img_url"
                value={newPost.img_url}
                onChange={handleChange}
                />
                <button type="button">Get a random meme</button>

                <input type="submit" value="Submit" onClick={create} />
            </form>
        </div>
    )
}

export default Create;