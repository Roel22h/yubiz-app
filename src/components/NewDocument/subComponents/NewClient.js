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
import { IDENTITYDOCUMENT } from '../../Constants';

const NewClient = ({ onSetNewClient, onCloseNewClientModal }) => {
	const [documentType, setDocumentType] = useState(IDENTITYDOCUMENT.DNI.TYPE);
	const [documentNumber, setDocumentNumber] = useState('');
	const [description, setDescription] = useState('');
	const [address, setaddress] = useState('');

	const saveNewClient = () => {
		if (!documentType || !documentNumber || !description) {
			alert('Por favor, completa todos los campos obligatorios.');
			return;
		}

		if ((documentNumber.trim()).length != 8 && (documentNumber.trim()).length != 11) {
			alert('Tipo de documento incorrecto.');
			return;
		}

		if ((documentNumber.trim()).length != 8 && (IDENTITYDOCUMENT.DNI.TYPE == documentType)) {
			alert('DNI incorrecto.');
			return;
		}

		if ((documentNumber.trim()).length != 11 && (IDENTITYDOCUMENT.RUC.TYPE == documentType)) {
			alert('RUC incorrecto.');
			return;
		}

		// TODO Guardar cliente en base de datos.

		const NewClient = getFormNewClient();
		onCloseNewClientModal();
		onSetNewClient(NewClient);
	}

	const getFormNewClient = () => {
		return {
			id: 22,
			description: description,
			documentType: documentType,
			documentNumber: documentNumber,
			address: address
		}
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
						selectedValue={documentType}
						onValueChange={(itemValue, itemIndex) =>
							setDocumentType(itemValue)
						}>
						<Picker.Item label={IDENTITYDOCUMENT.DNI.DESCRIPTION} value={IDENTITYDOCUMENT.DNI.TYPE} />
						<Picker.Item label={IDENTITYDOCUMENT.RUC.DESCRIPTION} value={IDENTITYDOCUMENT.RUC.TYPE} />
					</Picker>
					<TextInput
						style={styles.textInputStyle}
						keyboardType='numeric'
						placeholder="Numero de Documento"
						value={documentNumber}
						onChangeText={setDocumentNumber}
					/>
					<TextInput
						style={styles.textInputStyle}
						placeholder="Razon social"
						value={description}
						onChangeText={setDescription}
					/>
					<TextInput
						style={styles.textInputStyle}
						placeholder="Dirección"
						value={address}
						onChangeText={setaddress}
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
	text_modaltitle: {
		color: '#ffffff',
		fontSize: 20,
		textAlign: 'center'
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