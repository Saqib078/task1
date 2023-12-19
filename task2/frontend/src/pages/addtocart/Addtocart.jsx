import { useEffect, useState, Suspense } from 'react'
import { Link } from 'react-router-dom';
import { useUser, useProducts } from '../../statemanagement/UserContext';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import Loading from '../../component/loading/Loading';
import './addtocart.css';
import '../home/home.css';
const Addtocart = () => {
    const [cart, setCart] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { products } = useProducts();
    const { user } = useUser();
    // const [loading, setLoading] = useState(true);
    // const [noItemsFound, setNoItemsFound] = useState(false);
    console.log(cart)
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
    const cart_views = () => {
        setIsLoading(true);
        if (user) {
            axios.get(`https://api.shreeaadyapicture.com/Addtocart.php?user_id=${user.user_id}`, {
                headers: {
                    'Content-Type': 'multipart/dataToPost',
                    Authorization: `Bearer ${jwt}`
                },
            })
                .then((response) => {
                    console.log(response)
                    setCart([...cart, response.data]);
                    setIsLoading(false);
                   
                })
                .catch((error) => {
                    console.error('Error adding to cart:', error);
                });
        }
    };
    useEffect(() => {
        cart_views();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(cart)

    if (cart && cart[0] && cart[0].message === 'No items found for the user.') {
        return <>
            <h1>No items</h1>
        </>
    }
    if (isLoading) {
        return <>
            <Loading />
        </>
    }
    
    console.log(products)
    return (
        <>
            <Suspense fallback={<div><Loading /></div>}>
                <div>
                    <div className='pro_del pro_container' >
                        {cart[0].map((item, index) => (
                            <div key={index} >{
                                <div>
                                    {
                                        products.map((pro, indexs) => (
                                            <div key={indexs} >
                                                {
                                                    pro.id === item.product_id ?
                                                        <Link to={`/product/${item.product_id}`}>
                                                            <div className='pro_part'>
                                                                <div className='img_pro'><img src={`https://api.shreeaadyapicture.com/uploads/${pro.pro_image}`} alt="" width='100%' /></div>
                                                                <div className='name'><p>{pro.pro_name}</p></div>
                                                                <div className='price'><p>Rs-{pro.price}</p></div>
                                                                <Link to={`/buy/${item.product_id}`}><button className='button_home'>Proceed to Checkout</button></Link>
                                                                {/* <div className='pro_add'><button onClick={handleAddToCart}>Add To Cart</button></div> */}
                                                            </div>
                                                        </Link>
                                                        : ''
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                            </div>
                        ))}
                    </div>
                </div >
            </Suspense>
        </>
    )
}

export default Addtocart