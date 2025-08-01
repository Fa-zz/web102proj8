import { useState, useEffect } from 'react'
// import Card from '../components/Card'
import { supabase } from '../client'
import { Link } from 'react-router-dom'

const Read = () => {

    // const [partyMembers, setPartyMembers] = useState([])

    // useEffect(() => {
    //     // READ all post from table
    //     const fetchPosts = async () => {
    //         try {
    //             const {data} = await supabase
    //                 .from('party')
    //                 .select();
    //             // set state of posts
    //             setPartyMembers(data)
    //         } catch (error) {
    //             console.log("Error reading posts ", error)
    //         }
    //     }  
    //     fetchPosts();
    // }, [props])
    
    return (
        <div className="ReadPosts">
            <p>Party members so far:</p>
            {/* {
                partyMembers && partyMembers.length > 0 ?
                [...partyMembers]
                .sort((a, b) => a.id - b.id)
                .map((member,index) => 
                    <Card
                        key={member.id} 
                        name={member.name}
                        race={member.race}
                        class={member.class}
                        id={member.id} 
                    />
                ) : <h2>{'No members in your party yet 😞'}</h2>
            }
            <Link to="/new"><button className="headerBtn"> Add new member </button></Link> */}
        </div>  
    )
}

export default Read