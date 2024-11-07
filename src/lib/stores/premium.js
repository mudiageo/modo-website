import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const premiumStatus = writable(browser ? JSON.parse(localStorage.getItem('premiumStatus')) || {
  isPremium: false,
  features: [],
  expiresAt: null
} : null);

premiumStatus.subscribe((value) => {
  if (browser) {
    localStorage.setItem('premiumStatus', JSON.stringify(value));
  }
});