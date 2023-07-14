function invokeNotification(message, type) {
  const data = { message, type };

  const notifyEvent = new CustomEvent('notify', { detail: data });
  document.dispatchEvent(notifyEvent);
}

export const notify = {
  default(message) {
    invokeNotification(message, 'default');
  },
  success(message) {
    invokeNotification(message, 'success');
  },
  error(message) {
    invokeNotification(message, 'error');
  },
}