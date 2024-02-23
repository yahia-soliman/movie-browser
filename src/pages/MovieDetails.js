import { Col, Row } from 'antd';
import { getMovieDetails } from '../apis/movieApi';
import { MovieCardLarge } from '../components/MovieCards';
import { LanguageContext } from '../context/language';
import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

export const MovieDetails = () => {
	const { id } = useParams();
	const [movie, setMovie] = useState(null);
	const {lang} = useContext(LanguageContext);

	useEffect(() => {
		getMovieDetails(id, lang)
			.then( ({data}) => {console.log(data); setMovie(data)} )
	}, [id, lang])

	return (<Row justify="center">
		<Col span={23} md={20} lg={17}>
		<MovieCardLarge movie={movie}/>
		</Col>
		</Row>
	)
};
