import { ConfigProvider, FloatButton } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { NavBar } from './components/Navigator';
import { Router } from './router';
import { LanguageContext } from './context/language';
import { useState } from 'react';



function App() {
	const [ lang, setLang ] = useState('en')
	return (
		<LanguageContext.Provider value={{ lang, setLang }} >
			<ConfigProvider direction={lang=='ar'? 'rtl': 'ltr'}>
				<BrowserRouter>
					<NavBar />
					<Router />
					<FloatButton.BackTop />
				</BrowserRouter>
			</ConfigProvider>
		</LanguageContext.Provider>
	);
}

export default App;
