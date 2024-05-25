import { useNavigate } from "react-router-dom"
import axios from "axios";

function Home() {
    // const navigate = useNavigate();

    // const handleClick = (e) => {
    //     window.localStorage.removeItem("name");
    //     window.localStorage.removeItem("token");
    //     navigate("/login");
    // }
    // const username =  window.localStorage.getItem("name");
    // const token =  window.localStorage.getItem("token");
    // console.log(username)

    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwaHVvY0BnbWFpbC5jb20iLCJpYXQiOjE2ODYyODc5NzIsImV4cCI6MTY4NjM3NDM3Mn0.k1VpWI8O6L2xvHSiHVyckr68piUIfGujS42Yoy76Lqo'
    const url = "http://localhost:8080/api/v1/books/delete?bookId=8"
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    
    
    axios.delete(url, config)
    .then(res => console.log(res))
    .catch(err => console.log(err))



    return(
        <div>
            Home
            {/* <div>{username}</div>
            <div>{token}</div>
            <button onClick={(e) => handleClick(e)}>Back</button> */}
        </div>
    )
}

export default Home;