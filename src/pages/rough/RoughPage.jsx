// import ImgCrop from "antd-img-crop";
// import React, { useState } from "react";
// import { Upload } from "antd";
// const App = () => {
//   const [fileList, setFileList] = useState([
//     {
//       uid: "-1",
//       name: "image.png",
//       status: "done",
//       url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//     },
//   ]);
//   const onChange = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//   };
//   const onPreview = async (file) => {
//     let src = file.url;
//     if (!src) {
//       src = await new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file.originFileObj);
//         reader.onload = () => resolve(reader.result);
//       });
//     }
//     const image = new Image();
//     image.src = src;
//     const imgWindow = window.open(src);
//     imgWindow?.document.write(image.outerHTML);
//   };
//   return (
//     <ImgCrop rotationSlider cropShape="round" showReset>
//       <Upload
//         action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
//         listType="picture-card"
//         fileList={fileList}
//         onChange={onChange}
//         onPreview={onPreview}
//       >
//         {fileList.length < 5 && "+ Upload"}
//       </Upload>
//     </ImgCrop>
//   );
// };
// export default App;

import UploadBtn from "@/components/button/UploadBtn";
import { API_URL } from "@/config/api.routes";
import { Button } from "antd";
import axios from "axios";
import { useState } from "react";

export default function RoughPage() {
  const [image, setImage] = useState();

  const onPublish = async () => {
    if (image)
      try {
        const formData = new FormData();

        formData.append("user_picture", image);

        const url = `${API_URL}/rough/upload/user_picture`;
        //   const url = `${API_URL}/user/customize`;
        const { data } = await axios.post(url, formData);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    else console.log("image not present");
  };

  const uploadImg = (field_name, info) => {
    console.log(info);
    console.log(info.file.originFileObj);
    // Display preview of the first uploaded image
    if (info.fileList.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {};
      reader.readAsDataURL(
        info.fileList[info.fileList.length - 1].originFileObj
      );
    }
    // onPublish(info.file.originFileObj);
    setImage(info.file.originFileObj);
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        flexDirection: "column",
        display: "flex",
        gap: 12,
      }}
    >
      <UploadBtn uploadImg={uploadImg} roundCrop title={"UPLOAD"} />
      <Button type="primary" onClick={onPublish}>
        PUBLISH
      </Button>
    </div>
  );
}

// export default function RoughPage() {
//   const [img, setImg] = useState();
//   const onPublish = async () => {
//     try {
//       console.log(img);
//       const formData = new FormData();

//       formData.append("user_picture", img);

//       const url = `${API_URL}/rough/upload/user_picture`;
//       //   const url = `${API_URL}/user/customize`;
//       const { data } = await axios.post(url, formData);
//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div
//       style={{
//         maxWidth: "500px",
//         flexDirection: "column",
//         display: "flex",
//         gap: 12,
//       }}
//     >
//       <input
//         onChange={(e) => setImg(e.target.files[0])}
//         type="file"
//         name="user_picture"
//         accept="image/*"
//       />
//       <Button type="primary" onClick={onPublish}>
//         UPLOAD
//       </Button>
//     </div>
//   );
// }
