import { initDB } from '$lib/db/idb';
import { browser } from '$app/environment';
const populateData = async (store) => {
	const db = await initDB();
	const value = await db.getAll(store);
	if (!value) return;

	return store !== 'profile' || store !== 'settings' ? value : value[0];
};
export const getFromStoreWhere = async (store, value) => {
	const db = await initDB();
	const tx = db.transaction(store, 'readwrite');

	const data = [];
	console.log(tx.store.iterate());
	for await (const cursor of tx.store.iterate(value)) {
		const row = { ...cursor.value };
		data.push(row);
		console.log(cursor.value);
		console.log(data);
	}
	await tx.done;
};
export const getFromStoreIndexWhere = async (store, storeIndex, value) => {
	const db = await initDB();
	const tx = db.transaction(store, 'readwrite');
	const index = tx.store.index(storeIndex);
	const data = [];
	for await (const cursor of index.iterate(value)) {
		const row = { ...cursor.value };
		data.push(row);
		console.log(cursor.value);
	console.log(data);
	}
	await tx.done;
};
export const dbStoreData = (store, storeKey = "") => {
	let data = $state([]);

	if (browser) {
		getFromStoreIndexWhere('studySessions', 'date', '');
		populateData(store).then((value) => {
			console.log(store)
			console.log(value)

			data = value || data;
		});
	}
	return {
		add: (newData) => {
			if (browser) {
				initDB().then((db) => {
					db.add(store, {id: Date.now(), ...$state.snapshot(newData)});
					data.push(newData);
				});
			}
		},
		put: (newData) => {
			if (browser) {
				initDB().then((db) => {
					db.put(store, $state.snapshot(newData), storeKey);
					data = [...data, newData];
					console.log(data);
				});
			}
		},
		set data(value) {
			data = value;
			if (browser) {
			  console.log(storeKey)
				initDB().then((db) => db.put(store, $state.snapshot(value), storeKey));
			}
		},
		get data() {
			return data;
		},
		select: (id) => {
			return data?.find((value) => value.id === id);
		},
		delete: (id) => {
			if (browser) {
				initDB().then((db) => db.delete(store, id));
				data?.filter((value, index, arr) => {
					if (value.id === id) {
						// Removes the value from the original array
						arr.splice(index, 1);
						return true;
					}
				});
			}
		}
	};
};

export const settingsStore = dbStoreData('settings', "settings");
export const profileStore = dbStoreData('profile', "profile");
export const tasksStore = dbStoreData('tasks');
export const coursesStore = dbStoreData('courses');

export const studySessionsStore = (() => { 
  let activeSession = $state(null)
  
 const initStore = dbStoreData('studySessions')
 return {
   ...initStore,
   get active (){
     return activeSession
   },
   set active (session){
     activeSession = session
   }
 }
  
  
})();
export const progressStore = dbStoreData('progress');
export const recommendationsStore = dbStoreData('recommendations');
export const quotesStore = dbStoreData('quotes');

import { writable } from 'svelte/store';

const defaultData = {
	studyTime: 0,
	taskCount: 0,
	completionRate: 0,
	focusScore: 0,
	subjectPerformance: [],
	weekdayPatterns: Array(7).fill(0),
	preferredTimeStart: '09:00',
	preferredTimeEnd: '17:00',
	averageSessionLength: 30,
	taskCompletionRate: 0,
	studyTimePreference: 12,
	stressLevel: 5,
	breakFrequency: 30,
	subjectStrengths: {}
};

export const studyData = writable(
	browser ? JSON.parse(localStorage.getItem('studyData')) || defaultData : defaultData
);

studyData.subscribe((value) => {
	if (browser) {
		localStorage.setItem('studyData', JSON.stringify(value));
	}
});

import type { StudySession } from '$lib/types';

interface ActiveSession {
	startTime: Date;
	subject: string;
	breaks: number;
	timer: number;
	isBreak: boolean;
}

 let activeSession = $state<ActiveSession | null>(null);


export function startSession(courde: string) {
	activeSession = {
		startTime: new Date(),
		course,
		breaks: 0,
		timer: 0,
		isBreak: false
	};
}

export function endSession(focusScore: number, mood: string, notes?: string) {

		if (activeSession) {
			const endTime = new Date();
			const duration = Math.floor((endTime.getTime() - activeSession.startTime.getTime()) / 60000);

			const newSession: StudySession = {
				id: crypto.randomUUID(),
				startTime: activeSession.startTime,
				endTime,
				duration,
				course: activeSession.course,
				createdAt: new Date(),
				focusScore,
				breaksTaken: activeSession.breaks,
				mood: mood as StudySession['mood'],
				notes
			};

			studySessionsStore.add(newSession);
		}
		activeSession = null
}
 