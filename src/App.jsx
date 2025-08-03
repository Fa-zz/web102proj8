// import { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Navbar from './components/Navbar';
import Read from './pages/Read';
import Create from './pages/Create';
// import Edit from './pages/Edit';
// import DetailedView from './pages/DetailedView';
import './App.css'


const App = () => {
  // const [theme, setTheme] = useState('light');

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<Read />
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
        <Navbar />
        
        <div style={{ paddingTop: "60px" }}>
          {element}
        </div>
      </div>
    </div>

  )
}

export default App
