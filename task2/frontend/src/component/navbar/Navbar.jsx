import { Link } from 'react-router-dom';
import { BsSearch, BsBag } from 'react-icons/bs';
import './navbar.css';
import { useState, useEffect } from 'react';
import Img2 from '../component_image/logo/Wayout Logo_chn.png';
import Img3 from '../../component/component_image/logo/Wayout_content.png';
import { Fade, Slide } from "react-awesome-reveal";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { Sidebar, Menu, MenuItem, } from 'react-pro-sidebar';
import { VscThreeBars } from 'react-icons/vsc'
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [block, setBlock] = useState(false);
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 130) {
        setShowImage(false);
      } else {
        setShowImage(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const [menuOpen, setMenuOpen] = useState(false);


  const handleClick = () => {
    setMenuOpen(!menuOpen);
    setOpen(!open);
    setBlock(!block);
    if (!block) {
      document.body.style.overflow = 'hidden';
    }
    else {
      document.body.style.overflow = 'auto';
    }
  };

  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });

  const handleMenuItemClick = () => {
    setState(false); // Close the sliding pane
  };


  return (
    <>
      <div className='navbar'>

        <>
          <div >
            <div className={`image-container ${showImage ? 'show' : 'hide'} image1`} >
              <Slide>
                <div className='navbar_logo'><img src={Img3} alt="Imag 1" width='100%' /></div>
                <Fade>
                  <Slide delay='100'>
                    <div className='navbar_heart'><img src={Img2} alt="imh" width='100%' /></div></Slide></Fade>
              </Slide>
            </div>
            <div className={`navbar_heart image-container ${!showImage ? 'show' : 'hide'}`}>
              <Fade> <img src={Img2} alt="Imag 2" width='100%' /></Fade>
            </div>
          </div>
          <div className='list'>
            <ul>
              <li className='li_navbar'>
                <BsSearch />
              </li>
              {/* <li className='li_navbar'>
              <Link to='/'><BsBookmark /></Link>
            </li> */}
              <li className='li_navbar'>
                <Link ><BsBag /></Link>
              </li>
              <div className={`menu-btn ${menuOpen ? 'open' : ''}`} onClick={handleClick}>
                <div class="menu-btn__burger"></div>
              </div>
              <div>
                <div className='handburger'>
                  <div onClick={() => setState({ isPaneOpen: true })} className='handbuger_icons'>
                    <VscThreeBars size='25px' />
                  </div>
                  <SlidingPane
                    className="some-custom-class hello"
                    overlayClassName="some-custom-overlay-class"
                    isOpen={state.isPaneOpen}
                    onRequestClose={() => {
                      setState({ isPaneOpen: false });
                    }}
                  >
                    <ul className='items handburger_item'>
                      <Sidebar className='navbar_handburger' width='250px'>
                        <Menu className='navbar_menu'>
                          <MenuItem component={<Link to="/" />} onClick={handleMenuItemClick} className='navbar_menuiten'> Home</MenuItem>
                          <MenuItem component={<Link to="/about" />} onClick={handleMenuItemClick} className='navbar_menuiten'> ABOUT</MenuItem>
                          <MenuItem component={<Link to="/account/profile" />} onClick={handleMenuItemClick} className='navbar_menuiten'> MEMBER</MenuItem>
                          <MenuItem component={<Link to="/contact" />} onClick={handleMenuItemClick} className='navbar_menuiten'> CONTACT</MenuItem>
                          <MenuItem component={<Link to="/prebook" />} onClick={handleMenuItemClick} className='navbar_menuiten'> PRE_BOOK FRESH DRIP</MenuItem>
                          <MenuItem component={<Link to="/" />} onClick={handleMenuItemClick} className='navbar_menuiten'> SIZE CHART</MenuItem>
                          <MenuItem component={<Link to="/" />} onClick={handleMenuItemClick} className='navbar_menuiten'> FAQ</MenuItem>
                        </Menu>
                      </Sidebar>
                    </ul>
                    <br />
                  </SlidingPane>
                </div>
              </div>
            </ul>
          </div>
        </>

        {/* <button onClick={handleButtonClick}>Change Color</button> */}
      </div>
      {
        open ?
          <div className='handle'> <Slide direction='right'>
            <div className={`navbar_item ${!open ? 'opens' : ''}`}>
              <div className='blur'>
              </div>
              <div className='items_pages'>
                <ul>
                  <li className='item_li' onClick={handleClick}><Link to='/'>HOME</Link></li>
                  <li className='item_li' onClick={handleClick}><Link to='/about'>ABOUT US</Link></li>
                  {/* <li className='item_li' onClick={handleClick}><Link to='/'>PRODUCT</Link></li> */}
                  <li className='item_li' onClick={handleClick}><Link to='/account/profile'>MEMBER</Link></li>
                  <li className='item_li' onClick={handleClick}><Link to='/contact'>CONTACT</Link></li>
                  <li className='item_li' onClick={handleClick}><Link to='/prebook'>PRE_BOOK FRESH DRIP</Link></li>
                  <li className='item_li' onClick={handleClick}><Link to='/'>SIZE CHART</Link></li>
                  <li className='item_li' onClick={handleClick}><Link to='/'>FAQ</Link></li>
                </ul>
              </div>
            </div> </Slide>
          </div>
          :
          ''
      }


    </>
  )
}

export default Navbar