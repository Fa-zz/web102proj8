import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../client'
import { Link } from 'react-router-dom'

const DetailedView = () => {
    const {id} = useParams() // This is the ID of the post
    const [post, setPost] = useState([])
    const [comments, setComments] = useState([])
    const navigate = useNavigate();

    // Get the post
    useEffect(() => {
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
        fetchPost();
    }, [id]);

    // Get comments under post
    useEffect(() => {
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
        fetchComments();
    }, [id]);

    return (
        <div>
            <button onClick={() => {navigate(-1)}}>Go back</button>
            <h3>{post.title} by @{post.author}</h3>
            {(post.img_url !== "" && post.img_url !== "NULL") && <img src={post.img_url} />}
            <br />
            <p>{post.body}</p>
            <button
            // onClick={(e) => {
            //     e.stopPropagation(); // Prevents triggering the parent link, which is link to DetailedView
            //     props.onClickLike(props.id, props.like_count);
            // }}
            // className="like-btn"
            >
            ❤️ {post.like_count}
            </button>
            <br />
            
            <ul>
                {comments.map(item => (
                    <div>
                        <p>@{item.author}</p>
                        <button>❣️ {item.like_count} </button>
                        <li key={item.id}>{item.body}</li>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default DetailedView