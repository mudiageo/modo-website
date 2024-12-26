import { browser } from '$app/environment';

import { dbStoreData } from '$lib/data/index.svelte.ts';

import type { Resource, Annotation, Flashcard } from '$lib/types';

 export const resourcesStore = dbStoreData('resources');
 
 let resources = $state<Resource[]>(resourcesStore.data?.resources || []);
 let annotations = $state<Annotation[]>(resourcesStore.data?.annotations || []);
 let flashcards = $state<Flashcard[]>(resourcesStore.data?.flashcards || []);



function saveToDb() {
  if (browser) {
    resourcesStore.data = { resources, annotations, flashcards };
  }
}

export function addResource(resource: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>) {
  const newResource: Resource = {
    ...resource,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  resources = [...resources, newResource];
  saveToDb();
  return newResource;
}

export function addAnnotation(annotation: Omit<Annotation, 'id' | 'createdAt'>) {
  const newAnnotation: Annotation = {
    ...annotation,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  };
  
  annotations = [...annotations, newAnnotation];
  saveToDb();
  return newAnnotation;
}

export function addFlashcard(flashcard: Omit<Flashcard, 'id'>) {
  const newFlashcard: Flashcard = {
    ...flashcard,
    id: crypto.randomUUID()
  };
  
  flashcards = [...flashcards, newFlashcard];
  saveToDb();
  return newFlashcard;
}
