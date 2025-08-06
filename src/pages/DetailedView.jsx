import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../client'
import { Link } from 'react-router-dom'
import './DetailedView.css'

const DetailedView = ({updateLikeCount}) => {
    const {id} = useParams() // This is the ID of the post
    const [post, setPost] = useState([])
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState({ author: "", body: "" });
    const navigate = useNavigate();


    const fetchPost = async () => {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('id', id)
            .single();
            if (error) {
                console.error("Error fetching member:", error);
            } else {
                setPost(data);
            }
    };

    // Get the post
    useEffect(() => {
        fetchPost();
    }, [id]);


    const fetchComments = async () => {
        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .eq('post_id', id)
            if (error) {
                console.error("Error fetching member:", error);
            } else {
                setComments(data);
            }
    };

    // Get comments under post
    useEffect(() => {
        fetchComments();
    }, [id]);

    const create = async (event) => {
        event.preventDefault();
        const { data, error } = await supabase
            .from('comments')
            .insert({ author: newComment.author, body: newComment.body, post_id: id })
            .select();

        if (error) {
            console.error("Error creating post:", error);
        } else {
            console.log("Successfully created:", data);
        }
        fetchComments();
    }

    const handlePostLikeClick = (id, likeCount) => {
        updateLikeCount(id, likeCount);
        fetchPost();
    };

    // Called when like button for a comment is clicked
    const handleCommentLikeClick = async (itemID, oldLikeCount) => {
        const newLikeCount = oldLikeCount + 1;

        const { error } = await supabase
            .from('comments')
            .update({ like_count: newLikeCount })
            .eq('id', itemID);

        if (error) {
            console.error("Error updating comment like count:", error.message);
        }
        fetchComments();
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setNewComment( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    return (
        <div className="post-container">
            <button className="go-back-btn" onClick={() => navigate(-1)}>⬅️ Go back</button>
            <br /><br />
            <h3>{post.title} by @{post.author}</h3>
            {(post.img_url && post.img_url !== "NULL") && <img src={post.img_url} alt="Post image" />}
            <p>{post.body}</p>

            <button
            onClick={() => handlePostLikeClick(id, post.like_count)}
            className="like-btn"
            >
            ❤️ {post.like_count}
            </button>

            <br /><br /><br />

            <h3>Add a comment, join the conversation</h3>
            <form>
                <label htmlFor="author">Author</label>
                <input
                    type="text"
                    id="author"
                    name="author"
                    value={newComment.author}
                    onChange={handleChange}
                />

                <label htmlFor="body">Body</label>
                <input
                    type="text"
                    id="body"
                    name="body"
                    value={newComment.body}
                    onChange={handleChange}
                />

                <input type="submit" value="Submit" onClick={create} />
            </form>

            <br /><br /><br />
            <h3>Comments</h3>
            <ul>
            {
            comments.length === 0 ? (
                <p>You're the first one here :)</p>
            ) : (
                comments.map((item) => (
                <li key={item.id}>
                    <p>@{item.author}</p>
                    <p>{item.body}</p>
                    <button
                    onClick={() => handleCommentLikeClick(item.id, item.like_count)}
                    className="like-btn"
                    >
                    ❣️ {item.like_count}
                    </button>
                </li>
                ))
            )
            }
            </ul>
        </div>
    )
}

export default DetailedView