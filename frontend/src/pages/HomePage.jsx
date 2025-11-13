import NavBar from "../components/NavBar.jsx";
import {useEffect, useState} from "react";
import RateLimitedUI from "../components/RateLimited.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard.jsx";
import api from "../lib/axios.js";
import NotesNotFound from "../components/NotesNotFound.jsx";

const HomePage = () =>{
    const [isRateLimited, setRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try{
                const res = await api.get("/notes");
                setNotes(res.data);
                setRateLimited(false)
            }catch(err){
                console.log(err.message);
                if(err.response?.status === 429){
                    setRateLimited(true)
                }else{
                    toast.error("Failed to load notes")
                }
            }finally {
                setLoading(false);
            }
        }

        fetchNotes();
    }, []);

    return <div className="min-h-screen">
        <NavBar/>

        {isRateLimited && <RateLimitedUI/>}
        {notes.length === 0 && !isRateLimited && <NotesNotFound />}
        <div className="max-w-7xl mx-auto p-4 mt-6">
            {loading && <div className="text-center text-primary py-10">Loading notes...</div>}
            {notes.length > 0 && !isRateLimited && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {notes.map((note) =>(
                       <NoteCard key={note._id} note={note} setNotes={setNotes}/>
                    ))}
                </div>
            )}
        </div>
    </div>;
}

export default HomePage;