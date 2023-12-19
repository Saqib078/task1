import { useState, useRef } from 'react';
import axios from 'axios';
import { useUser } from '../../statemanagement/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css'
const Login = () => {

    const form = useRef();
    const [data, setData] = useState({});
    const { login } = useUser();
    // eslint-disable-next-line
    const [userdata, setuserData] = useState(null);
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line
    const [success, setSuccess] = useState(false);
    // eslint-disable-next-line
    const navigate = useNavigate();
    // eslint-disable-next-line
    const [datas, setDatas] = useState({
        user_email: 'syedsaqibali0786@gmail.com',
    });
    const submithandle = (event) => {
        event.preventDefault();
        setLoading(true);
        axios.post(`https://api.shreeaadyapicture.com/auth.php`, data)
            .then((response) => {
                if (response.data === 'fail') {
                    console.log('fail');
                }
                else {
                    login(response.data);
                    setuserData(response.data);
                    setSuccess(true);
                    // setTimeout(() => {
                    //   window.location.href = '/'; // Change the URL to your home page URL
                    // }, 3000);
                    axios.post(`https://api.shreeaadyapicture.com`, datas)
                        .then((response) => {
                            if (response.data === 'fail') {
                                console.log('fail');
                            }
                        }).catch((error) => {
                            console.error('error', error);
                        });
                    setTimeout(() => {
                      window.location.href = '/'; // Change the URL to your home page URL
                    }, 3000);
                }
            }).catch((error) => {
                console.error('error', error);
            }).finally(() => {
                setLoading(false);
            });
    };
    return (
        <>
            <div className='auth_container'>
                <div></div>
                <div className='login'>
                    <div className='login_part2'>
                        <form ref={form} onSubmit={submithandle} className='login_form'>
                            <div className='login_head'><p>Login</p></div>
                            <div className='login_input'>
                                <input type="email" placeholder="Enter the Email" onChange={(e) => setData({ ...data, email: e.target.value })} />
                                <input type="password" placeholder="Enter the pssword" onChange={(e) => setData({ ...data, password: e.target.value })} pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).*$" />
                            </div><div className='part2_button'> <button type='submit' className='login_button' disabled={loading}> {loading ? 'Loading...' : 'Submit'}</button></div>
                        </form>
                        <hr />
                        <div className='link_signin'><Link to='/signin'>Create your account</Link></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login