import { Button, Col, Row } from 'antd';
import { HeartOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux';
import { MoviesGrid } from '../components/MoviesGrid';
import { useNavigate } from 'react-router-dom';

export const WishList = () => {
	const movies = useSelector(store => store.wishlist);


	if (movies.length) return (
		<Row justify="center">
		<Col span={23} md={20} lg={17}>
		<h1>My Favorites</h1>
		<hr /><br />
		</Col>
		<Col span={23} md={20} lg={17}>
		<MoviesGrid list={movies} />
		</Col>
		</Row>
	)
	else return <EmptyWishList />
};

export const EmptyWishList = () => {
	const navigate = useNavigate();
	return (
		<Row justify="center">
			<Col style={{
				height: '80vh',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				color: 'lightgray'
			}}>
				<HeartOutlined style={{ fontSize: '250px' }} />
				<h2 style={{ fontSize: '24px', color: 'gray' }}>
					Oops! your wishlist is empty
				</h2>
				<Button size='large' block
					style={{
						color: '#444',
						backgroundColor: '#ffa500'
					}}
					onClick={()=> navigate("/")}
				>
					Have a look at most popular movies
				</Button>
			</Col>
		</Row>
	)
}