import React, { useEffect, useState } from 'react';
import './profilecom.css';
import Loading from '../loading/Loading';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { useUser } from '../../statemanagement/UserContext';
import { Link } from 'react-router-dom';
const Trackorder = () => {
    // eslint-disable-next-line
    const steps = ['Order Process', 'Order Dispatch', 'Order Deliver'];
    const [order, setOrder] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useUser();
    // const [loading, setLoading] = useState(true);
    // const [noItemsFound, setNoItemsFound] = useState(false);
    const secret = 'youraregood';
    // Update cart state
    const payload = {
        iss: "ecommerce",
        aud: "yourname"
    };
    const header = {
        "alg": 'HS256',
    }
    const encodeHeader = btoa(JSON.stringify(header));
    const payloadString = btoa(JSON.stringify(payload));
    const signature = CryptoJS.HmacSHA256(encodeHeader + "." + payloadString, secret).toString(CryptoJS.enc.Base64);
    const jwt = `${encodeHeader}.${payloadString}.${signature}`;
    const order_views = () => {
        setIsLoading(true);
        if (user) {
            axios.get(`https://api.shreeaadyapicture.com/orderdetails.php?user_id=${user.user_id}`, {
                headers: {
                    'Content-Type': 'multipart/dataToPost',
                    Authorization: `Bearer ${jwt}`
                },
            })
                .then((response) => {
                    setOrder(response.data);
                    console.log(response.data);
                    setIsLoading(false)
                })
                .catch((error) => {
                    console.error('Error adding to cart:', error);
                });
        }
    };
    useEffect(() => {
        order_views();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (isLoading) {
        return <>
            <Loading />
        </>
    }

    return (
        <div className="order-tracker">
            <div className='track_head'>
                <p> Track Order </p>
            </div>
            <div className='pro_del pro_container '>
                {order.map((item, index) => (
                    <div key={index} >{
                        <div className='Track_order_container'>
                            <div>
                                {
                                    item.product.map((pro, indexs) => (
                                        <div key={indexs} className='pro_Trackorder'>
                                            {
                                                <Link to={`/product/${pro.id}`}>
                                                    <div className='pro_Trackpart'>
                                                        <div className='orderTrack_img'><img src={`https://api.shreeaadyapicture.com/uploads/${pro.pro_image}`} alt="" width='100%' height='100%' /></div>
                                                        <div>
                                                            <div className='name'><p>{pro.pro_name}</p></div>
                                                            <div className='price'><p>Rs-{pro.price}</p></div>
                                                        </div>

                                                        {/* <div className='pro_add'><button onClick={handleAddToCart}>Add To Cart</button></div> */}
                                                    </div>
                                                </Link>
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="steps">
                                {steps.map((step, index) => (
                                    <div key={step} className="step">
                                        <div className='circle-line_container'>
                                            <div
                                                className={`circle ${item.binaryTrack === '0' && index === 0 ? 'active' : ''}`}
                                            />
                                            {index !== 2 ?
                                                <div
                                                    className={`line ${item.binaryTrack === '0' && index === 0 ? 'active' : ''}`}
                                                /> : ''
                                            }

                                        </div>
                                        <div className="step-label">{step}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                    </div>
                ))
                }
            </div>
        </div>
    );
};

export default Trackorder;
