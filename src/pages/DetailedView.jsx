import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../client'
import { Link } from 'react-router-dom'
import './DetailedView.css'

const DetailedView = ({updateLikeCount, updateCommentLikeCount, user, posts, deletePost}) => {
    const {id} = useParams() // This is the ID of the post
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);
    // const [post, setPost] = useState([])
    // const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState({ author: "", body: "" });
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPostById = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', id)
                .single();

            if (!error && data) {
                setPost(data);
                if (liked) {
                    post.like_count = post.like_count + 1;
                    setPost(post);
                    setLiked(false);
                }
            }
        };

        fetchPostById();
    }, [posts, id, liked]);

    if (!post) return <div>Serving up your post...</div>;

    // // Get the post and comments
    // useEffect(() => {
    //     fetchPost(id);
    //     fetchComments(id);
    // }, [id]);


    // const createComment = async (event) => {
    //     event.preventDefault();
    //     const { data, error } = await supabase
    //         .from('comments')
    //         .insert({ author: newComment.author, body: newComment.body, post_id: id })
    //         .select();

    //     if (error) {
    //         console.error("Error creating comment:", error);
    //     } else {
    //         console.log("Successfully created:", data);
    //     }
    //     fetchComments();
    // }

    // const handlePostLikeClick = (id, likeCount) => {
    //     updateLikeCount(id, likeCount);
    //     fetchPost();
    // };

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
            <button className="go-back-btn" onClick={() => {navigate('/');}}>⬅️ Go to feed</button>
            <br /><br />
            <h3>{post.title} by @{post.author}</h3>
            {(post.img_url && post.img_url !== "NULL") && <img src={post.img_url} alt="Post image" />}
            <p>{post.body}</p>

            <div className="btn-group">
                <button
                onClick={() => {setLiked(true); updateLikeCount(id, post.like_count);}}
                className="like-btn"
                >
                ❤️ {post.like_count} Likes
                </button>
                {
                    post.author === user &&
                    <button
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/edit/${post.id}`)
                    }}
                    className="edit-btn"
                    >📝 Edit this post
                    </button>
                }
                {
                    post.author === user &&
                    <button
                    onClick={(e) => {
                        e.stopPropagation();
                        deletePost(post.id);
                    }}
                    className="delete-btn"
                    >🚮 Delete this post
                    </button>
                }
            </div>

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

                {/* <input type="submit" value="Submit" onClick={createComment} /> */}
            </form>

            <br /><br /><br />
            <h3>Comments</h3>
            {/* <ul>
            {
            comments.length === 0 ? (
                <p>You're the first one here :)</p>
            ) : (
                comments.map((item) => (
                <li key={item.id}>
                    <p>@{item.author}</p>
                    <p>{item.body}</p>
                    <button
                    onClick={() => updateCommentLikeCount(item.id, item.like_count)}
                    className="like-btn"
                    >
                    ❣️ {item.like_count}
                    </button>
                </li>
                ))
            )
            }
            </ul> */}
        </div>
    )
}

export default DetailedView