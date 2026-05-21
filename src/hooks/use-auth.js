import { create } from 'zustand';

export const useAuth = create((set) => ({
	user: null,
	isAuth: false,

	setUser: (user) => set({ user }),
	setAuth: (bool) => set({ isAuth: bool }),
	clear: () =>
		set({
			user: null,
			isAuth: false,
		}),
}));
