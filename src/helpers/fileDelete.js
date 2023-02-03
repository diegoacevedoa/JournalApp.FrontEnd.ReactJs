import axios from "axios";

export const fileDelete = async (imageId) => {
  try {
    const cloudUrl =
      "https://api.cloudinary.com/v1_1/dslh7l4vw/resources/image/upload/";
    // const cloudUrl =
    //   "http://api.cloudinary.com/v1_1/dslh7l4vw/resources/image/upload/";

    const formData = new FormData();
    formData.append("public_ids[]", imageId);

    const headers = new Headers();
    // headers.append("Content-type", "multipart/form-data;");
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append(
      "Authorization",
      "Basic NjExMjEzODE0NDQ4NDI2OjljQlFSU3hEcmpWMjJseXM0VTBFckpIM0czcw=="
    );

    // const resp = await fetch(cloudUrl, {
    //   method: "DELETE",
    //   //   headers: {
    //   //     "Content-type": "multipart/form-data",
    //   //     // "Content-Length": imageId.length,
    //   //     "Access-Control-Allow-Origin": "*",
    //   //     // Host: "http://127.0.0.1:5173/",
    //   //     // Acept: "multipart/form-data",
    //   //     // "Access-Control-Allow-Origin": "http://127.0.0.1:1/",
    //   //     // "Access-Control-Allow-Origin": "http://127.0.0.1:5173/",
    //   //     // "Access-Control-Allow-Origin": "http://localhost:5173/",
    //   //     // "Access-Control-Allow-Headers":
    //   //     //   "Content-Type,Content-Length,Server,Date",
    //   //     // "Access-Control-Allow-Methods":
    //   //     //   "GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH",
    //   //     Authorization:
    //   //       "Basic NjExMjEzODE0NDQ4NDI2OjljQlFSU3hEcmpWMjJseXM0VTBFckpIM0czcw==",
    //   //   },
    //   headers: headers,
    //   //   mode: "no-cors",
    //   mode: "cors",
    //   body: formData,
    // });

    // const apiAxios = axios.create({
    //   //   method: "DELETE",
    //   baseURL: cloudUrl,
    //   headers: headers,
    //   //   body: formData,
    // });

    // console.log(apiAxios);

    // const resp = await apiAxios.get();

    // const resp = await apiAxios();

    // const resp = await axios({
    //   method: "delete",
    //   headers: headers,
    //   url: cloudUrl,
    //   data: formData,
    // });

    // console.log(headers.get("Access-Control-Allow-Origin"));

    // const resp = await axios({
    //   method: "get",
    //   headers: headers,
    //   url: "https://api.cloudinary.com/v1_1/dslh7l4vw/resources/image",
    // });

    // const config = {
    //   headers: headers,
    // };

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization:
          "Basic NjExMjEzODE0NDQ4NDI2OjljQlFSU3hEcmpWMjJseXM0VTBFckpIM0czcw==",
      },
    };

    const url = "https://api.cloudinary.com/v1_1/dslh7l4vw/resources/image";

    const resp = await axios.get(url, config);

    console.log(resp);

    if (resp.ok) {
      //   const cludResp = await resp.json();
      const cludResp = resp.data();

      //return cludResp.secure_url;
      return cludResp;
    } else {
      throw await resp.json();
    }
  } catch (error) {
    throw error;
  }
};
