import React, {useState} from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import '../stylesheets/main.css';
import homeIcon from '../images/home.png';
import profileIcon from '../images/profileIcon.png';
import chatIcon from '../images/chatIcon.png';
import logout from '../images/logout.png';
import Tabs from "./Tabs.jsx";
import TabNavItem from "./Components/TabNavItem.jsx";
import Axios from 'axios';

    
export default function Main() {
    const [activeTab, setActiveTab] = useState("tab1");
    
    const navigate = useNavigate();
    const location = useLocation();
    const userData = location.state;



    const handleLogOut = async () => {
		Axios.post('/api/user/logout', { username: userData.username })
			.then((response) => {
				navigate('/');
			})
	};



   

    return (
        <div className='background'>
        <div id="main-container">
            <a className="button" href="" onClick={handleLogOut}>
                <img src={logout} style={{width:'30px'}}/>
                <div className="logout">LOGOUT</div>
            </a>
            <button className="logout-btn" onClick={handleLogOut}>Logout</button>
                <Tabs userData={userData} activeTab={activeTab}/>
            <ul className="nav">
                <TabNavItem title={homeIcon} id="tab1" activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabNavItem title={chatIcon} id="tab2" activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabNavItem title={profileIcon} id="tab3" activeTab={activeTab} setActiveTab={setActiveTab}/>
            </ul>
        </div>
    </div>
       
    )
}















