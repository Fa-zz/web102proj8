import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../client'
import './Card.css'

const Card = (props) =>  {
    const navigate = useNavigate();

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
                <div className="tweet-author">{props.author}</div>
                <div className="tweet-body">
                    {props.body !== "NULL"
                        && props.body
                    }
                </div>

                <div className="tweet-time"><p>{props.timestamp}</p></div>
                </div>
                <div className="tweet-images">
                {props.img_url !== "NULL" && <img src={props.img_url} alt={``} />}
                </div>
            </div>
        </div>
    );
};

export default Card