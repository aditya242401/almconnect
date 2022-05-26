import { Routes ,Route} from 'react-router-dom';
import './App.css';
import Index from './components/Index';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Logout from './components/Logout';
import Profile from './components/Profile';
import AdminIndex from './components/Admin/AdminIndex';
import AdminHome from './components/Admin/AdminHome';
import AdminLogout from './components/Admin/AdminLogout';
import AdminAddCollege from './components/Admin/AdminAddCollege';
import FindConnections from './components/FindConnections';
import Notifications from './components/Notifications';
import EditProfile from './components/EditProfile';
import AddEducation from './components/AddEducation';
import Pages from './components/Pages';
import UploadProfilePicture from './components/UploadProfilePicture';
import AddPage from './components/AddPage';
import DefaultPage from './components/DefaultPage';
import SinglePost from './components/SinglePost';
import Messages from './components/MessageComponent/Messages';

function App() {
  return (
    <>
      <Routes>
        {/* User Module */}
        <Route path='/' element={<Index/>} exact></Route>
        <Route path='/Signup' element={<Signup/>}></Route>
        <Route path='/Home' element={<Home/>}></Route>
        <Route path='/Profile/:loginid' element={<Profile/>}></Route>
        <Route path='/Profile/' element={<Profile/>}></Route>
        <Route path='/Logout' element={<Logout/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/UploadProfilePicture' element={<UploadProfilePicture/>}></Route>
        <Route path='/FindConnections' element={<FindConnections />}></Route>
        <Route path='/Notifications' element={<Notifications />}></Route>
        <Route path='/Notifications' element={<Notifications />}></Route>
        <Route path='/EditProfile' element={<EditProfile/>}></Route>
        <Route path='/AddEducation' element={<AddEducation/>}></Route>
        <Route path='/Pages' element={<Pages/>}></Route>
        <Route path='/AddPage' element={<AddPage/>}></Route>
        <Route path='/Page/:pageid' element={<DefaultPage/>}></Route>
        <Route path='/Post/:postid' element={<SinglePost/>}></Route>

        <Route path='/Messages' element={<Messages/>}></Route>
        <Route path='/Messages/:id' element={<Messages/>}></Route>


        {/* Admin Module */}
        {/* <Route path="/Admin" element={<AdminIndex />}></Route>
        <Route path="/Admin/Home" element={<AdminHome />}></Route>
        <Route path="/Admin/Logout" element={<AdminLogout />}></Route> 
        <Route path="/Admin/AddCollege" element={<AdminAddCollege />}></Route>  */}
        <Route path='*' element={<><h1>404 NOT FOUND</h1> <a href='/'>Go to Home</a></>}/>
      </Routes>
    </>
  );
}

export default App;