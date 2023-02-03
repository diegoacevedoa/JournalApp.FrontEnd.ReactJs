import { useDispatch, useSelector } from "react-redux";
import { startSaveNote, startUploadingImage } from "../../store/slices/notes";

export const NotesAppBar = () => {
  const { active: note } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(startSaveNote(note));
  };

  const handlePictureUpload = () => {
    //Simulamos el click del control input tipo file
    document.querySelector("#fileSelector").click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      dispatch(startUploadingImage(file, note));
    } else {
      console.log("No se seleccionó ningún archivo.");
    }
  };

  return (
    <div className="notes__appbar">
      <span>28 de agosto de 2020</span>
      <input
        id="fileSelector"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div>
        <button className="btn" onClick={handlePictureUpload}>
          picture
        </button>
        <button className="btn" onClick={handleSave}>
          save
        </button>
      </div>
    </div>
  );
};
