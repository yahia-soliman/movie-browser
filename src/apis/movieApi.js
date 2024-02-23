import axios from "axios";

export const movieApi = axios.create({
 baseURL: 'https://api.themoviedb.org/3/movie',
});

movieApi.interceptors.request.use(function (req) {

	req.params = {
		...req.params,
		api_key: "your_api_key_goes_here",
	};
	return req;
});

export const getMoviesByPage = (page, language) => {
	return movieApi.get("/popular", { params:{page, language} })
};

export const getMovieDetails = (movie, language) => {
	return movieApi.get(`/${movie}`, { params:{language} })
};
