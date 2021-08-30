import React from 'react';
import firebase from '../Firebase'
import './Main.css';
import Firebase from "firebase";
import 'firebase/auth';

function MainRoute() {
    const auth = Firebase.auth();
    var googleProvider = new Firebase.auth.GoogleAuthProvider();
    const signInWithGoogle = () => {
    auth.signInWithPopup(googleProvider).then((res) => {
        console.log(res.user)
    }).catch((error) => {
        console.log(error.message)
    })
    }
    return (
        <div className="Main-Main"> 
            <div className = "NavBar-Main">
                <div style={{display: "inline", width:"50px", marginTop: "auto", marginBottom: "auto"}}>
                    <b className="StartName">Education Engage</b>
                    <div className = "lightText">
                        <b>Discussion</b> 
                    </div>
                </div>
            </div >
            <div className="Start-Main">
                <h1 style={{fontSize: "35px", color: "#FF4454"}}>Hey! Dude</h1>{'\n'}
                <h1 style={{fontSize: "20px"}}>Let's make education simple</h1>{'\n\n'}
                <div style={{maxWidth: "400px"}}>
                    Sign in our website and ask all your doubts with your college students and professors
                </div>
                {'\n\n'}
                {firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        console.log("Logged in :)")
                        window.location = "/discussion"
                    } else {

                    }
                })}
                <img style={{marginBottom: "30px"}} onClick={()=>{signInWithGoogle()}} src="https://developers.google.com/identity/images/btn_google_signin_light_normal_web.png" alt="Logo" height="45px" />
            </div>
            <div>
            </div>
        </div>
    )
    }

    export default MainRoute;