import { useEffect, useRef, useState } from 'react';
import './profilecom.css';
import { useUser } from '../../statemanagement/UserContext';
import axios from 'axios';

const Reset = () => {
    const { user } = useUser();
    const [resend, setResend] = useState(false);
    const [authotp, setAuthotp] = useState(false);
    const [org, setOrg] = useState('');
    const [otpcom, setOtpcom] = useState(false);
    const [passcom, setPasscom] = useState(false);
    const [check, setCheck] = useState('');
    const [otp, setOTP] = useState(['', '', '', '', '', '']);
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
    const [data, setData] = useState({
        user_id: user.user_id,
        currentPassword: '',
        newPassword: '',
    });
    const fetchUserData = async () => {
        try {
            const response = await axios.post('https://api.shreeaadyapicture.com/otp.php', {
                email: 'syedsaqibali0786@gmail.com',
                name: user.name // Make sure you have the 'user' variable defined
            });
            console.log(response.data.otp);
            setOrg(response.data.otp);
            setResend(false); // Reset resend to false after generating OTP
        } catch (error) {
            console.error('Error fetching OTP:', error);
        }
    };

    const funcheck = () => {
        console.log(check);
        console.log(org);
        const orgNumber = Number(org);
        const checkNumber = Number(check);

        if (checkNumber === orgNumber) {
            setAuthotp(true);
            setPasscom(false);
            console.log('verify');
        } else {
            console.log('not');
        }
    }

    useEffect(() => {
        if (resend) {
            fetchUserData();
        }
        // eslint-disable-next-line
    }, [resend]);

    const handleResendClick = () => {
        setResend(true);
        setPasscom(true);
    };

    const handlesendClick = () => {
        setResend(true);
        setOtpcom(true);
        setPasscom(true);
    };

    const handleChange = (e, index) => {
        const value = e.target.value;

        if (isNaN(value) || value.length > 1) {
            return;
        }

        const newOTP = [...otp];
        newOTP[index] = value;
        setOTP(newOTP);

        if (value !== '' && index < 5) {
            inputRefs[index + 1].current.focus();
        }

        // Check if all OTP digits are entered
        const completeOTP = newOTP.join('');
        if (completeOTP.length === 6 && newOTP.every(digit => !isNaN(digit))) {
            setCheck(completeOTP);
            funcheck(); // Check the OTP correctness
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
            inputRefs[index - 1].current.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').split('');
        let newOTP = [...otp];

        for (let i = 0; i < 6; i++) {
            if (pastedData[i] && !isNaN(pastedData[i])) {
                newOTP[i] = pastedData[i];
            }
        }

        setOTP(newOTP);

        if (pastedData[5] && !isNaN(pastedData[5])) {
            const completeOTP = newOTP.join('');
            setCheck(completeOTP);
            funcheck();
        }
    };
    const handleChangeiput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmitchange = () => {
        // Axios ka istemal POST request bhejne ke liye kiya gaya hai
        axios.post('https://api.shreeaadyapicture.com/resetpas.php', data)
            .then(response => {
                console.log(response.data); // Response from the server
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <>
            <div>
                <div className='head_reset'><p>Change Password</p></div>
                <div className='container_reset'>
                    {!otpcom ?
                        <div className='send_otp_container'>
                            <div className='head_send_otp'><p>Verify Your Account</p></div>
                            <button className="resend-button" onClick={handlesendClick}>Send OTP</button>
                        </div>
                        :
                        ''
                    }
                    {passcom ?
                        <div className="otp-container">
                            <p className='otp_auth_p1'>Verify Your OTP</p>
                            <p className='otp_auth_p2'>An OTP has been sent to your mobile number.</p>
                            <div className="otp-input">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={inputRefs[index]}
                                        type="text"
                                        value={digit}
                                        placeholder="0"
                                        onChange={(e) => handleChange(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        onPaste={handlePaste}
                                    />
                                ))}
                            </div>
                            <button className="resend-button" onClick={handleResendClick}>Resend OTP</button>
                        </div>
                        :
                        ''
                    }
                    {authotp ?
                        <div className='pass_change_container'>
                            <div className='old_password'>
                                <input type="text" placeholder='old password' name="currentPassword" value={data.currentPassword} onChange={handleChangeiput} />
                            </div>
                            <div className='new_password'>
                                <input type="text" placeholder='new password' name='newPassword' value={data.newPassword} onChange={handleChangeiput} />
                            </div>
                            <button className="resend-button" onClick={handleSubmitchange}>Submit</button>
                        </div>
                        : ''
                    }

                </div>
            </div>
        </>
    );
}

export default Reset;