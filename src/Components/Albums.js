import React,{useState, useEffect} from 'react';


import { Link, useParams } from 'react-router-dom';
import './Albums.css';
//here we declering function commponent 
function Albums() {
    const[albums,setAlbums]=useState([]);
    const {userId}=useParams();
    useEffect(()=>{
        fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
        .then((response)=>response.json())
        .then((data)=>{
         
            setAlbums(data)
        })
    },[userId])//here we use dependency array to execute the effect when 'userId' changes.

  return (
    
    <div>
      <h1>User {userId}'s Albums</h1> 
      {/*displing heading with user id */}
      {albums.map(album=>(
        <div className='album'><Link to={`/photos/${album.id}`}><p key={album.id}>{album.title}</p></Link></div>
    ))}</div>
  )
}

export default Albums