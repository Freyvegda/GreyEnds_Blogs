import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { Blog } from "./pages/Blog"
import { Blogs } from "./pages/Blogs"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { Publish } from "./pages/Publish"
import { EditProfile } from "./pages/EditProfile"
import { Spinner } from "./components/Spinner"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<Navigate to="/signup" replace />} />
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/signin" element = {<Signin/>}></Route>
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs/>} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/edit" element={<EditProfile/>}/>
          <Route path="/spinner" element={<Spinner/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
