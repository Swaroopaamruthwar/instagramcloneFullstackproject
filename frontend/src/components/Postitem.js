import React, { useContext,useState } from 'react'
import PostContext from "../context/posts/postContext"
import { BsSuitHeart } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import Moment from 'react-moment';
import '../App.css'
const Noteitem = (props) => {
    const context = useContext(PostContext);
    const { deletePost } = context;
    const { post, updatePost, idx } = props;
    return (
        <div className="body">
            <div className="body-content">
                <div className="card-datails">
                    <div className="info top">
                        <div className=" card-top name-location">
                            <span key={idx}><strong>{post.name}</strong></span>
                            <span key={idx} className="location">{post.location}</span>
                        </div>
                        <div className="card-top three-dots" >
                            <i className="far fa-trash-alt mx-2" onClick={() => { deletePost(post._id) }}></i>
                            <i className="far fa-edit mx-2" onClick={() => { updatePost(post) }}></i>
                        </div>
                    </div>
                    <div className="info middle">
                        <p key={idx.idx}><img src={post.PostImage_url} alt="img" ></img></p>
                    </div>
                    <div className="info middle-bottom">
                        <div className="middle-bottom-left">
                            <div className=" icon heart-icon">
                                <div className="likes">
                                    <span className="btn1"><BsSuitHeart /></span>
                                </div>
                                <div className="likes-number">
                                    <p key={idx}>{post.likes} likes</p>
                                </div>
                            </div>
                            <div className="icon">
                                <span className="btn1"><FiSend /></span>
                            </div>
                        </div>
                        <div className="middle-bottom-right">
                            <p>{<Moment format="YYYY/MM/DD">{post.date}
                        </Moment>}</p>
                        </div>
                    </div>


                    <div className="info bottom">
                        <p key={idx}>{post.description}</p>
                    </div>


                </div>
            </div>

        </div>
    )
}

export default Noteitem






































