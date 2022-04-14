import React ,{useEffect,useState} from 'react';
import {useCookies} from 'react-cookie';
import axios from "axios";
import css from "./style.css";
import AddIcon from "@material-ui/icons/Add";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import EditIcon from "@material-ui/icons/Edit";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EditProfile from "./EditProfile";
import Chat from "./Chat";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import LockIcon from "@material-ui/icons/Lock";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Feed from "./Feed";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import PopUp from "./PopUp";

function Profile(props) {
  const [profileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1618721405821-80ebc4b63d26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZmVtYWxlJTIwbW9kZWx8ZW58MHx8MHx8&w=1000&q=80"
  );
  const[userId,setuserId] = useState('');
  const [cookies,removeCookies] = useCookies([]);
  const [userPassion,setUserPassion] = useState([]);
  const [userData, setuserData] = useState({
    name: "",
    age:"",
    bio: "",
  });
  useEffect(()=>{
    const verifyUser = async ()=>{
      if(!cookies.jwt){
        // try to redirect to profile page...
        console.log("No cookie");
        return props.onChecked("login");
      }
      else{
        const {data} = await axios.post("http://localhost:5000",{},{withCredentials:true});
        //data
        console.log(data.user._id);
        setuserId(data.user._id);
        if(!data.status){
          removeCookies("jwt")
          // try to redirect to profile page...
          console.log("error cookie");
          return props.onChecked("login");
        }
        else{
          console.log("u r in profile page");
          console.log(data.user.name);
          console.log(data.user.tags);
          setuserData(()=>{
            return{
              name : data.user.name,
              age : data.user.age,
              bio : data.user.about
            }
          })
          setUserPassion([]);
          setProfileImage([]);
          setProfileImage([data.user.uploadedimg[0].imgUrl]);
          data.user.tags.map((item,index)=>{
              return(
                setUserPassion((prevValue)=>{
                  return[...prevValue,
                  item
                ]
                })
              )
          })
          console.log(" this is c k",userPassion);
        }
      }
    };
    verifyUser();
  },[cookies,removeCookies]);


  const getProfileData = async ()=>{
    if(!cookies.jwt){
      // try to redirect to profile page...
      console.log("No cookie");
      return props.onChecked("login");
    }
    else{
      const {data} = await axios.post("http://localhost:5000",{},{withCredentials:true});
      //data
      console.log(data.user._id);
      setuserId(data.user._id);
      if(!data.status){
        removeCookies("jwt")
        // try to redirect to profile page...
        console.log("error cookie");
        return props.onChecked("login");
      }
      else{
        console.log("u r in profile page");
        console.log(data.user.name);
        console.log("under sur");
        console.log(data.user.tags);
        console.log("undr sur");
        setuserData(()=>{
          return{
            name : data.user.name,
            age : data.user.age,
            bio : data.user.about
          }
        })
        setUserPassion([]);
        setProfileImage([]);
        setProfileImage([data.user.uploadedimg[0].imgUrl]);
        data.user.tags.map((item,index)=>{
            return(
              setUserPassion((prevValue)=>{
                if(userPassion.length<=5){
                return[...prevValue,
                item
              ]
            }
              })
            )
        })
      }
    }
  }


  

  const [show, setShow] = useState({
    Profile: true,
    EditProfile: false,
    Feed: false,
    Chat:false
  });

  function handleShow(value) {
    setShow(() => {
      if (value === "profile") {
        return {
          Profile: true,
          EditProfile: false,
          Feed: false,
          Chat:false
        };
      } else if (value === "editprofile") {
        return {
          Profile: false,
          EditProfile: true,
          Feed: false,
          Chat:false
        };
      } else if (value === "feed") {
        return {
          Profile: false,
          EditProfile: false,
          Feed: true,
          Chat:false
        };
      }else if (value === "chat") {
        return {
          Profile: false,
          EditProfile: false,
          Feed: false,
          Chat:true
        };
      }
    });
  }
  function handleEditprofile() {
    setShow({
      profile: false,
      EditProfile: true,
      Feed: false,
    });
  }
  function redirect(e){
    if(e==="GO") return props.onChecked("login");
  }
  return (
    <>
      <div className="sideBartoo">
       { show.Chat ? null :  <Sidebar
          name={userData.name}
          image={profileImage}
          onShow={handleShow}
          id={userId}
          bcLog = {redirect}
        /> }
        {show.Profile ? (
          <>
            <div className="profile">
              <div className="upper">
                <h3>PROFILE</h3>
                <div className="profilechild">
                  {profileImage ? (
                    <img src={profileImage} alt="pic" id={userPassion.length===0 ? "incHeight" : null} />
                  ) : (
                    <img
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      alt="blank"
                      id={userPassion.length===0 ? "incHeight" : null}
                    />
                  )}
                  <div className="dataStyle">
                    {userData ? (
                      <p>
                        <b>{userData.name}</b> {userData.age}
                      </p>
                    ) : null}
                  </div>
                  {userData.bio ?
                  <div className="dataStyle">
                 <p>{userData.bio}</p>
                  </div>
                    : null}
                  { userPassion.length!=0 ? 
                  <div className="dataStyle like">
                    <h4>Passion</h4>
                    {userPassion.map((obj,index) => {
                      return <span> {userPassion[index]} </span>;
                    })}
                  </div> : null
                  }
                </div>
                <button className="pbtn" onClick={handleEditprofile}>
                  Edit Profile
                </button>
              </div>
            </div>
          </>
        ) : null}
        {show.EditProfile ? <EditProfile change={handleShow} idx={userId} call={getProfileData}
        /> : null}
        {show.Feed ? (
          <Feed
            name={userData.name}
            age={userData.age}
            bio={userData.bio}
            id={userId}
          />
        ) : null}
        {show.Chat ? <Chat /> : null}
      </div>
    </>
  );
}

export default Profile;
