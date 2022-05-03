import React, { useContext, useEffect, useRef, useState } from 'react'
import PostContext from "../context/posts/postContext";
import Postitem from './Postitem';
import Addpost from './Addpost';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../App.css';
import '../Post.css'
import '../updatepost.css'
const Posts = () => {
    const navigate = useNavigate();
    const context = useContext(PostContext);
    const { posts, getPosts, editPost } = context;
    useEffect(() => {
        if(localStorage.getItem("token")){
            getPosts()
        }
        else{
            navigate('/login')
        }
        
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [updateimg,setupdateimg]=useState("")
    const [post, setPost] = useState({id: "",ename: "", elocation:"" ,elikes:"",edescription: "", edate:"",ePostImage: ""})

    const updatePost = (currentPost) => {
        ref.current.click();
        setPost({id: currentPost._id, ename: currentPost.name, elocation:currentPost.location,elikes:currentPost.likes, edescription: currentPost.description, ePostImage:currentPost.PostImage})

    }

    const handleClick = (e)=>{ 
        const formdata =new FormData();
        console.log(updateimg)
        formdata.append('id',post.id)
        formdata.append('ename',post.ename)
        formdata.append('elocation',post.elocation)    
        formdata.append('elikes',post.elikes)    
        formdata.append('edescription',post.edescription)
        formdata.append('edate',post.edate)
        formdata.append('ePostImage',updateimg)

        // editPost(post.id, post.ename, post.elocation,post.elikes, post.edescription,post.edate,updateimg)
        editPost(formdata)
        window.location.reload(false);
        refClose.current.click();
    }
    const FileChange=(e)=>{
        //setPost({...post,[e.target.name]: e.target.files[0]})
        setupdateimg(e.target.files[0])
        console.log(e.target.files)

    }
    const onChange = (e)=>{
        setPost({...post, [e.target.name]: e.target.value})
    }

    return (
        <>
         <Navbar/>
            <Addpost />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-name" id="exampleModalLabel">Edit Posts</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form  enctype="multipart/form-data">
                        <div  >
                                <label htmlFor="title" >Name</label>
                                <input type="text" className="input2" id="ename" name="ename" value={post.ename} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                        </div>
                                <div className="field">
                                    <label htmlFor="location" >Location</label>
                                    <input type="text"id="elocation" className="input2" name="elocation" value={post.elocation} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="field">
                                    <label htmlFor="likes" >Likes</label>
                                    <input type="text"  id="elikes"  className="input2" name="elikes" value={post.elikes} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="field">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text"  id="edescription" className="input2"name="edescription" value={post.edescription} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="field">
                                    <label htmlFor="date" className="form-label">Date</label>
                                    <input type="date" className="input2" id="edate" name="edate"  onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="field">
                                    <label htmlFor="PostImage" >PostImage</label>
                                    <input type="file" id="ePostImage" className="input2"  name="ePostImage" onChange={FileChange} />
                                </div>
                          </form>
                    
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="battn" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="battn">Update Post</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row  body">
                <h2 className="heading">You Posts</h2>
                <div className="container mx-2"> 
                {posts.length===0 && <div className="div"><i>No posts to display</i></div>}
                </div>
                {/* {posts.posts} */}
                {posts.map((post,idx) => {
                    return <Postitem key={post._id} updatePost={updatePost} post={post} idx={idx}/>

                })}
            </div>
        </>
    )
}

export default Posts
























