import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { activeNote, startDeletingNote } from "../../store/slices/notes";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
  const { active: note } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const [formValues, handleInputChange, reset] = useForm(note);
  const { title, body } = formValues;

  //Guarda un valor mutable
  const activeId = useRef(note.id);

  //Mostrar los datos en pantalla cada que seleccionan una nota diferente a la inicial
  useEffect(() => {
    //Si la note.id cambia, entonces se renderiza el compononte de notas y se hace esto para evitar ciclo infinito
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  //Actualiza nota activa en el estado
  useEffect(() => {
    dispatch(activeNote({ ...formValues }));
  }, [formValues, dispatch]);

  const handleDelete = () => {
    dispatch(startDeletingNote(note));
  };

  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
          onChange={handleInputChange}
          value={title}
          name="title"
        />
        <textarea
          placeholder="What happened today"
          className="notes__textarea"
          onChange={handleInputChange}
          value={body}
          name="body"
        />
        {note.url && (
          <div className="notes__image">
            <img src={note.url} alt="image" />
          </div>
        )}
      </div>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
