import { Badge, Button, Tabs, Menu, Row, Col } from 'antd';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {
	AndroidOutlined, AppleOutlined,
	HeartFilled, CameraFilled,
} from '@ant-design/icons';
import React, { useContext } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Switch, Space } from 'antd';
import { LanguageContext } from '../context/language';

export const LangSwitch = () => {
	const {setLang} = useContext(LanguageContext);
    return <Switch
	checkedChildren="ar"
	unCheckedChildren="en"
	onChange={(bool)=> setLang(bool? 'ar': 'en')}
	/>
};

export const NavBar = () => {
	const navigate = useNavigate();
	const wishlistCount = useSelector((store) => store.wishlist.length)
	return <Row justify="center"
	style={{
		backgroundColor:"LightGray", height: "40px",
		marginBottom: '16px',
	}}>
		<Col span={23} md={20} lg={17}
		style={{
			display:'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
		}}>
		<CameraFilled  style={{color: '#f66', fontSize: '28px'}}
			onClick={()=> navigate("/")}
		/>

	 	<LangSwitch />

	 <Badge size="small" color="purple"
	count={wishlistCount} offset={[-6, 2]}>
		<Button
			shape='square'
			onClick={() => navigate('/wish-list')}
			style={{
				backgroundColor: '#f66',
				height: '30px',
				padding: '0px 12px'
				
			}}
			icon={<HeartFilled style={{fontSize: '15px'}}/>}
			>Wishlist</Button>
    </Badge>
		</Col>
	</Row>
};

export const Navigator = () => (
  <Tabs
    defaultActiveKey="2"
    items={[AppleOutlined, AndroidOutlined].map((Icon, i) => {
      const id = String(i + 1);
      return {
        key: id,
        label: `Tab ${id}`,
        children: `Tab ${id}`,
        icon: <Icon />,
      };
    })}
  />
);
const items = [
	{ key: "Home", label: "Home" },
	{ key: "About", label: "About" },
	{ key: "Favourites", label: "Fav" },
];
export const NavMenu = () => (
	 <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
    />
)
