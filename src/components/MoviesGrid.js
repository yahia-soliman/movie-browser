import { MovieCard } from './MovieCards';
import { Col, Row } from 'antd';


export const MoviesGrid = ({ list }) => {

	return (
		<Row gutter={[16, 16]} justify="center" span={8}>
		{list.map((movie) => {
			return (
				<Col span={12} lg={6} sm={8} key={movie.id}>
				<MovieCard movie={movie} />
				</Col>
			)
		})}
		</Row>
	)
};
