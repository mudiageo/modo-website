import { initDB } from '$lib/db/idb'
import { browser } from '$app/environment'
const populateData = async (store) => {
   const db = await initDB();
   const value = await db.getAll(store);
   if (!value) return
   
   return  store === 'tasks' || store === 'studySessions' ? value : value[0]
}
export const dbStoreData = (store) => {
	let data = $state([]);
	
	if (browser) {
		populateData(store).then(value => {
				data = value
		})
	}
	return {
		add: (newData) => {
			if (browser) {
				initDB().then((db) => {
					db.add(store, { ...newData, id: Date.now() });
					data.push(newData)
					console.log(data)
				});
			}
		},
		set data(value) {
			data = value;
			if (browser) {
				initDB().then((db) => db.put(store, value));
			}
		},
		get data() {
		  return data
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


export const settingsStore = dbStoreData('settings');
export const profileStore = dbStoreData('profile');
export const tasksStore = dbStoreData('tasks');
export const studySessionsStore = dbStoreData('studySessions');
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
  preferredTimeStart: 9,
  preferredTimeEnd: 17,
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

studyData.subscribe(value => {
  if (browser) {
    localStorage.setItem('studyData', JSON.stringify(value));
  }
});