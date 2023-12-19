import React, { useEffect, useState } from 'react'
import Loading from '../loading/Loading';
import { useUser } from '../../statemanagement/UserContext';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { Link } from 'react-router-dom';
import '../../pages/addtocart/addtocart.css';
import '../../pages/home/home.css';
import './profilecom.css';
const Orderdetails = () => {
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
        <>
            <div>
                <div className='pro_del pro_container '>
                    {order.map((item, index) => (
                        <div key={index} >{
                            <div>
                                {
                                    item.product.map((pro, indexs) => (
                                        <div key={indexs} className='pro_order'>
                                            {
                                                <Link to={`/product/${pro.id}`}>
                                                    <div className='pro_part'>
                                                        <div className='order_img'><img src={`https://api.shreeaadyapicture.com/uploads/${pro.pro_image}`} alt="" width='100%' height='100%'/></div>
                                                        <div className='name'><p>{pro.pro_name}</p></div>
                                                        <div className='price'><p>Rs-{pro.price}</p></div>
                                                        {/* <div className='pro_add'><button onClick={handleAddToCart}>Add To Cart</button></div> */}
                                                    </div>
                                                </Link>
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        }
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default Orderdetails