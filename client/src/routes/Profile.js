import React, { useEffect, useState } from 'react';
import firebase from '../Firebase';
import './Profile.css'
function Profile() {
    const [User, setUser] = useState({ "email": "Loading...", "displayName": "Loading...","photoURL": "https://www.drupal.org/files/styles/drupalorg_user_picture/public/default-avatar.png?itok=ZYxnS__Q" });
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                setUser(user);
                console.log(user)
            } else {
                // No user is signed in.
                window.location="/"
                console.log('There is no logged in user');
            }
        });
    }, []);
    return (
        <div className = "main-profile">
            <div className = "navbar-profile">
                <div style={{display: "inline", marginTop: "auto", marginBottom: "auto"}}>
                    <b>Education Engage</b>
                    <div className = "lightText-profile">
                        <b> Discussion</b> 
                    </div>
                </div>
                
                <button className="discussion-button"
                onClick={
                    ()=>{window.location="/discussion"}
                }
                >Back to Discussion</button>
            </div>

            <div className="dummy">
            </div>
            <div className="profile-container">
                <img src={User.photoURL}
                    alt="Profile"
                    height="100px" 
                    style={{borderRadius: "100%"}}  />
                <h1>Profile Details{'\n'}</h1>
                <div style={{textAlign: "left"}}>
                    {'\n'}<b>Name:</b>
                    <div style={{opacity: "0.8"}}>{User.displayName}</div>
                    {'\n'}<b>Email:</b>
                    <div style={{opacity: "0.8"}}>{User.email+'\n\n'}</div>
                </div>
                <button onClick={()=>{
                        firebase.auth().signOut().then(() => {
                            window.location = "/"
                        }).catch((error) => {
                            alert(error)
                        })
                    }
                } className="Post-Profile">Sign Out</button> 
            </div>
        </div>
    )
}

export default Profile;