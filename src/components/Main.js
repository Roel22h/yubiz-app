import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'react-router-native';

const Main = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.name_app}>Yubiz</Text>
			<Link style={styles.linkButton} to="/newDocument">
				<Text style={styles.textButton}>Nuevo documento</Text>
			</Link>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	name_app: {
		fontWeight: 'bold',
		textAlign: "center",
		fontSize: 40
	},
	linkButton: {
		backgroundColor: '#199319',
		padding: 15,
	},
	textButton: {
		color: '#fcffff',
		textAlign: 'center',
		fontSize: 20
	}
});

export default Main