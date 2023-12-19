import { useState, Suspense } from 'react';
import Loading from '../../../component/loading/Loading';
function Hover({ Img1, Img2 }) {
  const [isHovered, setIsHovered] = useState(true);

  const handleMouseEnter = () => {
    setIsHovered(false);
  };

  const handleMouseLeave = () => {
    setIsHovered(true);
  };
  const image_api = process.env.REACT_APP_API_IMAGE;

  return (
    <Suspense fallback={<Loading />}>
    <div className="div-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <img
        src={`${image_api}/${isHovered ? Img1 : Img2}`}
        alt="Iage"
        className={`image ${isHovered ? '' : 'hovered'}`}
      />
    </div>
    </Suspense>
  );
}

export default Hover;
