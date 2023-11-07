import { Favorite, ShoppingCartOutlined } from '@material-ui/icons'
import { Badge } from '@material-ui/core';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, {useState} from 'react'
import styled from 'styled-components'
import Dropdown from './Dropdown/Dropdown';
import { useNavigate } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import "./Navbar.css"


const Container = styled.div`
    height:70px;
    background-color:var(--mainColor);


`;
const Wrapper = styled.div`
    padding-top:1%;
    padding-left:1%;
    padding-right:1%;
    display: flex;
    align-items:center;



`;
const Center =styled.ul`
margin:auto;
display: flex;
justify-content:center;
`;


const Menuitem =styled.li`
padding-left:15px;
font-size:25px;
color:white;
list-style:none;
text-decoration:none;

&:hover {
    color:var(--watercolor);
    cursor: pointer;
    background-color:var(--hoverColor);


}`;




const Logo =styled.div`
margin:auto;
display:flex;


`;
const LogoText =styled.div`

color:white;
font-size:30px;
font-weight:bold;
padding-top:2px

`;

const Right =styled.div`
display:flex;
color:white;
&:hover {
    color:var(--watercolor);
    cursor: pointer;


}
`;
const Left =styled.div`
`;
const Icon=styled.div`
width:35px;
height:35px;
border-radius:50%;
background-color:white;
display:flex;
justify-content:center;
align-items:center;
 /* margin:10px;  */
color:var(--mainColor);
&:hover{
    background-color:#e9f5f5;
    transform:scale(1.1);
}
`;
const Image = styled.img`
border-radius:90%;
padding-right:10px;
height:50px;


`



const Navbar = () => {


    const [logopage, setLogopage] = useState([]);

  const fetchUserData = () => {


      fetch("http://127.0.0.1:8000/api/logopage")
          .then(response => {
              return response.json()
          })
          .then(data => {
              if (data.status == "success") {
                setLogopage(data.data);
                  console.log("fetch Logopage data:", data.data);
              }
              else {
                  "Error on data fetching."
              }

          })
  }



  React.useEffect(() => {
      // Update the document title using the browser API
      fetchUserData();

  },
      []);




    let navigate=useNavigate()

      const routeCart = () => {
        let path = `/@/cart`;
        navigate(path);
      }
      const routeWishlist = () => {
        let path = `/@/wishlist`;
        navigate(path);
      }
      const register = () => {
        let path = `/@/register`;
        navigate(path);
      }
      const login = () => {
        let path = `/@/login`;
        navigate(path);
      }
      const logout = () => {
        localStorage.clear('token');
        localStorage.clear('user_id')

        let path = `/`;
        navigate(path);
      }

      const profile = () => {
        let path = `/@/profile`;
        navigate(path);
      }

      const changePwd= () => {
        let path = `/@/password`;
        navigate(path);
      }
      console.log("token:",localStorage.getItem('token') );
      const Myorder= () => {
        let path = `/@/myorder`;
        navigate(path);
      }
      const length = localStorage.getItem("cartlength");
    console.log('length',length);

return (
    <Container>
        <Wrapper>
         {logopage &&
            <Left>
                {logopage.map((item,index) => (
                <Logo key={index}>
                    <Image src={'/images/'+item.image} alt="" />

        <LogoText>
        {item.title}
        </LogoText>
                </Logo>
                     ))}
            </Left>
}
           <Center>
            <Menuitem>
            <Link to='/#home' className='link'>Home</Link>
            </Menuitem>
            <Menuitem><Link to='/#aboutus'smooth className='link'>Aboutus</Link></Menuitem>
            <Menuitem><Dropdown/></Menuitem>
            <Menuitem><a href="/@/productlist" className='link'>Shop</a></Menuitem>


            <Menuitem><Link to='/#contactus' smooth className='link'>Contact us</Link></Menuitem>

           </Center>
           <Right>
           {localStorage.getItem('token') ?

           <>
                <Menuitem>
                <div class="dropdown">
            <button class="dropbtn">
            <Icon>
            <AccountCircleIcon/>
            </Icon>
            </button>
            <div class="dropdown-profilecontent">
                    <a href='#' onClick={profile}>
                        <option>Profile</option>
                    </a>
                    <a href="#" onClick={changePwd}>
                    <option value="">Change Password</option>
                    </a>
                    <a href="" onClick={Myorder}>
                    <option value="">My Orders</option>
                    </a>
                    <a href="#" onClick={logout}>
                    <option value="">Logout</option>
                    </a>
            </div>
        </div>





            </Menuitem>
            </>
            :(
                <>
                <Menuitem onClick={login}>Login</Menuitem>
                <Menuitem onClick={register}>Registration</Menuitem>
                </>
            )
        }
        <Menuitem>
            <Icon>
                <Favorite onClick={routeWishlist}/>
                </Icon>
            </Menuitem>

           <Menuitem>

                        <Badge onClick={routeCart}  badgeContent={length} color="primary">
                            <ShoppingCartOutlined></ShoppingCartOutlined>
                        </Badge>

            </Menuitem>

           </Right>
        </Wrapper>
    </Container>
)
}

export default Navbar
