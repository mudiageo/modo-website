import { writable } from 'svelte/store';

export const notifications = writable([]);

export function addNotification(message, type = 'info', duration = 5000) {
  const id = Date.now();
  const notification = { id, message, type, duration };
  
  notifications.update(all => [notification, ...all]);
  
  setTimeout(() => {
    notifications.update(all => all.filter(n => n.id !== id));
  }, duration);
}