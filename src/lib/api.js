import axios from 'axios';
const createApi = () =>
	axios.create({
		baseURL: 'https://shoplab-geeks.up.railway.app/api/v1',
		headers: {
			'Content-Type': 'application/json',
		},
	});

const $mainApi = createApi();
const $authApi = createApi();

$authApi.interceptors.request.use((config) => {
	const accessToken = localStorage.getItem('access_token');
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});

$authApi.interceptors.response.use(
	(config) => {
		config;
	},
	async (error) => {
		const originalRequest = error.config;
		if (
			error.response.status === 401 &&
			originalRequest &&
			!originalRequest._isRetry
		) {
			originalRequest._isRetry = true;
			try {
				const { data } = await $mainApi.post('/auth/refresh');

				if (data.accessToken) {
					localStorage.setItem('access_token', data.accessToken);
				}
				return $authApi.request(originalRequest);
			} catch (err) {
				localStorage.removeItem('access_token');
				return Promise.reject(err);
			}
		}
		return Promise.reject(error);
	},
);

export { $mainApi, $authApi };
