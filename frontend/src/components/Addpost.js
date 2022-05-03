import React, { useContext, useState } from 'react'
import postContext from "../context/posts/postContext"
import '../Post.css'
const AddPost = () => {
    const context = useContext(postContext);
    const { addPost } = context;
    const [post, setPost] = useState({ name: "", location: "", likes: "", description: "", date: "", PostImage: "" })
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    const handleClick = async (e) => {
        e.preventDefault();
        const formdatas = new FormData();
        // formdatas.append('file',image)
        formdatas.append('name', post.name)
        formdatas.append('location', post.location)
        formdatas.append('likes', post.likes)
        formdatas.append('description', post.description)
        formdatas.append('date', post.date)
        formdatas.append('PostImage', image)
        console.log(image.name)
        // formdata.set('upload_preset','insta clone')
        // formdata.set('cloud_name','swaroopa')
        // const res =await fetch(`https://api.cloudinary.com/v1_1/swaroopa/image/upload`,{
        //     method:"POST",
        //     body:formdata
        // })
        // const result=await res.json();
        // console.log(result.url)
        // const urlvalue=(result.url)
        // setUrl(urlvalue)
        // console.log(url)
        // addPost(post.name,post.location ,post.likes,post.description,post.date,image.name);
        addPost(formdatas);

        //addPost(formData);
        setPost({ name: "", location: "", likes: "", description: "", date: "", PostImage: "" })
        window.location.reload(false);

    }

    const FileChange = (e) => {
        //setPost({...post,[e.target.name]: e.target.files[0]})
        setImage(e.target.files[0])
        console.log(e.target.files)

    }
    // const Postclick=(e)=>{
    //     const formdata =new FormData();
    //     formdata.set('file',image)
    //     formdata.set('upload_preset','insta clone')
    //     formdata.set('cloud_name','swaroopa')
    //     console.log(formdata)
    //     fetch(`https://api.cloudinary.com/v1_1/swaroopa/image/upload`,{
    //         method:"POST",
    //         body:formdata
    //     }).then((response)=>response.json())
    //     .then(data=>{setUrl(data.url)})
    //     .catch(err=>{
    //         console.log(err)
    //     })
    // }

    const onChange = (e) => {
        // const value=(name==="PostImage")?event.target.files[0]:event.target.value;
        // post.PostImage.set(name,value)
        setPost({ ...post, [e.target.name]: e.target.value })
    }




    return (
        <div className="body1">
            <div className="container2 cont" >
                <h2 className="cont1" >Add a Post</h2>
                <form className="form cont1" enctype="multipart/form-data">
                    <div className="field">
                        <label htmlFor="title" className="f1">Name</label>
                        <input type="text" className="input in1 f1" id="name" name="name" placeholder="please enter name" aria-describedby="emailHelp" value={post.name} onChange={onChange} minLength={5} />
                    </div>
                    <div className="field">
                        <label htmlFor="location" className="f1">Location</label>
                        <input type="text" className="input in1 f1" id="location" name="location" placeholder="please enter location" value={post.location} onChange={onChange} />
                    </div>
                    <div className="field">
                        <label htmlFor="likes" className="f1">Likes</label>
                        <input type="text" className="input in1 f1" id="likes" name="likes" value={post.likes} placeholder="please enter likes" onChange={onChange} />
                    </div>
                    <div className="field">
                        <label htmlFor="description" className="f1">Description</label>
                        <input type="text" className="input in1 f1" id="description" name="description" value={post.description} placeholder="please enter description" onChange={onChange} />
                    </div>
                    <div className="field">
                        <label htmlFor="date" className="f1">Date</label>
                        <input type="date" className=" input  f1 file" id="date" name="date" value={post.date} onChange={onChange} />

                    </div>
                    <div className="field">
                        <label htmlFor="PostImage" className="f1">PostImage</label>
                        <input type="file" className="input f1 " id="PostImage" filename="PostImage" onChange={(e) => { FileChange(e) }} />
                    </div>
                    <button type="submit" className="btn btn-primary btn" onClick={handleClick}>submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddPost
// disabled={post.title.length<5 || post.description.length<5} 