import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../client'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import './Card.css'

const Card = (props) =>  {
    dayjs.extend(relativeTime);

    const navigate = useNavigate();

    const readable = dayjs(props.created_at).format("MMMM D, YYYY h:mm A");

    useEffect(() => {
    }, []);

    console.log(props.body);
    console.log(props.img_url);
    // const deleteMember = async (event) => {
    //     event.preventDefault();

    //     await supabase
    //         .from('party')
    //         .delete()
    //         .eq('id', props.id); 

    //     navigate('/');
    // }

    return (
        <div className="tweet-container">
            <div className="tweet-card" key={props.id}>
                <div className="tweet-content">
                    <div>
                        <div className="tweet-author">{props.title} • @{props.author}</div>
                        <div className="tweet-body">
                            {props.body !== "NULL" && props.body}
                        </div>
                    </div>

                    <div className="tweet-footer">
                        <div className="tweet-time">{readable}</div>
                        <div className="card-buttons">
                            <button className="like-btn">❤️ {props.like_count}</button>
                            <button className="retweet-btn">🔁</button>
                        </div>
                    </div>
                </div>
                <div className="tweet-images">
                    {(props.img_url !== "" && props.img_url !== "NULL") && <img src={props.img_url} />}
                </div>
            </div>
        </div>
    );
};

export default Card