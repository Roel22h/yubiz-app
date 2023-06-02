import React, { useState, useEffect } from 'react';

import {
	Text,
	StyleSheet,
	View,
	FlatList,
	TouchableOpacity,
	TextInput,
	Button,
	Modal
} from 'react-native';

import NewClient from "./NewClient";

const dataClients = [
	{
		id: 1,
		description: 'Roel W. Gamarra Chipa',
		documentType: 1,
		documentNumber: '12341234',
		address: 'Av. general 123',
	},
	{
		id: 2,
		description: 'Cristian Serrano juro',
		documentType: 1,
		documentNumber: '98765432',
		address: 'Av. Test',
	},
	{
		id: 3,
		description: 'Araceli Chacon herrera',
		documentType: 2,
		documentNumber: '20122334122',
		address: 'Av. Olivo',
	}
];

const ListClients = ({ onSelectClient, onCloseClientListModal }) => {
	const [modalNewClientVisible, setModalNewClientVisible] = useState(false);
	const [selectedClient, setSelectedClient] = useState(null);
	const [searchText, setSearchText] = useState('');
	const [filteredData, setFilteredData] = useState(dataClients);

	const searchFilterFunction = (text) => {
		setSearchText(text);
	};

	useEffect(() => {
		const filtered = dataClients.filter(function (item) {
			return (item.documentNumber).indexOf(searchText) > -1;
		});
		setFilteredData(filtered);
	}, [searchText]);

	const renderClients = ({ item }) => {
		return (
			<TouchableOpacity
				style={styles.element}
				onPress={() => {
					setSelectedClient(item);
					onSelectClient(item);
					onCloseClientListModal();
				}}
			>
				<Text style={styles.text_label}>{item.documentType + ' : ' + item.documentNumber}</Text>
				<Text style={styles.text_bold}>{item.description}</Text>
			</TouchableOpacity>
		);
	};

	const openNewClientModal = () => {
		setModalNewClientVisible(true);
	};

	const closeNewClientModal = () => {
		setModalNewClientVisible(false);
	};

	const setNewClient = (client) => {
		onCloseClientListModal();
		onSelectClient(client);
	}

	return (
		<View style={styles.container}>

			<Modal
				visible={modalNewClientVisible}
				animationType={"fade"}
				transparent={true}
			>
				<NewClient onSetNewClient={setNewClient} onCloseNewClientModal={closeNewClientModal} />
			</Modal>

			<TextInput
				style={styles.textInputStyle}
				keyboardType='numeric'
				onChangeText={(text) => { searchFilterFunction(text); }}
				underlineColorAndroid="transparent"
				placeholder="Ingrese Nro de Documento"
			/>

			<FlatList
				data={filteredData}
				renderItem={renderClients}
				keyExtractor={(item) => item.id.toString()}
			/>

			<View style={styles.row}>
				<Button
					onPress={() => { onCloseClientListModal() }}
					title="Cerrar"
					color="#F75555"
				/>
				<Button
					onPress={() => { openNewClientModal() }}
					title="Nuevo cliente"
					color="#e3aa1a"
				/>
			</View>
		</View>
	);
};

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
	element: {
		padding: 15,
		margin: 8,
		borderWidth: 1,
		borderColor: '#a8a9aa',
	},
	text_label: {
		color: '#a8a9aa',
	},
	text_bold: {
		color: '#000000',
		fontSize: 14,
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
	}
});

export default ListClients