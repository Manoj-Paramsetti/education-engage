import React, { useEffect, useState } from 'react';
import firebase from '../Firebase'
import './Answers.css';
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

function AnswerRoute() {
    const [User, setUser] = useState({ "email": "Loading...", "photoURL": "https://www.drupal.org/files/styles/drupalorg_user_picture/public/default-avatar.png?itok=ZYxnS__Q" });
    const [Answers, setAnswer] = useState([]);
    const [Question, setQuestion] = useState([{question:"", email : "Loading.."}]);
    const [AnswerStatus, setAnswerStatus] = useState("No answers");

    const id = window.location.pathname.split('/').pop()

    useEffect(() => {
        const id = window.location.pathname.split('/').pop()
    
        const qid = {
            qid: id,
            master: process.env.REACT_APP_MASTER_API_KEY
         }
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                setUser(user);
            } else {
                // No user is signed in.
                window.location = "/";
                console.log('There is no logged in user');
            }
        });

        axios.post("https://educationengage.herokuapp.com/answer/getans/"+process.env.REACT_APP_API_KEY, qid)
            .then(res => {
                setAnswer(res.data)
                if (res.data.length !== 0){
                    setAnswerStatus("Answers")
                }
            }, (error) => {
                console.log(error);
            })
        axios.post("https://educationengage.herokuapp.com/question/id/"+process.env.REACT_APP_API_KEY, qid)
        .then(res => {
            if (res.data.length !== 0){
                setQuestion(res.data)
            }
        }, (error) => {
            console.log(error);
        })

    }, []);
    let textInput = React.createRef();

    function handleClick() {
        const addAnswer ={
            qid: id,
            answer: textInput.current.value,
            email: User.email,
            username: User.displayName,
            photo: User.photoURL,
            master: process.env.REACT_APP_MASTER_API_KEY
        }
        axios.post("https://educationengage.herokuapp.com/answer/add/"+process.env.REACT_APP_API_KEY, addAnswer)
          .then(res => {
              if (res.data.length !== 0){
                    setAnswerStatus("Answers")
                    const qid = {
                            qid: id,
                            master: process.env.REACT_APP_MASTER_API_KEY
                    }
                    axios.post("https://educationengage.herokuapp.com/answer/getans/"+process.env.REACT_APP_API_KEY, qid)
                    .then(res => {
                        setAnswer(res.data)
                        if (res.data.length !== 0){
                            setAnswerStatus("Answers")
                        }
                    }, (error) => {
                        console.log(error);
                    })
                }
            }, (error) => {
              console.log(error);
        })
    }

    return ( 
        <div className="main-answer"> 
            <div className = "navbar-answer">
                <div onClick={()=>{window.location="/discussion"}} 
                style={{display: "inline", marginTop: "auto", marginBottom: "auto"}}>
                    <b>Education Engage</b>
                    <div className = "lightText-answer">
                        <b> Discussion</b> 
                    </div>
                </div>
                <img src={User.photoURL}
                alt="Profile" 
                style={{borderRadius: "100%", marginRight: "20px",marginTop: "auto", marginBottom: "auto"}} height="30px" onClick={()=>{
                    window.location = '/profile'
                    }} />
                         
            </div >
            
            <div className="dummy">
            </div>
            
            <div className = "questionDisplay-discuss">
                <div style={{ width: "100%",display: "flex", alignItem: "center" }}>
                    <img alt="Profile" src={Question[0].photo} style={{borderRadius: "100%", marginTop: "auto", marginBottom: "auto"}} height="30px" />
                    <div style={{display: "block"}}>
                        <b>  {Question[0].username}</b>   
                        <div className = "lightTextSmall"> 
                            {'  '}{Question[0].date}
                        </div> 
                    </div> 
                </div>
                {'\n'}
                <div className = "lightTextSmall"> 
                    Question
                </div>
                <h3 style={{color: "#ee5253"}}>{Question[0].question}</h3>
                <div className = "lightTextSmall"> 
                    Asked by {
                        Question[0].email
                    }
                </div>
            </div>

            <div className = "questionDisplay-discuss">
                {AnswerStatus}
            </div>

            <div style={{ borderBottomColor: 'black', borderBottomWidth: 1, }} />
            {            
                Answers.map((data) => {
                    return (
                        <div className = "questionDisplay">
                            <div style={{ width: "100%",display: "flex", alignItem: "center" }}>
                                <img alt="Profile" src={data.photo} style={{borderRadius: "100%", marginTop: "auto", marginBottom: "auto"}} height="30px" />
                                <div style={{display: "block"}}>
                                    <b>  {data.username}</b>   
                                    <div className = "lightTextSmall"> 
                                        {'  '}{data.date}
                                    </div> 
                                </div> 
                            </div>

                            <div className = "lightTextSmall"> 
                                {'\n'}Answer
                            </div>
                            <h4 className="Links">{data.answer}</h4>   
                            
                            <div className = "lightTextSmall"> 
                                {'\n'}Answered by {
                                    data.email
                                }
                            </div>
                        </div>
                    )
                })
            }
            <div className = "questionTaker">
                <div style={{display: "flex", justifyContent: "space-between", marginLeft:-20+"px", marginRight:80+"px", alignItem: "center", paddingLeft:20+"px"}}>
                    <div style={{display: "block"}}>
                        <div style={{ width: "100%",display: "flex", alignItem: "center" }}>
                            <img alt="Profile" src={User.photoURL} style={{borderRadius: "100%", marginTop: "auto", marginBottom: "auto"}} height="30px" />
                            <div style={{display: "block"}}>
                                <h3> Post an answer</h3>   
                                <div className = "lightTextSmall"> 
                                    {'  '}{User.email}
                                </div> 
                            </div> 
                        </div> 
                    </div>
                </div>
                <textarea  type = 'text' placeholder="Type your question..." className="inputQuestion" ref = { textInput }/> 
                <input type = 'submit' onClick={handleClick} className="Post" value = "Post" /> 
            </div>   
            
            <div className="dummy">
            </div>  
        </div>
    )
}

export default AnswerRoute;
