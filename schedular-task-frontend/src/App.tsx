import AddTask from "./components/pages/AddTask/AddTask";
import AllTask from "./components/pages/AllTask/AllTask";
import Home from "./components/pages/Home/Home"
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
 

  return (
    <>
    {/* <Home/> */}

    <BrowserRouter>
       
       
       
          {/* route definitions and resulting page components....... */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-task" element={<AddTask />} />
            <Route path="/all-task" element={<AllTask />} />
            </Routes>
          </BrowserRouter>
    </>
  )
}

export default App
