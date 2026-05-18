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

export { $mainApi, $authApi };
