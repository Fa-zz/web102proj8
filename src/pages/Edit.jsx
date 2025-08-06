import { useState, useEffect } from 'react'
import { supabase } from '../client'
import { useParams } from 'react-router-dom';

const Edit = ({deletePost, updatePost, user}) => {
    // const navigate = useNavigate();
    const [post, setPost] = useState({author: user, body: "", img_url: "", title: ""})
    const {id} = useParams()

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', id)
                .single();

                if (error) {
                    console.error("Error fetching post:", error);
                } else {
                    setPost(data);
                }
            };

            fetchPost();
        }, [id]);
    
    const handleChange = (event) => {
        const {name, value} = event.target
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    return (
        <div className="edit-post-form">
            <h2>Update your post</h2>
            <form>
                <label htmlFor="title">Title</label>
                <input
                type="text"
                id="title"
                name="title"
                value={post.title}
                onChange={handleChange}
                />

                <label htmlFor="body">Body</label>
                <input
                type="text"
                id="body"
                name="body"
                value={post.body}
                onChange={handleChange}
                />

                <label htmlFor="img_url">Image URL</label>
                <input
                type="text"
                id="img_url"
                name="img_url"
                value={post.img_url}
                onChange={handleChange}
                />
                <button type="button">Get a random meme</button>

                <button className='delete-btn' onClick={() => deletePost(id)} type="button">Delete post</button>

                <input type="submit" value="Submit" onClick={(e) => {e.preventDefault(); updatePost(id, post);}} />
            </form>
        </div>
    )
}

export default Edit;