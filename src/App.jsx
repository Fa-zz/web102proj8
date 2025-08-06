import { useState, useEffect } from 'react'
import { useRoutes, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { supabase } from './client'
import Navbar from './components/Navbar';
import Read from './pages/Read';
import Create from './pages/Create';
import DetailedView from './pages/DetailedView';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Edit from './pages/Edit';
import './App.css'


const App = () => {
  // const [theme, setTheme] = useState('light');
  const [user, setUser] = useState("");
  const [mainPosts, setMainPosts] = useState([]);
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  let memeApiUrl = "https://meme-api.com/gimme";

  // Gets all posts
  const fetchPosts = async () => {
    try {
      const { data } = await supabase.from("posts").select();
      setMainPosts(data);
    } catch (error) {
      console.log("Error reading posts ", error);
    }
  };

  // const fetchPost = async (id) => {
  //   console.log(searchedPosts);
  //   const { data, error } = await supabase
  //     .from('posts')
  //     .select('*')
  //     .eq('id', id)
  //     .single();
  //     if (error) {
  //         console.error("Error fetching member:", error);
  //     } else {
  //         setPost(data);
  //     }
  // };

  // const fetchPostInState = (idToGet) => {
  //   console.log(searchedPosts);
  //   const key = 'id';
  //   for (const item of searchedPosts) {
  //     if (item.id == idToGet) {
  //       setPost(item);
  //       console.log("in fetchPostInState, we just set this post to ", item);
  //     }
  //   }
  //   // const { data, error } = await supabase
  //   //   .from('posts')
  //   //   .select('*')
  //   //   .eq('id', id)
  //   //   .single();
  //   //   if (error) {
  //   //       console.error("Error fetching member:", error);
  //   //   } else {
  //   //       setPost(data);
  //   //   }
  // };

  const fetchComments = async (id) => {
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


  // When page initially loads, get all posts
  useEffect(() => {
      // READ all post from table
      fetchPosts();
  }, [])

  // Recalculate searchedPosts when searchTerm or mainPosts change. Which occurs during searching for title, CRUD, and like operations
  useEffect(() => {
    console.log("App.jsx useffect kicked in, recalculates searchedPosts");
    if (!searchTerm) {
      setSearchedPosts(mainPosts);
    } else {
      const results = mainPosts.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchedPosts(results);
    }
  }, [searchTerm, mainPosts]);

  // Called when like button is clicked, either in Card component or DetailedView. Increments the like count of a post, then re-fetches all posts
  const updateLikeCount = async (id, oldLikeCount) => {
    {if (user === "") {alert("Hey you're gonna need to log in before you can do that"); return;}}

    const newLikeCount = oldLikeCount + 1;
    const { error } = await supabase
        .from('posts')
        .update({ like_count: newLikeCount })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error("Error updating like count:", error.message);
    } else {
      // Update the UI
      setMainPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === id ? { ...post, like_count: post.like_count + 1 } : post
        )
      );
      // // update individual post to 
      // fetchPostInState(id);
    }
    // fetchPosts();
  }

    // Called when like button for a comment is clicked
    const updateCommentLikeCount = async (itemID, oldLikeCount) => {
        {if (user === "") {alert("Hey you're gonna need to log in before you can do that"); return;}}
        const newLikeCount = oldLikeCount + 1;
        const { error } = await supabase
            .from('comments')
            .update({ like_count: newLikeCount })
            .eq('id', itemID);

        if (error) {
            console.error("Error updating comment like count:", error.message);
        }
        // fetchComments();
    }

  // Delete post is called when a user deletes their post either from feed (Read) or DetailedView views
  const deletePost = async (id) => {
      const { error } = await supabase
          .from('posts')
          .delete()
          .eq('id', id); 

      navigate('/');
      // fetchPosts();
      if (error) {
        console.error("Failed to delete post:", error);
      } else {
        // Remove from UI
        setMainPosts(prev => prev.filter(post => post.id !== id));
      }
  }

  // Create Post: Can create a post from form in navbar
  const createPost = async (newPost) => {
    const { data, error } = await supabase
      .from('posts')
      .insert({ author: newPost.author, body: newPost.body, img_url: newPost.img_url, title: newPost.title, like_count: 10 })
      .select();              // Fetch the inserted row(s)

    if (!error && data && data.length > 0) {
      console.log(data);
      setSearchedPosts(prev => [...prev, data[0]]);  // Add the new post to state
      navigate(`/view/${data[0].id}`); // go to new post DetailedView
    } else {
      console.error("Error creating post:", error);
    }
  };

  // Gets a random meme, for creating a post
  async function getMeme() {
    try {
      const response = await fetch(memeApiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // ROUTES
  let element = useRoutes([
    {
      path: "/",
      element:<Read searchedPosts={searchedPosts} updateLikeCount={updateLikeCount} deletePost={deletePost} user={user} />
    },
    {
      path:"/new",
      element: <Create user={user} createPost={createPost} getMeme={getMeme} />
    },
    {
      path:"/view/:id",
      element: <DetailedView updateLikeCount={updateLikeCount} updateCommentLikeCount={updateCommentLikeCount} user={user} posts={searchedPosts} deletePost={deletePost} />
    },
    {
      path:"/signup",
      element: <SignUp setUser={setUser} />
    },
    {
      path:"/login",
      element: <LogIn setUser={setUser} />
    },
    {
      path:"/edit/:id",
      element: <Edit deletePost={deletePost} user={user} />
    }
  ]);

  return ( 

    <div className="App">

      <div className='container'>
        <Navbar setSearchTerm={setSearchTerm} user={user} />

        <div style={{ paddingTop: "60px" }}>
          {element}
        </div>
      </div>
    </div>

  )
}

export default App
