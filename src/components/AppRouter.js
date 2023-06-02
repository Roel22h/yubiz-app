import React, { useState, useEffect } from 'react';
import { NativeRouter, Route } from 'react-router-native';
import { Alert, StyleSheet, Text, View } from 'react-native';

import Main from './Main';
import NewDocument from './NewDocument/NewDocument'

const AppRouter = () => {
	const [loading, setLoading] = useState(true);
	const [generalConfig, setGeneralConfig] = useState({});

	useEffect(() => {
		getConfig();
	}, []);

	const getConfig = async () => {
		try {
			// const response = await fetch('https://www.fastworkx.com/service_private/find_person_for/dni/72897711');
			// const json = await response.json();

			const json = {
				data: {
					apiKey: 'develop',
					apiSale: 'https://yubiz.puyu.pe/api/v2/sale',
					defaultDocumentSerie: 'F005'
				}
			}
			setGeneralConfig(json.data);
			setLoading(false);
		} catch (error) {
			Alert.alert(error);
		}
	}

	if (loading) {
		return (
			<View style={styles.container}>
				<Text style={styles.txtLoading}>Cargando configuracion...</Text>
			</View>
		);
	}

	return (
		<NativeRouter>
			<Route exact path="/" component={Main} />
			<Route exact path="/newDocument">
				<NewDocument generalConfig={generalConfig} />
			</Route>
		</NativeRouter>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	txtLoading: {
		fontWeight: 'bold',
		textAlign: "center",
		fontSize: 40
	},
});

export default AppRouter;