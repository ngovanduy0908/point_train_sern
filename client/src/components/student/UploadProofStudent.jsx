import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
const DOMAIN = process.env.REACT_APP_DOMAIN;

const UploadProofStudent = ({
  maHK,
  maSv,
  selectedFiles,
  setSelectedFiles,
  handleChangeFile,
  setHandleChangeFile,
  chooseFiles,
  setChooseFiles,
  handleUpload,
}) => {
  const theme = useTheme();
  // const [selectedFiles, setSelectedFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [handleChangeFile, setHandleChangeFile] = useState(false);
  //   TODO sẽ có initvalue gắn vào đây.
  // const [chooseFiles, setChooseFiles] = useState([]);
  const getProofStudent = async () => {
    try {
      setLoading(true);
      const result = await axios.get(
        `${DOMAIN}/proof_mark/get_proof/${maHK}/${maSv}`,
        {
          withCredentials: true,
        }
      );
      // console.log(result.data[0] ? result.data[0].name_image.split(",") : []);
      // console.log(result.data[0]);
      setChooseFiles(
        result.data[0].name_img ? result.data[0].name_img.split(",") : []
      );
      if (result.data[0].name_img) {
        const value = result.data[0].name_img.split(",").map((item) => ({
          file: item,
          url: `/upload/${item}`,
        }));
        console.log("values: ", value);
        setImages((prev) => [...prev, ...value]);
        // console.log("uniqueImages: ", uniqueImages);
        // setChooseFiles((prev) => [
        //   ...prev,
        //   ...result.data[0].name_img.split(","),
        // ]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProofStudent();
  }, []);

  const handleFileChange = async (e) => {
    setHandleChangeFile(true);
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);
    const fileUrls = files.map((file) => ({
      file: file.name,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...fileUrls]);
    // console.log("chooseFiles: ", chooseFiles);
    // setChooseFiles((prev) => [...prev, ...fileUrls]);
  };

  // const handleUpload = async () => {
  //   // TODO khi file change thì mới call api upload img
  //   let file_img = null;
  //   let choose_file = chooseFiles;
  //   // console.log("choose_file: ", choose_file);
  //   if (handleChangeFile) {
  //     const formData = new FormData();
  //     selectedFiles.forEach((file) => {
  //       formData.append("images", file);
  //     });

  //     try {
  //       await axios.post(`${DOMAIN}/upload`, formData).then(async (res) => {
  //         file_img = res.data.join(",");
  //         choose_file = [...chooseFiles, file_img];
  //         const values = {
  //           name_image: choose_file.length ? choose_file.join(",") : "",
  //           maSv: maSv,
  //         };
  //         console.log("values: ", choose_file);
  //         await axios
  //           .post(
  //             `${DOMAIN}/proof_mark/create_or_update_proof/${maHK}`,
  //             values,
  //             {
  //               withCredentials: true,
  //             }
  //           )
  //           .then(async (res) => {
  //             toast.success(res.data);
  //           });
  //       });
  //     } catch (error) {
  //       console.error("Upload error:", error);
  //     }
  //   } else {
  //     try {
  //       const values = {
  //         name_image: chooseFiles.length ? chooseFiles.join(",") : "",
  //         maSv: maSv,
  //       };
  //       await axios
  //         .post(`${DOMAIN}/proof_mark/create_or_update_proof/${maHK}`, values, {
  //           withCredentials: true,
  //         })
  //         .then(async (res) => {
  //           toast.success(res.data);
  //         });
  //     } catch (error) {
  //       console.error("Upload error:", error);
  //     }
  //   }
  // };

  const handleClickDelete = async (index) => {
    setImages((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setChooseFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    // setHandleChangeFile(false);
  };
  // console.log("chooseFiles: ", chooseFiles);
  return (
    <div className="text-gray-900">
      {/* <h1 className="text-[15px] font-bold">Upload Minh Chứng</h1> */}
      <div>
        <div className="flex mb-[8px]">
          <input
            type="file"
            multiple
            accept=".jpg, .png, .jpeg, .svg"
            onChange={handleFileChange}
            className="w-[50%] m-auto"
          />
        </div>
        {loading ? (
          <div className="flex items-center justify-center my-3">
            <CircularProgress />
          </div>
        ) : images.length ? (
          <div
            className="p-2 border-gray-800 rounded-lg max-h-[70vh] overflow-auto"
            style={{
              border: "2px solid",
            }}
          >
            <div className="flex flex-col gap-2 items-center justify-center">
              {images.map((image, index) => {
                console.log("item: ", image);
                return (
                  <div>
                    <span
                      style={{
                        color: `${theme.palette.secondary[100]}`,
                      }}
                    >
                      Tên ảnh: <strong>{image.file}</strong>
                    </span>
                    <div className="cursor-pointer relative a">
                      <img
                        key={index}
                        src={image.url}
                        alt={`Uploaded ${index}`}
                        width="500"
                        className="object-contain transition ease-in-out  duration-[300ms]  hover:opacity-80"
                      />
                      <div className="absolute w-full h-full top-0 b">
                        <span className="absolute w-full h-full text-[50px] bg-red-100/50">
                          <i
                            className="absolute top-[50%] left-[50%]  fa-solid fa-trash"
                            onClick={() => handleClickDelete(index)}
                          ></i>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
        <div className="text-center mt-2">
          <button className="" onClick={handleUpload}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadProofStudent;
