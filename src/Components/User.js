import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import './User.css';

function User() {
  //Here we useing state declarations 
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [albums, setAlbums] = useState([]);
 

  //use Effect hook for fetching data
  useEffect(() => {
    

      //To fetch albums data from JSONPlaceholder API
    fetch('https://jsonplaceholder.typicode.com/albums')
      .then((response) => response.json())
      .then((data) => setAlbums(data));

    //To nested fetch calls to fetch users, posts, and comments data
      fetch('https://jsonplaceholder.typicode.com/comments')
      .then((response) => response.json())
      .then((comments) => {
        fetch('https://jsonplaceholder.typicode.com/posts')
          .then((response) => response.json())
          .then((posts) => {
            fetch('https://jsonplaceholder.typicode.com/users')
              .then((res) => res.json())
              .then(
                (users) => {
                  //To Processing fetched data and updating state
                  setIsLoaded(true);
                  const newUsers = users.map((user) => {
                    const filteredPosts = posts.filter(
                      (post) => post.userId === user.id
                    );
                    let commentsLength = 0;
                    comments.map((comm) => {
                      filteredPosts.map((po) => {
                        commentsLength =
                          po.id === comm.postId
                            ? commentsLength + 1
                            : commentsLength;// to caluculate the leghth 
                      });
                    });

                    return {
                      ...user,
                      postsLength: filteredPosts.length,
                      commentsLength: commentsLength,
                    };
                  });
                  setItems(newUsers);
                },
                (error) => {
                  setIsLoaded(true);
                  setError(error);
                }
              );
          });
      });
  }, []);
  // Here we use render to based on state
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    //render user data in table 
    return (
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>CustomerId</th>
              <th>Company Name</th>
              <th>Person Name</th>
              <th>Detaills</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.company.name}</td>
                <td>{item.name}</td>
                <td>
                  <li>name:{item.name},</li>
                  <li>username:{item.username},</li>
                  <li value="email">email:{item.email},</li>
                  <li>street:{item.address.street},</li>
                  <li>suite:{item.address.suite},</li>
                  <li>city:{item.address.city},</li>
                  {/* <li>zip code:{item.address.zipcode},</li>
                  <li>latitude:{item.address.geo.lat}</li> */}
                  <li>phone:{item.phone},</li>
                  <li className="website">
                    website:<a href="{item.website}">{item.website},</a>
                  </li>
                  <li>catchPhrase:{item.company.catchPhrase},</li>
                  <li>bs:{item.company.bs}</li>
                </td>
                <td>
                  <li>
                    <Link to={'posts/' + item.id}>
                      posts ({item.postsLength})
                    </Link>

                    <Link to={'comments/' + item.id}>
                      comments ({item.commentsLength})
                    </Link>
                    <Link to={`/albums/${item.id}`}>
                      Albums(
                      {
                        albums.filter((album) => album.userId === item.id)
                          .length
                      }
                      )
                    </Link>
                    
                  </li>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default User;
