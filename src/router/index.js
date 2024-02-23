import { Route, Routes } from 'react-router-dom';
import {
	MovieList,
	MovieDetails,
	WishList,
	Register
} from '../pages';

export const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<MovieList />} />
			<Route path="/movies/:page" element={<MovieList />} />
			<Route path="movie/:id" element={<MovieDetails />} />
			<Route path="/wish-list" element={<WishList />} />
			<Route path="/register" element={<Register />} />
			<Route path="*" element={<p>404 page</p>} />
		</Routes>
	)
}
