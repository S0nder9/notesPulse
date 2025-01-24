"use client";
import { useEffect, useState } from "react";

export const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const updatedNotes = [...notes, { id: Date.now(), text: newNote.trim() }];
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setNewNote("");
  };

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  return (
    <div className="relative w-full max-w-sm mx-auto rounded-xl border border-gray-300 bg-white shadow-md transition-all">
      <input type="checkbox" id="dropdown" className="sr-only peer" />
      <label
        htmlFor="dropdown"
        className="flex justify-between items-center px-4 py-3 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-t-xl"
      >
        <span className="font-medium text-gray-700">Your Notes</span>
        <span className="text-xl transition-transform duration-300 peer-checked:rotate-180">
          ▼
        </span>
      </label>
      <ul className="max-h-80 overflow-y-auto px-4 py-2 transition-all duration-500 ease-out opacity-0 scale-95 peer-checked:opacity-100 peer-checked:scale-100 peer-checked:translate-y-0">
        {notes.length === 0 ? (
          <li className="text-gray-500 text-sm text-center">No notes yet!</li>
        ) : (
          notes.map((note) => (
            <li
              key={note.id}
              className="flex items-center justify-between gap-2 py-2"
            >
              <textarea
                readOnly
                value={note.text}
                className="flex-grow p-2 text-sm text-gray-700 border rounded-lg bg-gray-50 focus:outline-none focus:ring focus:ring-blue-200"
              />
              <button
                onClick={() => handleDeleteNote(note.id)}
                className="text-sm text-white bg-red-500 px-3 py-1 rounded-lg hover:bg-red-400"
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
      <div className="flex gap-2 p-4 bg-gray-100 rounded-b-xl">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a note"
          className="flex-grow p-2 text-sm border rounded-lg bg-gray-50 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={handleAddNote}
          className="px-4 py-2 text-sm text-white bg-green-500 rounded-lg hover:bg-green-400"
        >
          Add
        </button>
      </div>
    </div>
  );
};
