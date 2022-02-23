// import React, { useRef, useState } from 'react';
// import 'react-image-crop/dist/ReactCrop.css';
// import Cropper from 'react-easy-crop';
// const CONTAINER_HEIGHT = 300;

// interface Props {
//   image?: string;
// }

// const CropImage = (props: Props) => {
//   const { image } = props;
//   const inputRef = useRef();
//   const triggerFileSelectPopup = () => inputRef.current.click();
//   return (
//     <>
//       {image ? (
//         <Cropper
//           image={image}
//           crop={crop}
//           zoom={zoom}
//           onCropChange={onCropChange}
//           onZoomChange={onZoomChange}
//           onMediaLoaded={(mediaSize) => {
//             onZoomChange(CONTAINER_HEIGHT / mediaSize.naturalHeight);
//           }}
//         />
//       ) : null}
//     </>
//   );
// };

// export default CropImage;
import React from 'react';

const CropImage = () => {
  return <div></div>;
};

export default CropImage;
