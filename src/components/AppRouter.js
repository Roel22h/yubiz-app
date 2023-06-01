import React from 'react';
import { NativeRouter, Route } from 'react-router-native';

import Main from './Main';
import NewDocument from './NewDocument/NewDocument'

const AppRouter = () => {
	return (
		<NativeRouter>
			<Route exact path="/" component={Main} />
			<Route exact path="/newDocument" component={NewDocument} />
		</NativeRouter>
	);
};

export default AppRouter;