import { useState, useEffect } from 'react'
import { supabase } from '../client'
import { useParams } from 'react-router-dom';
import { useRef } from 'react';

const Edit = ({deletePost, updatePost, user, getMeme}) => {
    const fileInputRef = useRef(null);
    const [post, setPost] = useState({author: user, body: "", img_url: "", title: ""})
    const {id} = useParams()

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', id)
                .single();

                if (error) {
                    console.error("Error fetching post:", error);
                } else {
                    setPost(data);
                }
            };

            fetchPost();
        }, [id]);
    
    const handleChange = (event) => {
        const {name, value} = event.target
        setPost( (prev) => {
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
            setPost(prevState => ({
            ...prevState,
            img_url: publicUrlData.publicUrl
            }));
        }

        // Reset file input display
        event.target.value = "";
        fileInputRef.current.value = ""; // reset file input
    };

    return (
        <div className="edit-post-form">
            <h2>Update your post</h2>
            <form>
                <label htmlFor="title">Title</label>
                <input
                type="text"
                id="title"
                name="title"
                value={post.title}
                onChange={handleChange}
                />

                <label htmlFor="body">Body</label>
                <input
                type="text"
                id="body"
                name="body"
                value={post.body}
                onChange={handleChange}
                />

                <label htmlFor="img_url">Image URL</label>
                <input
                type="text"
                id="img_url"
                name="img_url"
                value={post.img_url}
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

                {post.img_url ? (
                <img
                    src={post.img_url}
                    alt="Post preview"
                    style={{ maxWidth: '300px', marginTop: '1rem' }}
                />
                ) : null}

                <input type="submit" value="Submit" onClick={(e) => {e.preventDefault(); updatePost(id, post);}} />
            </form>
        </div>
    )
}

export default Edit;