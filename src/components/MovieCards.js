import { Col, Row, Rate, Card, Button, Progress } from 'antd';
import {
	LinkOutlined,
	HeartOutlined,
	HeartFilled
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addToList, removeFromList } from '../store/slices/wishlist';
import { LanguageContext } from '../context/language';


export function Poster({ movie, w, style }) {
	return (
		<img
			src={`https://image.tmdb.org/t/p/w${w || 500}/${movie.poster_path}`}
			style={style}
			alt={movie.title}
		/>
	)
};

export const Badge = ({ rand, label }) => {
	const colors = [
		"LightRed",
		"Purple",
		"Yellow",
		"Teal",
		"Pink",
		"Purple",
		"LightGreen",
		"Red",
		"Orange",
		"Magenta",
		"Violet",
		"DarkGreen",
		"LightGray",
		"Blue",
		"Lime",
		"OrangeRed",
		"Cyan",
		"Navy",
		"LightBlue",
		"DeepPink",
	]
	const bg = rand % colors.length;
	return <span
		style={{
			display: "inline-block",
			padding: '3px 6px',
			margin: '12px 8px 5px 0',
			backgroundColor: colors[bg],
			color: rand % 2 ? "White" : "Black",
			fontWeight: 500,
			borderRadius: '5px',
			boxShadow: '0px 0px 5px #444'
		}}
		key={label}
	>
		{label}
	</span>
}

export function MovieCard({ movie }) {
	const navigate = useNavigate();
	const {lang} = useContext(LanguageContext)

	return (
		<Card
			loading={!movie.id}
			style={{ position: 'relative' }}
			hoverable
			id={movie.id}
			onClick={() => navigate(`/movie/${movie.id}`)}
			cover={<Poster movie={movie} w={200} />}
		>
			<Card.Meta
				title={movie.title}
				description={movie.release_date || '-'} />
			<Progress
				type="circle" size={35}
				strokeColor='orange'
				style={{
					backgroundColor: 'white',
					borderRadius: '50%',
					position: 'absolute',
					right: lang == 'ar'? '78%': '7%',
					bottom: '80px'
				}}
				percent={Math.floor(movie.vote_average * 10)}
			/>
			<Heart movie={movie}
			offset={{ bottom: '3%', right: lang == 'ar'? '80%':'10%' }} />
		</Card>
	);
}
export const Heart = ({ movie, offset /*, toggler*/, size }) => {
	const [inFav, setFavState] = useState(null);
	const wishlist = useSelector(store => store.wishlist);
	const dispatch = useDispatch();
	const heartStyle = {
		color: 'black',
		position: 'absolute',
		fontSize: size || 22 + 'px',
		...offset
	}
	useEffect(() => {
		setFavState(wishlist.find(m => m.id === movie.id));
	}, [wishlist])
	return (
		<span style={heartStyle}>
			{inFav ?
				<HeartFilled
					onClick={(e) => {
						e.stopPropagation();
						//toggler(true, movie)
						dispatch(removeFromList(movie));
					}}
				/>
				:
				<HeartOutlined
					onClick={(e) => {
						e.stopPropagation();
						//toggler(false, movie)
						dispatch(addToList(movie));
					}}
				/>
			}
		</span>
	)
};

export const MovieCardLarge = ({ movie }) => {

	if (movie) return (
		<Row gutter={[16, 16]} loading={movie}>
			<Col span={24} md={9}>
				<Poster movie={movie} style={{ width: '100%', paddingTop: '5px' }} />
			</Col>
			<Col span={24} md={15}
				style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
				<div style={{ paddingBottom: '8px', borderBottom: '1px solid Gray', position: 'relative' }} >
					<Heart size={26} movie={movie} offset={{ bottom: '3%', right: '0' }} />
					<div style={{ display: 'flex', alignItems: 'center', marginBottom: "14px" }}>
						<p style={{ padding: 0, margin: "0 auto 0 0", fontSize: '32px' }}>{movie.title}</p>
						{movie.homepage && <Button
							danger size="small"
							shape="round"
							onClick={() => window.open(movie.homepage, '_blank')}
							icon={<LinkOutlined />}
						>web site</Button>}
					</div>
					<div>
						<Rate disabled allowHalf={true} value={movie.vote_average / 2} />
						<span style={{ fontSize: "16px", padding: "10px" }}> {movie.vote_count}</span>
					</div>
				</div>
				<p
					style={{ textAlign: "justify", fontSize: '16px' }}
				>{movie.overview}</p>
				<p style={{ margin: "10px 0" }}><strong style={{ paddingRight: "18px" }}>Duration: </strong>
					{movie.runtime} Min.
					<strong style={{ padding: "48px", paddingRight: "18px" }}>Languages: </strong>
					{movie.spoken_languages.map((a) => a.english_name).join(", ")}</p>
				<div>
					{movie.production_companies.map((item) => {
						return item.logo_path && <Poster
							key={item.id}
							movie={{
								...item,
								poster_path: item.logo_path
							}}
							style={{
								height: "32px",
								maxWidth: "200px",
								margin: "20px 16px 20px 0"
							}}
							w={200}
						/>
					})}
				</div>
				<div style={{}}>
					{movie.genres && movie.genres.map(({ id, name }) => <Badge key={id} rand={id} label={name} />)}
				</div>
			</Col>
		</Row>
	)
	else return <Card style={{ width: '100%', height: '80vh', margin: 'auto' }} loading={true} />
};
