import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import CustomerTable from './Components/CustomerTable/CustomerTable';
import TransactionGraph from './Components/TransactionGraph/TransactionGraph';
import NotFound from './Components/NotFound/NotFound';

function App() {

  let routers=createBrowserRouter([
    {path:"",element:<Layout/>,children:[
      {index:true,element:<Home/>},
      {path:'taskFront-end',element:<Home/>},
      {path:'customerTable',element:<CustomerTable/>},
      {path:'transactionGraph/:customerId',element:<TransactionGraph/>},
      {path:'*',element:<NotFound/>},
    ]}
  ])
  return <>
  <RouterProvider router={routers}>

  </RouterProvider>
  
  
  
  
  </>
  
}

export default App;
