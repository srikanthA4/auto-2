import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import User from "./Components/User";
import Conetent from "./Components/Posts";
import Comments from "./Components/comments";
import Todos from "./Components/Todos";
import CompletedTodos from "./Components/CompletedTodos";
import PendingTodos from "./Components/PendingTodos";
import Albums from "./Components/Albums";
import PostsComments from "./Components/PostsComments";
import AlbumsPhotos from "./Components/AlbumsPhotos";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/posts/:id" element={<Conetent />} />
          <Route path="/comments/:id" element={<Comments />} />
          <Route path="/todos/:userId" element={<Todos/>}/>
          <Route path="/completedtodos/:userId" element={<CompletedTodos/>}/>
          <Route path="/pendingtodos/:userId" element={<PendingTodos/>}/>
          <Route path="/albums/:userId" element={<Albums/>}/>
          <Route path="/coments/:postId" element={<PostsComments/>}/>
          <Route path="/photos/:albumId" element={<AlbumsPhotos/>}/>
              
        </Routes>
      </div>
    </Router>
    // <div><Todos/></div>
  );
}

export default App;
