import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Compro = ({store ,totalprice,user ,productId,jwt}) => {
    const navigate = useNavigate();
    const image_api = process.env.REACT_APP_API_IMAGE;
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
    
  return (
    <>
    <div>
          <div class="container">
            <div class="flex-side">
              {
                store.map((item, index) => (
                  <div key={index}>
                    <div className='thumnail_image'>
                      <img src={`${image_api}/${item.pro_image}`} alt="" width='100%' />
                    </div>
                    <div className='coll_container'>
                      {
                        item.col_pro_image.map((item, index) => (
                          <div key={index}>
                            <div className='collection_image'>
                              <img src={`${image_api}/${item}`} alt="" width='100%' />
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                ))
              }
            </div>
            <div class="sticky-side">
              <div >
                <div className='product_name'><p>{store[0].pro_name}</p></div>
                <div className='product_desc'><p>{store[0].pro_desc}</p></div>
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
                  <div className='dis_price'><p><strike> {store[0].price}</strike></p></div>
                </div>
                <div className='addtocart' onClick={() => { addtocarthandlevalid() }}><p>Add To Cart</p></div>
                <div className='buynow'><p>Buy It Now</p></div>
              </div>
            </div>
          </div>
        </div>
        <div>

        </div>
    </>
  )
}

export default Compro