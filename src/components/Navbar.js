import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { googleLogout} from '@react-oauth/google';
import jwt_decode from "jwt-decode";

// 1
function Navbar() {

    const [showDropdown, setShowDropdown] = useState(false);
    const [showPricingDropdown, setShowPricingDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowPricingDropdown(false);
        setShowDropdown(!showDropdown);
    };
    const togglePricingDropdown = () => {
        setShowDropdown(false);
        setShowPricingDropdown(!showPricingDropdown);
    };


    const navigate = useNavigate();
    const responseGoogle = async (response) => {
        try {
          localStorage.setItem('user', JSON.stringify(jwt_decode(response.credential)));
          const { name, sub, picture } = jwt_decode(response.credential);
      
          const allUsers = await fetch(`${process.env.REACT_APP_API_NAVIGATION}/user`).then(res => res.json());
      
          const existingUser = allUsers.find(user => user.id === sub);
      
          if (existingUser) {
            // user exists, log them in
            navigate('/', { replace: true });
      
          } else {
            // user doesn't exist, create a new user
            const user = {
              id:sub,
              name: name,
              image: picture,
              limit: 1,
            };
            await fetch(`${process.env.REACT_APP_API_NAVIGATION}/users`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
            });
            navigate('/', { replace: true });
          }
        } catch (err) {
          console.error(err + " hello");
        }
      };
      const toExplore = async () => {
        navigate('/explore',{replace:true});
      }
      const toLanding = async () => {
        navigate('/landing',{replace:true});
      }
      


    return (
        <div className='main-nav-div'>
            <div className='brand-logo'>
                TrecNoc
            </div>
        
            <nav className='navbar'>
                {/* <div className='navbar-brand'>TrecNoc</div> */}
                <ul className='navbar-nav1'>
                <li>
                    <button onClick={toExplore} className='light'>
                                Explore
                            </button>
                </li>
                {/* <li className='f-color'>
                    <button
                            className='light'
                            onClick={toggleDropdown}
                        >Features</button>
                    <Link
                            activeClass='active'
                            to='section6'
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}

                    >
                    </Link>
                </li> */}
                <li>
                <Link
                            activeClass='active'
                            to='subh-main'
                            spy={true}
                            smooth={true}
                            offset={-50}
                            duration={500}

                        >
                            <button
                                className='light'
                                onClick={togglePricingDropdown}
                            >
                        Organiser?
                    </button>
                    </Link>
                    </li>
                    <li>
                        <Link
                            activeClass='active'
                            to='section5'
                            spy={true}
                            smooth={true}
                            offset={-50}
                            duration={500}

                        >
                            <button className='light'>
                                About Us
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link
                            activeClass='active'
                            to='section6'
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}

                        >
                            <button className='light'>
                                Contact
                            </button>
                        </Link>
                    </li>
                </ul>
            </nav>
                <div className='login-zz'>

                    <GoogleOAuthProvider
                        clientId='443172810373-snnv2m331j9e6ng9sph7n27e09s1t26m.apps.googleusercontent.com'>
                        <GoogleLogin
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            shape='pill'
                            text='Sign Up'
                            theme='filled_black'
                            size='large'
                            type="standard"
                            cookiePolicy="single_host_origin"
                        />
                    </GoogleOAuthProvider>
                </div>
    </div>
    );
}

export default Navbar;