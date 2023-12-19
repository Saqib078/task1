import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useUser } from '../../statemanagement/UserContext';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import './checkout.css';
import { RiSubtractFill } from 'react-icons/ri';
import Loading from '../../component/loading/Loading';
function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

const Checkout = () => {
    const { productId } = useParams();
    const [qun, setQuan] = useState(1);
    const { user } = useUser();
    const [store, setstore] = useState();
    const [address, setAddress] = useState(false);
    const [binpay, setBinpay] = useState(false);
    const [gateway, setGateway] = useState(false);
    const [checkpay, setCheckpay] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [postData, setPostData] = useState({
        order_id: '',
        product: [store],
        user: [user],
        track: 'order',
        binaryTrack: '0',
        address: '',
        quantity_pro: qun,
        user_id: user.user_id,
        payment: '',
        phonenum: '',
        ALt_number: '',
        pin_code: '',
        payment_id: '',
        location: '',
    });
    const secret = 'youraregood';
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
    const product_views = () => {
        console.log(jwt);
        axios.get(`https://api.shreeaadyapicture.com/wayout.php?id=${productId}`, {
            headers: {
                'Content-Type': 'multipart/dataToPost',
                Authorization: `Bearer ${jwt}`
            }
        }
        )
            .then((response) => {
                setstore(response.data);
                setPostData((prevData) => ({
                    ...prevData,
                    product: response.data,
                }));
                console.log(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error posting data:', error);
            });
    };

    const handleIncrement = () => {
        if (store[0].number_collection > qun) {
            setQuan(qun + 1);
            setPostData((prevData) => ({
                ...prevData,
                quantity_pro: qun + 1,
            }));
        }

    };

    const handleDecrement = () => {
        if (qun > 1) {
            setQuan(qun - 1);
            setPostData((prevData) => ({
                ...prevData,
                quantity_pro: qun - 1,
            }));
        }
    };

    async function generateOrderId() {
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 10000);
        const orderId = `${timestamp}${random}${user.user_id}`;
        setPostData((prevData) => ({
            ...prevData,
            order_id: orderId,
        }));
    };
    useEffect(() => {
        product_views();
        generateOrderId();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //   if (!store || store.message === "No data found for the specified ID.") {
    //     return <div>loading</div>
    //   }
    let totalprice, totaldis, discount;
    if (isLoading) {
        return <Loading />;
    }
    if (store.message === "No data found for the specified ID.") {
        return <div className='notfound_data'>
            <div className='success_wrap'>
                <p className='success_p'> Not Found the data  </p>
                <div ><button className='success_link'></button></div>
            </div>
        </div>
    }
    else {
        discount = store[0].discount / 100;
        totaldis = store[0].price * discount;
        totalprice = store[0].price - totaldis;
        console.log(totalprice)
    }

    const order_accept = () => {
        console.log(jwt);
        axios.post(`https://api.shreeaadyapicture.com/orderdetails.php`, postData, {
            headers: {
                'Content-Type': 'multipart/dataToPost',
                Authorization: `Bearer ${jwt}`
            }
        }
        )
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error posting data:', error);
            });
        setCheckpay(false);
        setSuccessful(true);
    };
    async function showRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const options = {
            key: "rzp_test_5fHHVsDsy34RhL",
            currency: "INR", // Change this to your desired currency
            amount: store[0].price, // Change this to the desired amount in paise or cents
            name: "purchase",
            description: "your bill account",
            handler: function (response) {
                if (response.razorpay_payment_id) {
                    setPostData((prevData) => ({
                        ...prevData,
                        payment_id: response.razorpay_payment_id,
                    }));
                    setPostData((prevData) => ({
                        ...prevData,
                        payment: 'online mode',
                    }));
                    setCheckpay(!checkpay);
                } else {
                    alert("Transaction failed. Please try again later.");
                    // Aap aur bhi error handling kar sakte hain, jaise ki error message set karke state mein store karke use display karna.
                }
            },
            prefill: {
                name: user.name,
                email: user.email,
                phone_number: '6387726747',
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }
    const offline = () => {
        setGateway(false);
        setCheckpay(true);
        setPostData((prevData) => ({
            ...prevData,
            payment: 'Cash on delivery',
        }));
    }



    return (
        <>
            <div >
                {
                    !address ?
                        <div className='product_bill_container'>
                            <div className='product_checkout'>
                                <div className='img_checkout'>
                                    <img src={`https://api.shreeaadyapicture.com/uploads/${store[0].pro_image}`} alt="" width='100%' />
                                </div>
                                <div className='check_pro_details'>
                                    <div className='container_checkout_content_part1'>
                                        <p className='p_part1_checkout'>{store[0].pro_name}</p>
                                        <p className='p_part2_checkout'>{store[0].pro_desc}</p>
                                        <p className='p_part3_checkout'> Total price :- &#x20B9; {totalprice}  </p>
                                    </div>
                                    <div className='quantity_checkout_container'>
                                        {
                                            store[0].number_collection > qun ?
                                                <div className='quantity_checkout'>
                                                    <p className='p_checkout_quan'>Quantity</p>
                                                    <div><button onClick={handleDecrement} className='but_1'><RiSubtractFill /></button></div>
                                                    <div className='input_checkout'><input type="number" value={qun} readOnly /></div>
                                                    <div><button onClick={handleIncrement} className='but_2'>+</button></div>
                                                </div>
                                                :
                                                <div className='quantity_checkout'>
                                                    <p>Quantity</p>
                                                    <div><button onClick={handleDecrement} className='but_1'><RiSubtractFill /></button></div>
                                                    <div className='input_checkout'><input type="number" value={qun} readOnly /></div>
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='product_summary'>
                                <div className='head_price_sum'><p>PRICE SUMMARY</p></div>
                                <div className='summary_bill'>
                                    <div className='con_bill'><p>Total MRP (Incl. of taxes)</p></div>
                                    <div className='con_bill'><p>RS:-{totalprice * qun}</p></div>
                                </div>
                                <div className='summary_bill'>
                                    <div className='con_bill'><p>Shipping Charges</p></div>
                                    <div className='con_bill'><p>FREE</p></div>
                                </div>
                                <div className='summary_bill'>
                                    <div className='con_bill'><p>Subtotal</p></div>
                                    <div className='con_bill'><p>RS:-{totalprice * qun}</p></div>
                                </div>
                                <hr className='hr_space' />
                                <div className='con_bill_add'>
                                    <div className='con_bill_part2'>
                                        <p>Total</p>
                                        <p>Rs: {totalprice * qun}</p>
                                    </div>
                                    <div className='button_add_address' onClick={() => setAddress(!address)}>
                                        <p>ADD ADDRESS</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : ''
                }
                {
                    address && !binpay ?
                        <div className='shipping_checkout'>
                            <div className='ship_head'><p>Shipping details:</p></div>
                            <div className='ship_input-container'>
                                <div className='wrap_ship'>
                                    <div className='ship_input'><input type="text" placeholder='pincode' value={postData.pin_code} id="pin" pattern="[0-9]{6}" onChange={e => setPostData({ ...postData, pin_code: e.target.value })} /></div>
                                    <div className='ship_input'><input type="text" placeholder="Address" value={postData.address} onChange={e => setPostData({ ...postData, address: e.target.value })} /></div>
                                    <div className='ship_input'><input type="text" placeholder="City/town" value={postData.location} onChange={e => setPostData({ ...postData, location: e.target.value })} /></div>
                                    <div className='ship_input'><input type="text" placeholder="Mobile number" value={postData.phonenum} onChange={e => setPostData({ ...postData, phonenum: e.target.value })} /></div>
                                    <div className='ship_input'><input type="text" placeholder="alternate number" value={postData.ALt_number} onChange={e => setPostData({ ...postData, ALt_number: e.target.value })} /></div>
                                </div>
                            </div>
                            <div onClick={() => setBinpay(!binpay)} className='ship_next'>
                                <div className='but_ship_next'>
                                    Next step
                                </div>
                            </div>
                        </div>
                        :
                        ''
                }
                {
                    binpay && !successful ?
                        <div className='shipping_checkout'>
                            <div className='ship_head'><p>Payment details:</p></div>
                            <div className='ship_input-container'>
                                <div className='wrap_ship'>
                                    <div>
                                        <div onClick={offline} className='con_pay_check'><p>Cash On delivery</p></div>
                                        <div onClick={() => { setGateway(!gateway); setCheckpay(false); }} className='con_pay_check'><p>Online payment</p></div>
                                        {
                                            gateway ?
                                                <div>
                                                    <header>
                                                        <button onClick={showRazorpay} className='but_ship_next'>Pay</button>
                                                    </header>
                                                </div>
                                                : ''
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        ''
                }
                {
                    checkpay && !successful ? <div className='butt_accept'><button onClick={order_accept} className='but_ship_next'>Order Confirm</button> </div> : ''
                }
                {
                    successful ? <div className='last_message_checkout'><p> you order has been accept . Check you order in your account page</p> </div> : ''
                }
            </div>
        </>
    )
}

export default Checkout;
