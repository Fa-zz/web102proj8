import { useState, useEffect } from 'react'
import Card from '../components/Card'
import { supabase } from '../client'
import { Link, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs';
import './Read.css'

// Ascending, descending date and like count sort
const descDateSort = (a, b) => dayjs(b.created_at).valueOf() - dayjs(a.created_at).valueOf();
const ascDateSort = (a, b) =>  dayjs(a.created_at).valueOf() - dayjs(b.created_at).valueOf();
const descLikeSort = (a, b) => b.like_count - a.like_count;
const ascLikeSort = (a, b) =>  a.like_count - b.like_count;

const Read = ({fetchPosts, posts}) => {
    const navigate = useNavigate();
    // const [posts, setPosts] = useState([]) // acquired from querying db after initial render, and when like button is clicked (see Card component)
    const [sortDateScheme, setDateSortScheme] = useState('a'); // the default scheme to sort date. 'd' for desc, 'a' for asc
    const [sortLikeScheme, setLikeSortScheme] = useState('a'); // the default scheme to sort likes
    const [sortingWhat, setSortingWhat] = useState('d'); // posts can only be sorted by one value at a time. This controls what is being sorted. 'd' for date, 'l' for likes

    // Returns the correct sorting function given the sorting scheme
    const sortDateOrder = (sortingScheme) => {
        if (sortingScheme === "a") {
            return ascDateSort;
        } else if (sortingScheme == "d") {
            return descDateSort;
        }
    }

    // Returns the correct sorting function given the sorting scheme
    const sortLikeOrder = (sortingScheme) => {
        if (sortingScheme === "a") {
            return ascLikeSort;
        } else if (sortingScheme == "d") {
            return descLikeSort;
        }
    }

    // When "date" sort button is clicked, this function sets sortingWhat to date, and flips the dateSortScheme
    const onClickSortDate = (event) => {
        event.preventDefault();
        setSortingWhat('d');
        sortDateScheme === 'a' ? setDateSortScheme('d') : setDateSortScheme('a')
        navigate('/');
    }

    // When "like" sort button is clicked, this function sets sortingWhat to like, and flips the likeSortScheme
    const onClickSortLike = (event) => {
        event.preventDefault();
        setSortingWhat('l');
        sortLikeScheme === 'a' ? setLikeSortScheme('d') : setLikeSortScheme('a')
        navigate('/');
    }

    // // When page initially loads, get all posts
    // useEffect(() => {
    //     setPosts(posts);
    // }, [])

    // Gets a specific post by id (currently unused)
    const selectDataById = async (targetId) => {
        const { data, error } = await supabase
            .from('posts')
            .select('*') // Selects all columns. You can specify specific columns like 'name, email'
            .eq('id', targetId); // Filters where the 'idColumnName' matches 'targetId'

        if (error) {
            console.error('Error fetching data:', error.message);
            return null;
        }
        return data;
    }

    // Called when like button is clicked in Card.jsx. Increments the like count of a post, then re-fetches all posts
    const updateLikeCount = async (id, oldLikeCount) => {
        const newLikeCount = oldLikeCount + 1;

        const { error } = await supabase
            .from('posts')
            .update({ like_count: newLikeCount })
            .eq('id', id);

        if (error) {
            console.error("Error updating like count:", error.message);
        }
        fetchPosts();
        navigate('/');
    }

    return (
        <div>
            <h3 style={{ textAlign: 'center' }}>All posts</h3>
            <div className="filters">
                <p>Sort:</p>
                <button onClick={onClickSortDate}>Date</button>
                <button onClick={onClickSortLike}>Likes</button>
                <button>Retweets</button>
            </div>
            {
                posts && posts.length > 0 ?
                [...posts]
                .sort((a, b) => {
                    if (sortingWhat === 'd') {
                        const dateSortFn = sortDateOrder(sortDateScheme);
                        return dateSortFn(a, b);
                    } else if (sortingWhat == 'l') {
                        const likeSortFn = sortLikeOrder(sortLikeScheme);
                        return likeSortFn(a, b);
                    }
                })
                .map((member, index) => (
                <Card
                    id={member.id}
                    created_at={member.created_at}
                    body={member.body}
                    like_count={member.like_count}
                    author={member.author}
                    img_url={member.img_url}
                    title={member.title}
                    onClickLike={updateLikeCount}
                />
                )) : <h2>{'No members in posts 😞'}</h2>
            }
        </div>  
    )
}

export default Read