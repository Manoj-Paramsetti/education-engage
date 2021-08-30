import React, { useEffect, useState } from 'react';
import firebase from '../Firebase'
import './Discuss.css';
import axios from "axios";
import { Link } from "react-router-dom";
import dotenv from "dotenv";

dotenv.config();

function Discuss() {

    const [User, setUser] = useState({ "email": "Loading...", "photoURL": "https://www.drupal.org/files/styles/drupalorg_user_picture/public/default-avatar.png?itok=ZYxnS__Q" });
    const [Question, setQuestion] = useState([]);
    const [QuestionStatus, setQuestionStatus] = useState("Question not found");

    useEffect(() => {

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                setUser(user);
            } else {
                console.log('There is no logged in user');
                window.location = "/";
            }
        });
        axios.post("https://educationengage.herokuapp.com/question/get/"+process.env.REACT_APP_API_KEY,
            {master: process.env.REACT_APP_MASTER_API_KEY})
            .then(res => {
                setQuestion(res.data.reverse())
                if (res.data.length !== 0) {
                    setQuestionStatus("Questions")
                }
            }, (error) => {
                console.log(error);
            })

    }, []);

    function updateQuestions() {
        axios.post("https://educationengage.herokuapp.com/question/get/"+process.env.REACT_APP_API_KEY, 
            {master: process.env.REACT_APP_MASTER_API_KEY})
            .then(res => {
                setQuestion(res.data.reverse())
                if (res.data.length !== 0) {
                    setQuestionStatus("Questions")
                }
            }, (error) => {
                console.log(error);
            })
    }

    let textInput = React.createRef();

    function handleClick() {
        const addQuestion = {
                question: textInput.current.value,
                email: User.email,
                photo: User.photoURL,
                username: User.displayName,
                master: process.env.REACT_APP_MASTER_API_KEY
            }
            // called once 
        axios.post("https://educationengage.herokuapp.com/question/add/" + process.env.REACT_APP_API_KEY, addQuestion)
            .then(res => {
                updateQuestions();
            }, (error) => {
                console.log(error);
            })
    }

    return ( 
        <div className = "Main-Discuss">
            <div className = "navbar-discuss">
                <div style={{display: "inline", marginTop: "auto", marginBottom: "auto"}}>
                    <b>Education Engage</b>
                    <div className = "lightText-discuss">
                        <b> Discussion</b> 
                    </div>
                </div>
                <img src={User.photoURL} alt="Profile" 
                    style={{borderRadius: "100%", marginRight: "25px",marginTop: "auto", marginBottom: "auto"}} height="30px" onClick={()=>{
                        window.location = '/profile'
                    }
                } />
            </div>

            <div className = "search">
                <form onSubmit = { handleClick }>
                    <input type = 'text'/>
                    <input type = 'submit' value = "Search" />
                </form> 
            </div>

            <div className = "questionTaker-discuss">
                <div style={{ width: "100%",display: "flex", alignItem: "center" }}>
                    <img src={User.photoURL} alt="Profile" style={{borderRadius: "100%", marginTop: "auto", marginBottom: "auto"}} height="30px" />
                    <div style={{display: "block"}}>
                        <h3 style={{color: "#ee5253"}}>  Post a question</h3>   
                        <div className = "lightTextSmall"> 
                            {
                                '  '+User.email
                            }
                        </div> 
                    </div>
                </div>
                <textarea  type = 'text' placeHolder="Type your question..." className="inputQuestion-discuss" ref = { textInput }/> 
                <button className="Post-Question" onClick={ handleClick }>Post</button>
            </div>

            <div className = "questionDisplay-discuss">
            {QuestionStatus}
            </div>

            <div className = "displayQuestion"> 
                {   
                    Question.map((data) => {
                        return (
                            <div className = "questionDisplay-discuss">

                                <div style={{display: "flex"}}>
                                    <img src={data.photo} alt="Profile" style={{borderRadius: "100%"}} height="30px" />
                                    <b style={{marginTop: "auto", marginBottom: "auto"}}> {data.username+"\n\n"}</b>
                                </div>
                                
                                <Link to={`/discussion/q/${data._id}`}  style={{ textDecoration: 'none' }}>
                                <h3 className="Links-discuss">{data.question}</h3>   
                                </Link>
                                
                                <div className = "lightTextSmall"> 
                                    Asked by {
                                        data.email
                                    }
                                </div>
                                
                                <div style={{fontSize: "12px"}}>
                                    <b><p>{'\n\n'+data.date}</p></b>
                                </div>
                            </div>
                        );  
                    })
                } 
            </div>

            <div className="dummy">
            </div> 
        </div>
    )
}

export default Discuss;