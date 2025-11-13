import {Link} from "react-router";
import {SquarePen, Trash2Icon} from "lucide-react";
import {formatDate} from "../lib/utils.js";
import api from "../lib/axios.js";
import toast from "react-hot-toast"
const NoteCard = ({note, setNotes}) =>{
    const handleDeleteNote = async (e, id) => {
        e.preventDefault();
        if(!window.confirm("Are you sure you want to delete this note?")){
            return;
        }
        try{
            await api.delete(`notes/${id}`);
            setNotes((prev)=>{prev.filter(note => note.id !== id)});
            toast
                .success("Note deleted");
        }catch(err){
            toast.error("Error in handleDelete", err);

        }
    }
    return <Link to={`/note/${note._id}`}
    className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]">
        <div className="card-body">
            <h3 className="card-title text-base-content">{note.title}</h3>
            <p className="text-base-content/10 line-clamp-3">{note.content}</p>
            <div className="card-actions justify-between items-center mt-4">
                <span className="text-sm text-base-content/60">{formatDate(note.createdAt)}</span>
                <div className="flex items-center gap-1">
                    <SquarePen className="size-4" />

                    <button className="btn btn-ghost btn-xs text-error">
                        <Trash2Icon className="size-4" onClick={(e) => handleDeleteNote(e, note._id)} />
                    </button>
                </div>
            </div>
        </div>
    </Link>
}

export default NoteCard;