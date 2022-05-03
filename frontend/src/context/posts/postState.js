import PostContext from "./postContext";
import { useState } from "react";
const Poststate = (props) => {
  const host = "http://localhost:5000"
  const postsInitial = []
  const [posts, setPosts] = useState(postsInitial)

  // Get all Posts
  const getPosts = async () => {
    // API Call 
    const response = await fetch(`${host}/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization:"Bearer "+localStorage.getItem("token")
      }
    });
    const json = await response.json() 
    setPosts(json.posts)
  }

  // Add a Note
  const addPost = async (formdatas) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/posts`, {
      method: 'POST',
      headers: {
        // 'Accept': 'application/json',
        authorization:"Bearer "+localStorage.getItem("token")
      },
      // body: JSON.stringify(formdatas)
      body: formdatas
    });

    const post = await response.json();
    console.log(post)
    setPosts(posts.concat(post.posts))
  }

  // Delete a Note
  const deletePost = async (id) => {
    // API Call
    const response = await fetch(`${host}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization:"Bearer "+localStorage.getItem("token")
      }
    });
    const json = response.json(); 
    const newPosts = posts.filter((post) => { return post._id !== id })
    setPosts(newPosts)
  }

  // Edit a Note
  // const editPost = async (id,name, location ,likes,description, date,PostImage ) => {
    const editPost = async (formdata) => {
    // API Call 
    console.log(formdata)
    const response = await fetch(`${host}/posts/${formdata.get('id')}`, {
      method: 'PUT',
      headers: {
        // 'Content-Type': 'application/json',
        authorization:"Bearer "+localStorage.getItem("token")
      },
      // body: JSON.stringify({name, location ,likes,description, date,PostImage })
      body:formdata
    });
    const json = await response.json(); 
    console.log(response.data)
    const data=response.data;
     let newPosts = JSON.parse(JSON.stringify(posts))
    // Logic to edit in client
    console.log(posts)
    for (let index = 0; index < newPosts.length; index++) {
      const element = newPosts[index];
      // if (element._id === id) {
        if (element._id === data.get('id')) {
        // newPosts[index].name= name;
        // newPosts[index].location =location;
        // newPosts[index].likes = likes;
        // newPosts[index].description = description;
        // newPosts[index].date = date;
        // newPosts[index].PostImage= PostImage; 
        newPosts[index].name= data.get('ename');
        newPosts[index].location =data.get('elocation');
        newPosts[index].likes = data.get('elikes')
        newPosts[index].description =data.get('edescription')
        newPosts[index].date = data.get('edate')
        newPosts[index].PostImage= data.get('ePostImage')
        break; 
      }
    }  
    setPosts(newPosts);
  }

  return (
    <PostContext.Provider value={{ posts, addPost, deletePost, editPost, getPosts }}>
      {props.children}
    </PostContext.Provider>
  )

}
export default Poststate;