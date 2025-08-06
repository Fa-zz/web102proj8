import { useState, useEffect } from 'react'
import { useRoutes, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Navbar from './components/Navbar';
import Read from './pages/Read';
import Create from './pages/Create';
import { supabase } from './client'
// import Edit from './pages/Edit';
import DetailedView from './pages/DetailedView';
import './App.css'


const App = () => {
  // const [theme, setTheme] = useState('light');
  const [mainPosts, setMainPosts] = useState([]);
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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
      const newLikeCount = oldLikeCount + 1;

      const { error } = await supabase
          .from('posts')
          .update({ like_count: newLikeCount })
          .eq('id', id);

      if (error) {
          console.error("Error updating like count:", error.message);
      }
      fetchPosts();
      // navigate('/');
  }

  // ROUTES
  let element = useRoutes([
    {
      path: "/",
      element:<Read posts={searchedPosts} updateLikeCount={updateLikeCount} />
    },
    {
      path:"/new",
      element: <Create />
    },
    {
      path:"/view/:id",
      element: <DetailedView updateLikeCount={updateLikeCount} />
    }

    // ,
    // {
    //   path:"/edit/:id",
    //   element: <Edit />
    // },
    // {
    //   path:"/view/:id",
    //   element: <DetailedView />
    // }
  ]);

  return ( 

    <div className="App">

      <div className='container'>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div style={{ paddingTop: "60px" }}>
          {element}
        </div>
      </div>
    </div>

  )
}

export default App
