import P1 from './pic1 (1).png';
import P2 from './pic1 (2).png';
import './prebook.css';
const Prebook = () => {
  return (
    <>
    <div>
        <img src={P2} alt="" width='100%'/>
    </div>
    <div className='container_pre_book'>
        <div className='pre_img'><img src={P1} alt="" width='100%'/></div>
        <div className='pre_content'><p>Coming soon.....</p></div>
    </div>
    </>
  )
}

export default Prebook