export function addToSession(key: string, value: string) {
	sessionStorage.setItem(key, value);
}

export function getFromSession(key: string) {
	const value = sessionStorage.getItem(key);
	return value;
}
