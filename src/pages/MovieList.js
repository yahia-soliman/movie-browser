import { Col, Row, Pagination } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MoviesGrid } from '../components/MoviesGrid';
import { getMoviesByPage } from '../apis/movieApi';
import { LanguageContext } from '../context/language';
import { useContext } from "react";

export const MovieList = () => {
	const { page } = useParams();
	const navigate = useNavigate();
	const [movies, setMovies] = useState([]);
	const {lang} = useContext(LanguageContext);

	useEffect(() => {
		getMoviesByPage(page || 1, lang).then(({ data }) => {
			console.log("Rendering Movies");
			setMovies(data.results);
		});
	}, [page, lang]);

	return (<Row justify="center">
		<Col span={23} md={20} lg={17}>
		<h1>Popular Movies</h1>
		<hr /><br />
		</Col>
		<Col span={23} md={20} lg={17}>
		<MoviesGrid list={movies} navigate={navigate} />
		</Col>
		<Col span={24}
		style={{ textAlign: 'center', margin: '20px 0' }}>
		<Pagination
		total={20 * 500}
		showSizeChanger={false}
		pageSize={20}
		showQuickJumper
		current={page}
		onChange={(page) => navigate(`/movies/${page}`)}
		/>
		</Col>
		</Row>
	)
};
