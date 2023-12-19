import { useState } from 'react';
import './contact.css';
import axios from 'axios';
const Contact = () => {
    const [data, setData] = useState({});
    // eslint-disable-next-line
    const submithandle = (event) => {
        console.log(data)
        event.preventDefault();
        axios.post(`http://localhost:5001/api/users/`, data)
            .then((response) => {
                if (response.data === 'fail') {
                    console.log('fail');
                }
                else {
                }
            }).catch((error) => {
                console.error('error', error);
            }).finally(() => {
                console.log('final');
            });
    };

    return (
        <>
            <div className='space_contact'></div>
            <div className='head_contact_container'>
                <div className='p_part1_contact'><p>CONNECT WITH THE BRAND</p></div>
                <div className='p_part2_contact'><p> We would love to hear about your feedback, Interests and future collaborations email at contact</p></div>
            </div>
            <div className='input_container'>
                <div className='part1_contact'>
                    <input type="text" placeholder='Enter the name' onChange={(e) => setData({ ...data, name: e.target.value })} />
                    <input type="Email" placeholder='Enter the email' className='email_input' onChange={(e) => setData({ ...data, email: e.target.value })}  />
                </div>
                <div className='part2_contact'>
                    <input type="text" placeholder='Enter the number'  onChange={(e) => setData({ ...data, avatar: e.target.value })} />
                </div>
                <div className='part3_contact'>
                    <textarea onChange={(e) => setData({ ...data, phone: e.target.value })}  >
                        comment
                    </textarea>
                </div>
            </div>
            {/* <div className='part2_button'> <button type='submit' onClick={submithandle} className='login_button' > Submit</button></div> */}
            <div className='button_send'>
                <p>Send</p>
            </div>
            <div className='space_contact'></div>
        </>
    )
}

export default Contact