import { openDB } from 'idb';

const DB_NAME = 'studyai_db';
const DB_VERSION = 1;

export async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Tasks store
      if (!db.objectStoreNames.contains('tasks')) {
        const taskStore = db.createObjectStore('tasks', { keyPath: 'id' });
        taskStore.createIndex('dueDate', 'dueDate');
        taskStore.createIndex('priority', 'priority');
      }

      // Study sessions store
      if (!db.objectStoreNames.contains('studySessions')) {
        const sessionStore = db.createObjectStore('studySessions', { keyPath: 'id' });
        sessionStore.createIndex('date', 'date');
      }

      // Progress store
      if (!db.objectStoreNames.contains('progress')) {
        db.createObjectStore('progress', { keyPath: 'date' });
      }
    }
  });
}

export async function addTask(task) {
  const db = await initDB();
  return db.add('tasks', { ...task, id: Date.now() });
}

export async function getTasks() {
  const db = await initDB();
  return db.getAll('tasks');
}

export async function updateTask(task) {
  const db = await initDB();
  return db.put('tasks', task);
}

export async function deleteTask(id) {
  const db = await initDB();
  return db.delete('tasks', id);
}

export async function addStudySession(session) {
  const db = await initDB();
  return db.add('studySessions', { ...session, id: Date.now() });
}

export async function getStudySessions(date) {
  const db = await initDB();
  const index = db.transaction('studySessions').store.index('date');
  return index.getAll(date);
}

export async function updateProgress(progress) {
  const db = await initDB();
  return db.put('progress', progress);
}

export async function getProgress(date) {
  const db = await initDB();
  return db.get('progress', date);
}