import '../App.css'
import React,{useContext}from 'react';
import { FiCamera } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import { BsSuitHeart } from "react-icons/bs";
import { FaInstagramSquare } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import axios from "axios";
import PostContext from "../context/posts/postContext"
const Render = (props) => {
  // const [post, setPost] = useState([])
  const context = useContext(PostContext);
  const { deletePost } = context;
  const { post, updatePost ,idx} = props;
  //const authtoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2MjFjMTM5NWU3YjViZmU0ZDY2YzZiIn0sImlhdCI6MTY1MDYwMTMxNX0.B3chy7wIyaUXppbRE8qzR2Gy8yFUxA7uIIqtLJU8dB0"
  // const getUsers = async () => {
  //   response=await axios.get(`http://localhost:5000/posts`,{
  //     headers:{
  //       Autherization:'Bearer '+token
  //     }

  //   }).then((res)=>{
  //     console.log('Axios',res)
  //     res=res.json()
  //     setPost(res.data.data);
  //   })


  // }
  // useEffect(() => {
  //   // getUsers();
  //   axios.get(`https://instaclone-nodejs.herokuapp.com/posts`, {
  //     headers: {
  //       Authorization: 'Bearer ' + authtoken
  //     }

  //   }).then((res) => {
  //     debugger
  //     console.log('Axios', res)
  //     setPost(res.data.posts);
  //   })
  //   // eslint-disable-next-line
  // }, [])
  return (
    <div className="site-container">
      <div className='header'>
        <div className='left-nav'>
          <div className="logo loop">
            <span ><FaInstagramSquare /></span>
          </div>
          <div className="logo logo-name">
            Instaclone
          </div>

        </div>
        <div className="right-nav">
          <span><FiCamera /></span>
        </div>
      </div>
      <div className="body">
        <div className="body-content">
          <div className="card-datails">
            <div className="info top">
              <div className=" card-top name-location">
                <span key={idx}><strong>{post.name}</strong></span>
                <span key={idx} className="location">{post.location}</span>
              </div>
              <div className="card-top three-dots" >
                <BsThreeDots />
                <i className="far fa-trash-alt mx-2" onClick={()=>{deletePost(post._id)}}></i>
                <i className="far fa-edit mx-2" onClick={()=>{updatePost(post)}}></i>
              </div>
            </div>
            <div className="info middle">
              <p key={idx}><img src={post.PostImage} alt="img" ></img></p>
            </div>
            <div className="info middle-bottom">
              <div className="middle-bottom-left">
                <div className=" icon heart-icon">
                  <div className="likes">
                    <span className="btn"><BsSuitHeart /></span>
                  </div>
                  <div className="likes-number">
                    <p key={idx}>{post.likes} likes</p>
                  </div>
                </div>
                <div className="icon">
                  <span className="btn"><FiSend /></span>
                </div>
              </div>
              <div className="middle-bottom-right">
                <p key={idx}>{post.date}</p>
              </div>
            </div>


            <div className="info bottom">
              <p key={idx}>{post.description}</p>
            </div>


          </div>
        </div>

      </div>
    </div>
  );
}

export default Render;
