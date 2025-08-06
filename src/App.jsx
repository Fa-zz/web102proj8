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

  // When page initially loads, get all posts
  useEffect(() => {
      // READ all post from table
      fetchPosts();
  }, [])

  // Recalculate searchedPosts when searchTerm or mainPosts change
  useEffect(() => {
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
        .eq('id', id);

    if (error) {
        console.error("Error updating like count:", error.message);
    }
    fetchPosts();
  }

  const deletePost = async (id) => {
      await supabase
          .from('posts')
          .delete()
          .eq('id', id); 

      navigate('/');
      fetchPosts();
  }

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
      element:<Read posts={searchedPosts} updateLikeCount={updateLikeCount} deletePost={deletePost} user={user} />
    },
    {
      path:"/new",
      element: <Create user={user} getMeme={getMeme} />
    },
    {
      path:"/view/:id",
      element: <DetailedView updateLikeCount={updateLikeCount} user={user} fetchPosts={fetchPosts} deletePost={deletePost} />
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
