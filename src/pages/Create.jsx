import { useState } from 'react'
import { supabase } from '../client'
import { useNavigate } from 'react-router-dom';

const Create = ({user, getMeme, createPost}) => {
    const navigate = useNavigate();

    const [newPost, setNewPost] = useState({author: user, body: "", img_url: "", title: ""})

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
                <h4>New post from {user}</h4>

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
                <button onClick={() => {
                        getMeme()
                        .then((data) => {
                            console.log("Fetched meme data:", data);
                            setNewPost(prevState => ({
                                ...prevState,
                                img_url: data
                            }));
                        })
                        .catch((error) => {
                            console.error("Error in getting meme:", error);
                        });
                    }} 
                    type="button">Get a random meme
                </button>

                {newPost.img_url ? <img src={newPost.img_url} alt="Post image" /> : null}

                <input
                type="submit"
                value="Submit"
                onClick={(e) => {
                    e.preventDefault(); // ⛔ prevent page refresh
                    createPost(newPost);
                }}
                />
            </form>
        </div>
    )
}

export default Create;