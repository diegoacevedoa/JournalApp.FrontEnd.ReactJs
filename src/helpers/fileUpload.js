export const fileUpload = async (file) => {
  //API base URL del Servidor de Cloudinary de mi cuenta zchapuz.dlaa@gmail.com
  const cloudUrl = "https://api.cloudinary.com/v1_1/dslh7l4vw/upload";

  const formData = new FormData();
  formData.append("upload_preset", "react-journal");
  formData.append("file", file);

  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });

    if (resp.ok) {
      const cludResp = await resp.json();

      //return cludResp.secure_url;
      return cludResp;
    } else {
      throw await resp.json();
    }
  } catch (error) {
    throw error;
  }
};
