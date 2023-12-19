import { useParams, useNavigate, Link } from 'react-router-dom';
import { Suspense, useState, useEffect } from 'react';
import Loading from '../loading/Loading';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import './productsingle.css';
import { useProducts, useUser } from '../../statemanagement/UserContext';
import Hover from '../../pages/home/structure/Hover';
import '../../pages/home/home.css';
// import Compro from './Compro';
const Productsingle = () => {
  const { productId } = useParams();
  const [store, setstore] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(store);
  const navigate = useNavigate();
  const { user } = useUser();
  const { products } = useProducts();
  let totalprice, totaldis, discount;

  const secret1 = process.env.REACT_APP_API_SECRET_KEY;
  const payload_key = process.env.REACT_APP_API_PAYLOAD_KEY1;
  const payload_key2 = process.env.REACT_APP_API_PAYLOAD_KEY2;
  const head = process.env.REACT_APP_API_HEAD_KEY;
  const API = process.env.REACT_APP_API;
  const image_api = process.env.REACT_APP_API_IMAGE;
  const secret = secret1;
  const payload = {
    iss: payload_key,
    aud: payload_key2
  };
  const header = {
    "alg": head,
  }
  const encodeHeader = btoa(JSON.stringify(header));
  const payloadString = btoa(JSON.stringify(payload));
  const signature = CryptoJS.HmacSHA256(encodeHeader + "." + payloadString, secret).toString(CryptoJS.enc.Base64);
  const jwt = `${encodeHeader}.${payloadString}.${signature}`;

  const product_views = () => {
    setIsLoading(true);
    console.log(jwt);
    axios.get(`${API}?id=${productId}`, {
      headers: {
        'Content-Type': 'multipart/dataToPost',
        Authorization: `Bearer ${jwt}`
      }
    }
    )
      .then((response) => {
        setstore(response.data);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error posting data:', error);
      });
  };
  const addtocarthandlevalid = () => {
    if (user) {
      const user_id = user.user_id;
      const product_id = productId;
      const quantity = 1;
      if (user_id) {
        axios.post('https://api.shreeaadyapicture.com/Addtocart.php', {
          action: 'add',
          user_id,
          product_id,
          quantity
        }, {
          headers: {
            'Content-Type': 'multipart/dataToPost',
            Authorization: `Bearer ${jwt}`
          },
        })
          .then((response) => {
            console.log(response.data.message);
            setTimeout(() => {
              //   window.location.href = '/'; // Change the URL to your home page URL
              navigate('/');
            }, 3000);
          })
          .catch((error) => {
            console.error('Error adding to cart:', error);
          });
      }
    }
    else {
      alert('login')
    }
  }

  useEffect(() => {
    product_views();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);
  
  if (isLoading) {
    return <Loading/>;
  }
  if (store.length>1|| store.message === "No data found for the specified ID.") {
    return <div className='notfound_data'>
      <div className='success_wrap'>
        <p className='success_p'> Not Found the data  </p>
        <div ><button className='success_link'></button></div>
      </div>
    </div>
  }
  else if (store.length>1) {
    discount = store[0].discount / 100;
    totaldis = store[0].price * discount;
    totalprice = store[0].price - totaldis;
    console.log(totalprice)
  }

  return (
    <>
      <Suspense fallback={<div><Loading /></div>}>
      <div>
          <div class="container_product_single">
            <div class="flex-side">
              { store ? (
                store.map((item, index) => (
                  <div key={index}>
                    <div className='thumnail_image'>
                      <img src={`${image_api}/${item.pro_image}`} alt="" width='100%' height='100%'/>
                    </div>
                    <div className='coll_container'>
                      {
                        item.col_pro_image.map((item, index) => (
                          <div key={index}>
                            <div className='collection_image'>
                              <img src={`${image_api}/${item}`} alt="" width='100%' height='100%'/>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                ))) :''
              }
            </div>
            <div class="sticky-side">
              <div >
                { store[0] ?<div>
                   <div className='product_name'><p>{store[0].pro_name}</p></div>
                <div className='product_desc'><p>{store[0].pro_desc}</p></div></div>:''
                }
               
                <div className='size_chart'>
                  <div className='left_size_chart'>
                    <p className='first_p'>NEED HELP IN SELECTING YOUR FIT?</p>
                    <p className='second_p'>BLUORNG HELPS YOU UNDERSTAND HOW OUR SIZING DECIDES YOUR FIT.</p>
                  </div>
                  <div className='right_size_chart'><p>SIZE CHART</p></div>
                </div>
                <div className='tax_p'><p>Tax included. Shipping calculated at checkout.</p></div>
                <div className='size_number'>
                  <div className='size_actual'><p>XXXS</p></div>
                  <div className='size_actual'><p>XXS</p></div>
                  <div className='size_actual'><p>XS</p></div>
                  <div className='size_actual'><p>S</p></div>
                  <div className='size_actual'><p>M</p></div>
                  <div className='size_actual'><p>L</p></div>
                  <div className='size_actual'><p>XL</p></div>
                  <div className='size_actual'><p>XXL</p></div>
                  <div className='size_actual'><p>XXXL</p></div>
                </div>
                <div className='totalprice'>
                 <div className='price_pur'><p> Total price :- &#x20B9; {totalprice}</p></div>
                   {store?<div className='dis_price'><p><strike> {store[0].price}</strike></p></div>:''}
                </div>
                <div className='addtocart' onClick={() => { addtocarthandlevalid() }}><p>Add To Cart</p></div>
                <div className='buynow'><p>Buy It Now</p></div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* <Compro store={store} totalprice={totalprice} user={user} productId={productId} jwt={jwt}/> */}
          <div className='recommand_head'><p>YOU MAY ALSO LIKE</p></div>
          <div className='product'>
            <div className='product_container'>
              { products && products.length > 1 ? 
                products.map((item, index) => (
                  (store[0].id === item.id) ? null : (
                    <div key={index} className='product_box'>
                      <div>
                        <Link to={`/product/${item.id}`} >
                          <div >
                            <Hover Img1={item.pro_image} Img2={item.col_pro_image[1]} />
                          <div className='describe'><p>{item.pro_desc}</p></div>
                          <div className='name'><p>{item.pro_name}</p></div>
                          <div className='price'><p>&#8377; : {item.price}</p></div>
                          </div>
                          
                        </Link>
                      </div>
                    </div>
                  )
                )):''
              }
            </div>
          </div>
        </div>
      </Suspense>
    </>
  )
}

export default Productsingle;