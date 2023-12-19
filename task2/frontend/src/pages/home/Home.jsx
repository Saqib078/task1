import V1 from './vedio/vedio_wayout.mp4';
import './home.css';
import { Suspense, useRef, useState, useEffect, lazy } from 'react';
import Img4 from '../../component/component_image/2000.png';
import Loading from '../../component/loading/Loading';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { motion } from "framer-motion";
const Hover = lazy(() => import('./structure/Hover'));

const Home = () => {
  const [store, setstore] = useState();
  // eslint-disable-next-line
  const [width, setWidth] = useState(0);

  const carousels = useRef();

  const secret1 = process.env.REACT_APP_API_SECRET_KEY;
  console.log(secret1)
  const payload_key = process.env.REACT_APP_API_PAYLOAD_KEY1;
  const payload_key2 = process.env.REACT_APP_API_PAYLOAD_KEY2;
  const head = process.env.REACT_APP_API_HEAD_KEY;
  const API = process.env.REACT_APP_API;
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

    console.log(jwt);
    axios.get(`${API}`, {
      headers: {
        'Content-Type': 'multipart/dataToPost',
        Authorization: `Bearer ${jwt}`
      }
    }
    )
      .then((response) => {
        setstore(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error posting data:', error);
      });
  };

  useEffect(() => {
    product_views();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (carousels.current) {
      setWidth(carousels.current.scrollWidth - carousels.current.offsetWidth);
    }
    // eslint-disable-next-line
  }, [carousels.current]);

  if (!store) {
    return <>
      <Loading />
    </>
  }

  return (
    <>
      <Suspense fallback={<div><Loading /></div>}>
        <div className="video-container">
          <video autoPlay loop muted>
            <source src={V1} type="video/mp4" width='100%' height='100%' />
          </video>
        </div>
        {/* <div  >
          <motion.div ref={carousels} className='carousel'>
            <motion.div drag='x' dragConstraints={{ right: 0, left: -width }} className='inner-carousel'>
              {carousels.current ?
                store.map((item, index) => (
                  <motion.div key={index} className='item'>
                    <Link to={`/product/${item.id}`}>
                      <Hover Img1={item.pro_image} Img2={item.col_pro_image[1]} />
                      <div className='describe'><p>{item.pro_desc}</p></div>
                      <div className='name'><p>{item.pro_name}</p></div>
                      <div className='price'><p>&#8377; : {item.price}</p></div>
                    </Link>
                  </motion.div>
                ))
                : ''
              }
            </motion.div>
          </motion.div>
        </div> */}
        <div className='product_container'>{
          store.map((item, index) => (
            <div className='product_box'>
              <div>
                <Link to={`/product/${item.id}`} className='flex_responsive'>
                  <Hover Img1={item.pro_image} Img2={item.col_pro_image[1]} />
                  <div>
                    <div className='describe'><p>{item.pro_desc}</p></div>
                    <div className='name'><p>{item.pro_name}</p></div>
                    <div className='price'><p>&#8377; : {item.price}</p></div></div>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className='space_button'></div>
        <div className='footer_img'>
          <img src={Img4} alt="" width='100%' />
        </div>
      </Suspense>

    </>
  )
}

export default Home