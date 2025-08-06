import { useState, useEffect } from 'react'
import { supabase } from '../client'
import { Link, useParams } from 'react-router-dom';
import Card from '../components/Card'
import './Read.css'

const Profile = ({user, updateLikeCount, deletePost}) => {
    const {username} = useParams();
    const [userPosts, setUserPosts] = useState([]);

    const fetchUserPosts = async () => {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('author', username)
            if (error) {
                console.error("Error fetching member:", error);
            } else {
                console.log("Success: ", data);
                setUserPosts(data);
            }
    };

    useEffect(() => {
        fetchUserPosts();
    }, []);

    if (!userPosts) return <div>Serving up your profile...</div>;

    return (
        <div>
            <h3 style={{ textAlign: 'center' }}>
                <>
                    <Link to={`/profile/${user}`} className="profile-link">
                        @{username}
                    </Link>
                </>
            </h3>
            {
                userPosts && userPosts.length > 0 ?
                [...userPosts]
                // .sort((a, b) => {
                //     if (sortingWhat === 'd') {
                //         const dateSortFn = sortDateOrder(sortDateScheme);
                //         return dateSortFn(a, b);
                //     } else if (sortingWhat == 'l') {
                //         const likeSortFn = sortLikeOrder(sortLikeScheme);
                //         return likeSortFn(a, b);
                //     }
                // })
                .map((member, index) => (
                <Card key={member.id}
                    user={user}
                    id={member.id}
                    created_at={member.created_at}
                    body={member.body}
                    like_count={member.like_count}
                    author={member.author}
                    img_url={member.img_url}
                    title={member.title}
                    onClickLike={updateLikeCount}
                    deletePost={deletePost}
                />
                )) : <h2>{'No members in posts 😞'}</h2>
            }
        </div>
    );
};

export default Profile