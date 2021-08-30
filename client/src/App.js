import { Route } from "react-router-dom";
import DiscussRoute from './routes/Discuss';
import AnswerRoute from './routes/Answer';
import MainRoute from './routes/Main';
import ProfileRoute from './routes/Profile';
import './App.css'

function App() {
    return ( 
        <div className = "App">
            <Route exact path = "/" component = { MainRoute }/>  
            <Route exact path = "/profile" component = { ProfileRoute }/>  
            <Route exact path = "/discussion" component = { DiscussRoute }/> 
            <Route path = { '/discussion/q/:topicId' }component = { AnswerRoute }/> 
        </div >
    );
}


export default App;