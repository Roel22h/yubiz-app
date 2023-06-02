import React, { useState, useEffect } from 'react';

import {
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Modal,
	Button
} from 'react-native';

import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import { Link } from 'react-router-native';
import moment from 'moment';
import 'moment/locale/es';

import ListClients from './subComponents/ListClients';
import { IDENTITYDOCUMENT } from '../Constants';

const DATE = (moment().format('D MMMM YYYY'));

const NewDocument = ({ generalConfig }) => {
	const [modalClientListVisible, setClientListModalVisible] = useState(false);

	const [loading, setLoading] = useState(true);
	const [companyData, setCompanyData] = useState({});
	const [clientData, setClientData] = useState({});
	const [documents, setDocuments] = useState({});
	const [documentData, setDocumentData] = useState({});

	useEffect(() => {
		initCompany();
		initClient();
		initDocuments();
		setLoading(false);
	}, []);

	// ==============	COMPANY	======================
	const initCompany = async () => {
		const company = await getCompany();
		setCompanyData(company);
	}

	const getCompany = async () => {
		try {
			return {
				ruc: '12345678910',
				description: 'CORPORACION DAKMA S.R.L',
				address: 'PRINCIPAL: JR.LIMA 820 - ABANCAY-APURIMAC',
				phone: '963049763'
			}
		} catch (error) {
			console.error(error);
		}
	}
	// ===============================================

	// =============	CLIENT	======================
	const initClient = async () => {
		const client = await getDefaultClient();
		setClientData(client);
	}

	const getDefaultClient = async () => {
		try {
			// const response = await fetch('https://www.fastworkx.com/service_private/find_person_for/dni/72897711');
			// const client = (await response.json()).data;
			const client = {
				id: 1,
				description: 'Clientes varios',
				documentType: 1,
				documentNumber: '-',
				address: 'Av. general'
			}

			return {
				id: client.id,
				description: client.description,
				documentType: client.documentType,
				documentNumber: client.documentNumber,
				address: client.address
			};
		} catch (error) {
			console.error(error);
		}
	}
	// ===============================================

	// =============	DOCUMENT	==================
	const initDocuments = async () => {
		const documents = await getDocuments();
		const defaultDocument = getDefaultDocument(documents);
		setDocumentData(defaultDocument);
		setDocuments(documents);

	}

	const getDocuments = async () => {
		try {
			return [
				{
					id: 12,
					document_description: 'Factura',
					serie: 'B002',
					correlativo: 12
				},
				{
					id: 6,
					document_description: 'Boleta',
					serie: 'NV02',
					correlativo: 22
				},
				{
					id: 9,
					document_description: 'Nota Venta',
					serie: 'F005',
					correlativo: 123
				}

			];
		} catch (error) {
			console.error(error);
		}
	}

	const getDefaultDocument = (documentsList) => {
		const defaultDocumentSerie = generalConfig.defaultDocumentSerie;
		const defaultDocument = documentsList.find(obj => obj.serie == defaultDocumentSerie);

		if (typeof (defaultDocument) !== 'undefined') {
			return defaultDocument;
		} else {
			return documentsList[0];
		}
	}

	const changeDocument = () => {
		const documentSelected = documentData;
		const currentIndex = documents.findIndex((document) => document.id === documentSelected.id);
		const nextIndex = (currentIndex + 1) % documents.length;
		setDocumentData(documents[nextIndex]);
	}
	// ===============================================

	// =============	CLIENT MODAL	==============
	const openClientListModal = () => {
		setClientListModalVisible(true);
	}

	const closeClientListModal = () => {
		setClientListModalVisible(false);
	}
	// ==============================================

	const selectClient = (client) => {
		setClientData(client);
	}

	if (loading) {
		return (
			<View style={styles.container}>
				<Text style={styles.txtLoading}>Cargando configuracion...</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>

			<Modal visible={modalClientListVisible}>
				<ListClients onSelectClient={selectClient} onCloseClientListModal={closeClientListModal} />
			</Modal>

			<ScrollView>
				<View style={styles.body}>
					<View style={[styles.box_data_row_1, styles.row, styles.box_estatico]}>
						<View style={[styles.box2, styles.box]}>
							<View style={styles.icon_label}>
								<SimpleIcon name="home" color="rgba(31, 156, 244, 1)" size={20} />
								<Text style={styles.text_subtitle}>&nbsp;&nbsp;Empresa</Text>
							</View>
							<Text style={styles.text_bold}>{companyData.description}</Text>
							<Text style={styles.text_label}>{companyData.ruc}</Text>
							<Text style={styles.text_label}>{companyData.address}</Text>
							<Text style={styles.text_label}>{companyData.phone}</Text>
						</View>
						<View style={[styles.box1, styles.box, styles.box_estatico]}>
							<View style={styles.icon_label}>
								<SimpleIcon name="calendar" color="rgba(31, 156, 244, 1)" size={20} />
								<Text style={styles.text_subtitle}>&nbsp;&nbsp;Fecha</Text>
							</View>
							<Text style={styles.text_bold}>{DATE}</Text>
						</View>
					</View>
					<View style={[styles.box_data_row_2, styles.row]}>
						<TouchableOpacity
							style={[styles.box2, styles.box]}
							onPress={() => openClientListModal()}
						>
							<View style={styles.icon_label}>
								<SimpleIcon name="user" color="rgba(31, 156, 244, 1)" size={20} />
								<Text style={styles.text_subtitle}>&nbsp;&nbsp;Para</Text>
							</View>
							<Text style={styles.text_bold}>{clientData.description}</Text>
							<Text style={styles.text_bold}>
								{(clientData.documentType == IDENTITYDOCUMENT.DNI.TYPE ? IDENTITYDOCUMENT.DNI.DESCRIPTION : IDENTITYDOCUMENT.RUC.DESCRIPTION)} :
								{clientData.documentNumber}
							</Text>
							<Text style={styles.text_label}>{clientData.address}</Text>
						</TouchableOpacity>

						<TouchableOpacity style={[styles.box1, styles.box]} onPress={() => { changeDocument() }}>
							<View style={styles.icon_label}>
								<SimpleIcon name="docs" color="rgba(31, 156, 244, 1)" size={20} />
								<Text style={styles.text_subtitle}>&nbsp;&nbsp;{documentData.document_description} n°</Text>
							</View>
							<Text style={styles.text_bold}>{documentData.serie + "-" + documentData.correlativo}</Text>

						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>

			<Link to="/">
				<Text>Regresar</Text>
			</Link>
		</View >
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: '#fff'

	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	header: {
		justifyContent: 'flex-end',
		height: 45,
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		paddingBottom: 10,
		backgroundColor: '#2196F3',
	},
	body: {
		marginTop: 45,
		marginBottom: 40,
		backgroundColor: '#ffffff'
	},
	footer: {
		height: 40,
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: '#e3aa1a'
	},
	modal_center: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		backgroundColor: 'rgba(52, 52, 52, 0.5)',
	},
	modal_out: {
		backgroundColor: 'rgba(52, 52, 52, 0.5)',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	modal_in_grande: {
		backgroundColor: "#fff",
		width: '85%',
		height: 540,
		borderRadius: 15
	},
	modal_in_pequenio: {
		backgroundColor: "#fff",
		width: '85%',
		height: 250,
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

	icon_label: {
		flexDirection: 'row',
		top: 5,
		left: 20,
		position: 'absolute'
	},

	box: {
		borderBottomColor: '#dedede',
		borderLeftColor: '#dedede',
		borderBottomWidth: 1,
		borderLeftWidth: 1,
		padding: 20,
		justifyContent: 'center'
	},
	box_modal: {
		padding: 15,
		justifyContent: 'center'
	},
	box_estatico: {
		backgroundColor: '#FFFEE7'
	},
	box_money: {
		borderBottomColor: '#dedede',
		borderBottomWidth: 1,
		padding: 20,
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	box1: {
		flex: 1
	},
	box2: {
		flex: 2
	},
	box_data_row_1: {
		height: 130,
	},
	box_data_row_2: {
		height: 165,
	},
	box_detail: {
		height: 110,
	},
	box_action1: {
		marginLeft: 'auto',
		marginRight: 'auto',
		width: '50%',
		height: 40,
		backgroundColor: '#299fd4',
		borderRadius: 20,
	},
	box_action2: {
		marginLeft: 'auto',
		marginRight: 'auto',
		width: '40%',
		height: 40,
		backgroundColor: '#18B90D',
		borderRadius: 20,
	},
	box_total: {
		borderTopWidth: 1,
		borderTopColor: '#dedede',
		height: 110,
	},
	text_title: {
		color: '#ffffff',
		fontSize: 24,
		textAlign: 'center'
	},
	text_modaltitle: {
		color: '#ffffff',
		fontSize: 20,
		textAlign: 'center'
	},
	text_subtitle: {
		color: '#1f9cf4',
		fontSize: 16,
	},
	text_label: {
		color: '#a8a9aa',
		fontSize: 12
	},
	text_action: {
		color: '#fff',
		textAlign: 'center',
		fontSize: 14
	},
	text_bold: {
		color: '#000000',
		fontSize: 14,
	},
	text_normal: {
		color: '#000000',
		fontSize: 16,
		margin: 12
	},
	button_circleRight: {
		position: 'relative',
		width: 50,
		height: 50,
		borderRadius: 70 / 2,
		backgroundColor: '#e3aa1a',
		bottom: 15,
		right: 15,
		justifyContent: 'center',
		alignItems: 'center',
	},
	button_circleLeft: {
		position: 'relative',
		width: 50,
		height: 50,
		borderRadius: 70 / 2,
		backgroundColor: '#F75555',
		bottom: 15,
		left: 15,
		justifyContent: 'center',
		alignItems: 'center',
	},
	flex_endRight: {
		justifyContent: 'flex-end',
		alignItems: 'flex-end'
	},
	flex_endLeft: {
		justifyContent: 'flex-end',
	},
	input_dinero: {
		height: 45,
		width: "100%",
		textAlign: "right",
		borderWidth: 1,
		margin: 3
	},
});

export default NewDocument