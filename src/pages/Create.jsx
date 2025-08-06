import { useState } from 'react'
import { supabase } from '../client'
import { useRef } from 'react';


const Create = ({user, getMeme, createPost}) => {
    const fileInputRef = useRef(null);

    const [newPost, setNewPost] = useState({author: user, body: "", img_url: "", title: ""})

    const handleChange = (event) => {
        const {name, value} = event.target
        console.log(newPost);
        setNewPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase
            .storage
            .from('post-images')
            .upload(filePath, file);

        if (uploadError) {
            console.error("Error uploading file:", uploadError.message);
            return;
        }

        // Get public URL
        const { data: publicUrlData } = supabase
            .storage
            .from('post-images')
            .getPublicUrl(filePath);

        if (publicUrlData?.publicUrl) {
            setNewPost(prevState => ({
            ...prevState,
            img_url: publicUrlData.publicUrl
            }));
        }

        // Reset file input display
        event.target.value = "";
        fileInputRef.current.value = ""; // reset file input
    };

    return (
        <div className="create-post-form">
            <h2>What's on your mind?</h2>
            <form>
                <h4>New post from {user}</h4>

                <label htmlFor="title">Title</label>
                <input
                type="text"
                id="title"
                name="title"
                value={newPost.title}
                onChange={handleChange}
                />

                <label htmlFor="body">Body</label>
                <input
                type="text"
                id="body"
                name="body"
                value={newPost.body}
                onChange={handleChange}
                />

                <label htmlFor="img_url">Image URL</label>
                <input
                type="text"
                id="img_url"
                name="img_url"
                value={newPost.img_url}
                onChange={handleChange}
                />

                <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                />

                <button onClick={() => {
                        getMeme()
                        .then((data) => {
                            console.log("Fetched meme data:", data);
                            setNewPost(prevState => ({
                                ...prevState,
                                img_url: data
                            }));
                        })
                        .catch((error) => {
                            console.error("Error in getting meme:", error);
                        });
                    }} 
                    type="button">Get a random meme
                </button>

                {newPost.img_url ? (
                <img
                    src={newPost.img_url}
                    alt="Post preview"
                    style={{ maxWidth: '300px', marginTop: '1rem' }}
                />
                ) : null}

                <input
                type="submit"
                value="Submit"
                onClick={(e) => {
                    e.preventDefault(); // ⛔ prevent page refresh
                    createPost(newPost);
                }}
                />
            </form>
        </div>
    )
}

export default Create;