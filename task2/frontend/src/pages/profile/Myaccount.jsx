import { Suspense, useState } from 'react'
import { useUser } from '../../statemanagement/UserContext';
import './myaccount.css';
import '../../component/singlepro/productsingle.css';
import Account from '../../component/profilecom/Account';
import Reset from '../../component/profilecom/Reset';
import Orderdetails from '../../component/profilecom/Orderdetails';
import Trackorder from '../../component/profilecom/Trackorder';
import { Link } from 'react-router-dom';
const Myaccount = () => {
    const { user, logout } = useUser();
    const [selectedOption, setSelectedOption] = useState('option1');
    console.log(user);
    const API_IMAGE = process.env.REACT_APP_API_IMAGE;
    const logoutfun = () => {
        logout();
    }
    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };
    if (!user) {
        return <div>
            Not Login
        </div>
    }
    return (
        <>
            <div className='container_profile'>
                <div className='sticky-side sticky_profile'>
                    <div className='profile_sticky_part1'>
                        {/* <div className='profile_img'>
                            <img src={`${API_IMAGE}/${user.imagedetails}`} alt="" width='100%' />
                        </div>
                        <div className='profile_name'><p>{user.name}</p></div>
                        <div className='profile_email'><p>{user.email}</p></div> */}
                       <div> Accounting delails will be soon </div>
                    </div>
                    <div className='profile_sticky_part2'>
                        {/* <div onClick={() => handleOptionChange('option1')} className={`${selectedOption === 'option1' ? 'Account_navbar' : ''}`}><p>ACCOUNT</p></div>
                        <div onClick={() => handleOptionChange('option2')} className={`${selectedOption === 'option2' ? 'Account_navbar' : ''}`}><p>RESET PASSWORD</p></div>
                        <div onClick={() => handleOptionChange('option3')} className={`${selectedOption === 'option3' ? 'Account_navbar' : ''}`}><p>ORDER BILL</p></div>
                        <div onClick={() => handleOptionChange('option4')} className={`${selectedOption === 'option4' ? 'Account_navbar' : ''}`}><p>MY ORDER</p></div>
                        <Link to='/addtocart'><div><p>ADD TO CART</p></div></Link> */}
                        <div className='account_logout' onClick={logoutfun}>
                            <p >Logout Account</p>
                        </div>
                    </div>
                </div>
                {/* <div className='componen_profile'>
                    <Suspense fallback={<div>Loading...</div>}>
                        {selectedOption === 'option1' && <Account />}
                        {selectedOption === 'option2' && <Reset />}
                        {selectedOption === 'option3' && <Trackorder />}
                        {selectedOption === 'option4' && <Orderdetails />}
                    </Suspense>
                </div> */}
            </div>
        </>
    )
}

export default Myaccount