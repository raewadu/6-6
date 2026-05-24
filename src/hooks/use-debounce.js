import { useEffect, useState } from 'react';

export const useDebounce = (initialValue, delay) => {
	const [value, setValue] = useState(initialValue);
	useEffect(() => {
		const timerId = setTimeout(() => setValue(initialValue), delay);

		return () => clearTimeout(timerId);
	}, [initialValue, delay]);
	return value;
};
