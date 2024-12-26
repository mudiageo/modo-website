

import { dbStoreData } from '$lib/data/index.svelte.ts';


export const notesStore = dbStoreData('notes');


export function createNote(note) {
  notesStore.add({
    ...note,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
}

export function updateNote(id, updates) {
  const notes = notesStore.data;
  const index = notes.findIndex(note => note.id === id);
  
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    notesStore.data = notes;
  }
}

export function deleteNote(id) {
  notesStore.delete(id);
}

export function searchNotes(query, tags = []) {
  const notes = notesStore.data;
  const searchTerm = query.toLowerCase();
  
  return notes.filter(note => {
    const matchesQuery = !query || 
      note.title.toLowerCase().includes(searchTerm) ||
      note.content.toLowerCase().includes(searchTerm);
      
    const matchesTags = !tags.length || 
      tags.every(tag => note.tags.includes(tag));
      
    return matchesQuery && matchesTags;
  });
}
