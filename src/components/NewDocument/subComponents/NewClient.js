import React, { useState } from 'react';
import {
	Text,
	StyleSheet,
	View,
	TextInput,
	Button,
	ScrollView
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

const NewClient = ({ onCloseNewClientModal }) => {
	const [selectedLanguage, setSelectedLanguage] = useState();

	const saveNewClient = () => {
		console.log('Guardando');
	}

	return (
		<View style={[styles.modal_out]}>
			<View style={styles.modal_in}>
				<View style={styles.modal_header}>
					<Text style={styles.text_modaltitle}>Nuevo Cliente</Text>
				</View>
				<ScrollView style={[styles.container, { height: 450 }]} >
					<Picker
						style={styles.selectInputStyle}
						selectedValue={selectedLanguage}
						onValueChange={(itemValue, itemIndex) =>
							setSelectedLanguage(itemValue)
						}>
						<Picker.Item label="DNI" value="DNI" />
						<Picker.Item label="RUC" value="RUC" />
					</Picker>
					<TextInput
						style={styles.textInputStyle}
						keyboardType='numeric'
						placeholder="Numero de Documento"
					/>
					<TextInput
						style={styles.textInputStyle}
						placeholder="Razon social"
					/>
					<TextInput
						style={styles.textInputStyle}
						placeholder="Dirección"
					/>
					<TextInput
						style={styles.textInputStyle}
						placeholder="Ciudad"
					/>
				</ScrollView>
				<View style={styles.row}>
					<Button
						onPress={() => { onCloseNewClientModal() }}
						title="Cerrar"
						color="#F75555"
					/>
					<Button
						onPress={() => { saveNewClient() }}
						title="Guardar"
						color="#e3aa1a"
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: '#ffffff',
	},
	row: {
		height: 50,
		bottom: 0,
		position: 'relative',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	textInputStyle: {
		textAlign: 'center',
		margin: 15,
		paddingLeft: 10,
		height: 60,
		fontSize: 16,
		borderWidth: 1.5,
		borderColor: '#000',
		backgroundColor: '#FFFFFF',
	},
	selectInputStyle: {
		textAlign: 'center',
		margin: 15,
		paddingLeft: 10,
		height: 60
	},
	modal_out: {
		backgroundColor: 'rgba(52, 52, 52, 0.5)',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	modal_in: {
		backgroundColor: "#fff",
		width: '85%',
		height: '70%',
		borderRadius: 15
	},
	modal_header: {
		justifyContent: 'center',
		height: 40,
		left: 0,
		right: 0,
		top: 0,
		backgroundColor: '#2196F3',
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15
	},

});


export default NewClient