import {
  db,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "../../../firebase/firebase-config";
import {
  activeNote,
  addNewNote,
  deleteNote,
  loadNotes,
  updateNote,
} from "./notesSlice";
import Swal from "sweetalert2";
import { fileUpload } from "../../../helpers/fileUpload";
import { fileDelete } from "../../../helpers/fileDelete";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const doc = await addDoc(collection(db, `${uid}/journal/notes`), newNote);

    dispatch(activeNote({ id: doc.id, ...newNote }));

    dispatch(addNewNote({ id: doc.id, ...newNote }));
  };
};

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notesSnap = await getDocs(collection(db, `${uid}/journal/notes`));
    const notes = [];
    notesSnap.forEach((snapHijo) => {
      notes.push({
        id: snapHijo.id,
        ...snapHijo.data(),
      });
    });

    dispatch(loadNotes(notes));
  };
};

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    //Clonamos el objeto note para poder modificarlo
    const noteToFirestore = { ...note };

    if (!noteToFirestore.url) {
      delete noteToFirestore.url;
    }

    //Removemos el campo id del objeto
    delete noteToFirestore.id;

    const noteRef = doc(db, `${uid}/journal/notes/${note.id}`);

    //Guardamos la nota en la db
    await updateDoc(noteRef, noteToFirestore);

    //Guardamos la nota en Redux para que refresque la lista de notas
    dispatch(updateNote({ id: note.id, ...noteToFirestore }));

    Swal.fire("Saved", note.title, "success");
  };
};

export const startUploadingImage = (file, note) => {
  return async (dispatch) => {
    Swal.fire({
      title: "Uploading...",
      text: "Please wait...",
      allowOutsideClick: false,
    });

    Swal.showLoading();

    const respfile = await fileUpload(file);
    console.log(respfile);
    //Clonamos el objeto note para poder modificarlo
    const noteToUrl = { ...note };

    noteToUrl.url = respfile.secure_url;
    noteToUrl.imageId = respfile.public_id;

    dispatch(startSaveNote(noteToUrl));

    dispatch(activeNote(noteToUrl));

    Swal.close();
  };
};

export const startDeletingNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const noteRef = doc(db, `${uid}/journal/notes/${note.id}`);

    //Eliminamos la nota en la db
    await deleteDoc(noteRef);

    //Eliminamos la imagen de cloudinary
    // if (note.imageId) {
    //   await fileDelete(note.imageId);
    // }

    dispatch(deleteNote(note.id));

    Swal.fire("Deleted", note.title, "success");
  };
};
