import { useState, useEffect } from 'react'
import Card from '../components/Card'
import { supabase } from '../client'
import { Link } from 'react-router-dom'

const Read = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        // READ all post from table
        const fetchPosts = async () => {
            try {
                const {data} = await supabase
                    .from('posts')
                    .select();
                // set state of posts
                setPosts(data)
            } catch (error) {
                console.log("Error reading posts ", error)
            }
        }  
        fetchPosts();
    }, [])
    
    return (
        <div className="ReadPosts">
            <h3 style={{ 'text-align': 'center' }}>All posts</h3>
            {
                posts && posts.length > 0 ?
                [...posts]
                .sort((a, b) => a.id - b.id)
                .map((member,index) => 
                    <Card
                        created_at={member.created_at} 
                        body={member.body}                  
                        like_count={member.like_count}
                        author={member.author}
                        img_url={member.img_url}
                    />
                ) : <h2>{'No members in posts 😞'}</h2>
            }
        </div>  
    )
}

export default Read