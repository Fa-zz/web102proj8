import { useRoutes } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Read from './pages/Read';
// import Create from './pages/Create';
// import Edit from './pages/Edit';
// import DetailedView from './pages/DetailedView';
import './App.css'


const App = () => {
  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<Read />
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

      <div>
        {/* <h1>Create, view, update your Dungeons and Dragons party</h1>
        <Link to={`/`}><button>Home</button></Link> */}
      </div>
      {element}
    </div>

  )
}

export default App
