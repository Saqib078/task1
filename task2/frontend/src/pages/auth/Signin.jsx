import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { Link , useNavigate} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './auth.css';
const Signin = () => {
    const form = useRef();
    const navigate = useNavigate();
    const [detail, setDetails] = useState(false);
    // const [login, setLogin] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const [data, setData] = useState({});
    const [id, setId] = useState('');
    const [message, setMessage] = useState('');
    const secret = 'youraregood';
    const payload = {
        iss: "ecommerce",
        aud: "yourname"
    };

    const header = {
        "alg": 'HS256',
    }
    useEffect(() => {
        const unique_id = uuidv4();
        setData({ ...data, user_id: unique_id });
        // eslint-disable-next-line
    }, []);
    const submithandle = (event) => {
        event.preventDefault();
        const FormData1 = data;
        const encodeHeader = btoa(JSON.stringify(header));
        const payloadString = btoa(JSON.stringify(payload));
        const signature = CryptoJS.HmacSHA256(encodeHeader + "." + payloadString, secret).toString(CryptoJS.enc.Base64);
        const jwt = `${encodeHeader}.${payloadString}.${signature}`;
        console.log(jwt)
        axios.get(`https://api.shreeaadyapicture.com/emailcheck.php?email=${data.email}`)
            .then((response) => {
                setMessage('');
                console.log(response.data);
                setMessage(response.data);

                if (response.data === 'no existed Email') {
                    axios.post('https://api.shreeaadyapicture.com/users.php', FormData1, {
                        headers: {
                            'Authorization': `Bearer ${jwt}`,
                        },
                    }).then((res) => {
                        console.log(res.data);
                        setId(res.data);
                    }).catch((error) => {
                        console.log(error);
                    })
                    setDetails(true);
                }
                else {
                    alert('already exists')
                }
                console.log(message);
            }).catch((error) => {
                console.error('Error', error);
            })
    };
    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleImageUpload = () => {
        if (selectedImage) {
            const header = {
                "alg": 'HS256',
            }
            const encodeHeader = btoa(JSON.stringify(header));
            const payloadString = btoa(JSON.stringify(payload));
            const signature = CryptoJS.HmacSHA256(encodeHeader + "." + payloadString, secret).toString(CryptoJS.enc.Base64);
            const jwt = `${encodeHeader}.${payloadString}.${signature}`;
            console.log(jwt)

            if (selectedImage) {
                const formData = new FormData();
                formData.append('registration', selectedImage);
                formData.append('image_id', `${id}`);

                axios
                    .post('https://api.shreeaadyapicture.com/userimg.php', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${jwt}`
                        }
                    })
                    .then((response) => {
                        console.log(response.data);
                        setTimeout(() => {
                        //   window.location.href = '/'; // Change the URL to your home page URL
                        navigate('/');
                          }, 3000);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            } else {
                console.log('No image selected');
            }
        }
        else {
            alert('please upload image');
        }
    };
    return (
        <>
            <div className='auth_container'>
                <div></div>
                <div className='login'>
                    {!detail ?
                        <div className='login_part2'>
                            <form ref={form} onSubmit={submithandle} className='login_form'>
                                <div className='login_head'><p>Create account</p></div>
                                <div className='login_input'>
                                    <input type="text" placeholder="Name.." onChange={(e) => setData({ ...data, name: e.target.value })} required />
                                    <input type="email" placeholder="Email.." onChange={(e) => setData({ ...data, email: e.target.value })} required />
                                    <input type="password" placeholder="Password..." onChange={(e) => setData({ ...data, password: e.target.value })} minlength="8" maxlength="128" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).*$" />
                                </div><div className='part2_button'> <button type='submit' className='login_button'>Next &#8614;</button></div>
                            </form>
                            <hr />
                            <div className='link_signin'><Link to='/login'> Login Account </Link></div>
                        </div> :
                        ''}
                    {detail ?
                        <div className='thumnail-pic'>
                            <div className='thumnail-wrap'>
                                <label for="images" class="drop-container" id="dropcontainer">
                                    <span class="drop-title">Upload your profile Image</span>
                                    <input type="file" id="images" accept="image/*" onChange={handleImageChange} />
                                </label>
                                <button className='login_button' onClick={handleImageUpload}>uploadimage</button>
                            </div>
                        </div> :
                        ''
                    }
                </div>
            </div >
        </>
    )
}

export default Signin