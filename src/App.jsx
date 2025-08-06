import { useState, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Navbar from './components/Navbar';
import Read from './pages/Read';
import Create from './pages/Create';
import { supabase } from './client'
// import Edit from './pages/Edit';
// import DetailedView from './pages/DetailedView';
import './App.css'


const App = () => {
  // const [theme, setTheme] = useState('light');
  const [mainPosts, setMainPosts] = useState([]);
  const [searchedPosts, setSearchedPosts] = useState([]);

  // Gets all posts
  const fetchPosts = async () => {
      try {
          const {data} = await supabase
              .from('posts')
              .select();
          // set state of posts
              setSearchedPosts(data)
          } catch (error) {
              console.log("Error reading posts ", error)
          }
  } 

  // When page initially loads, get all posts
  useEffect(() => {
      // READ all post from table
      fetchPosts();
  }, [])

  const onSearchClick = (searchTerm) => {
    console.log(searchTerm);
  }

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<Read fetchPosts={fetchPosts} posts={searchedPosts} />
    },
    {
      path:"/new",
      element: <Create />
    }
    // ,
    // {
    //   path:"/new",
    //   element: <Create />
    // },
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
        <Navbar onSearchClick={onSearchClick} />

        <div style={{ paddingTop: "60px" }}>
          {element}
        </div>
      </div>
    </div>

  )
}

export default App
