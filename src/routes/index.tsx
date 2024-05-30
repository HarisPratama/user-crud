import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';

import Home from '../pages/Home';
import DetailUser from '../pages/Detailuser';

const RouterComponent = () => {

	return (
		<Router>
			<Routes>
				<Route
                    path='/'
                    element={ <Home /> } 
                />
				<Route 
                    path='user/:id'
                    element={ <DetailUser /> } 
                />
			</Routes>
		</Router>
	);
};

export default RouterComponent;