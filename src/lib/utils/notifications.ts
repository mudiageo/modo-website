export async function setupNotifications() {
	if (!('Notification' in window)) {
		console.log('This browser does not support notifications');
		return false;
	}

	if (Notification.permission === 'granted') {
		return true;
	}

	if (Notification.permission !== 'denied') {
		const permission = await Notification.requestPermission();
		return permission === 'granted';
	}

	return false;
}

export function scheduleNotification(title, options, delay) {
	if (Notification.permission !== 'granted') return;

	setTimeout(() => {
		const notification = new Notification(title, {
			icon: '/icon-192.png',
			badge: '/icon-192.png',
			...options
		});

		if (options.onClick) {
			notification.onclick = options.onClick;
		}
	}, delay);
}

export function scheduleTaskReminder(task, settings) {
	if (!settings.tasks.enabled) return;

	const dueDate = new Date(task.dueDate);
	const reminderTime = dueDate.getTime() - settings.tasks.before * 60 * 1000;
	const now = Date.now();

	if (reminderTime > now) {
		scheduleNotification(
			'Task Reminder',
			{
				body: `"${task.title}" is due in ${settings.tasks.before} minutes`,
				silent: !settings.tasks.sound,
				onClick: () => (window.location.href = '/app/tasks')
			},
			reminderTime - now
		);
	}
}

export function scheduleStudySessionReminder(session, settings) {
	if (!settings.schedule.enabled) return;

	const startTime = new Date(session.startTime);
	const reminderTime = startTime.getTime() - settings.schedule.before * 60 * 1000;
	const now = Date.now();

	if (reminderTime > now) {
		scheduleNotification(
			'Study Session Reminder',
			{
				body: `Your study session for "${session.subject}" starts in ${settings.schedule.before} minutes`,
				silent: !settings.schedule.sound,
				onClick: () => (window.location.href = '/app/schedule')
			},
			reminderTime - now
		);
	}
}

export function setupDailyStudyReminder(settings) {
	if (!settings.studyReminders.enabled) return;

	const [hours, minutes] = settings.studyReminders.time.split(':');
	const now = new Date();
	const reminderTime = new Date();
	reminderTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

	if (reminderTime < now) {
		reminderTime.setDate(reminderTime.getDate() + 1);
	}

	if (
		(settings.studyReminders.frequency === 'weekdays' && reminderTime.getDay() === 0) ||
		reminderTime.getDay() === 6
	) {
		reminderTime.setDate(reminderTime.getDate() + (reminderTime.getDay() === 0 ? 1 : 2));
	}

	scheduleNotification(
		'Daily Study Reminder',
		{
			body: "It's time to start your study session!",
			silent: !settings.schedule.sound,
			onClick: () => (window.location.href = '/app/schedule')
		},
		reminderTime.getTime() - now.getTime()
	);
}
