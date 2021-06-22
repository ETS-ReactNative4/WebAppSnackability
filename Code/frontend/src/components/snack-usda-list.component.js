import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
	fetchSnacksListUSDA,
	fetchSnacksByNameUSDA,
} from '../services/snack.service.js';
import { debounce } from '../utils/debounce';

import styles from '../styles/styles.module.css';

import {
	Button,
	Col,
	Container,
	Form,
	Row,
	Table,
	Modal,
} from 'react-bootstrap';
import Scanner from './Scanner';
//import Result from './Result'

const Snacks = ({ snacks }) => (
	<tr>
		<td>
			<Link to={`/usda/${snacks.fdcId}`}>{snacks.description}</Link>
			<br />
			<span className='text-muted'>{snacks.brandOwner}</span>
		</td>
	</tr>
);

export default class SnackList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			snacks: [],
			isLoading: false,
			scanning: false,
			results: [],
			lastBarcode: null,
		};
		this._toggle = this._toggle.bind(this);
	}

	_scan = () => {
		this.setState((prevState) => ({
			modal: !prevState.modal,
		}));
		this.setState({ scanning: !this.state.scanning });
	};

	_toggle() {
		this.setState((prevState) => ({
			modal: !prevState.modal,
		}));
	}

	_onDetected = (result) => {
		console.log('result.codeResult.code: ' + result.codeResult.code);
		console.log('this.state.lastBarcode: ' + this.state.lastBarcode);

		if (
			this.state.lastBarcode ||
			result.codeResult.code !== this.state.lastBarcode
		) {
			this.searchForItem(result.codeResult.code);
			console.log('THE RESULT IS: ' + result.codeResult.code);
		}

		this.setState({
			results: this.state.results.concat([result]),
			lastBarcode: result.codeResult.code,
		});
		this.setState((prevState) => ({
			modal: !prevState.modal,
		}));
	};

	componentDidMount() {
		this.searchForItem('');
	}

	fetchSnacksListUSDA() {
		this.setState({ isLoading: true });

		fetchSnacksListUSDA()
			.then((response) => response.data)
			.then((snacks) => {
				this.setState({ snacks: snacks, isLoading: false });
			})
			.catch((error) => {
				console.error(error);
				this.setState({ isLoading: false });
			});
	}

	searchForItem(keyword) {
		debounce(() => {
			this.setState({ isLoading: true });
			fetchSnacksByNameUSDA(keyword)
				.then((response) => response.data)
				.then((snacks) => {
					this.setState({ snacks: snacks, isLoading: false });
				})
				.catch((error) => {
					console.error(error);
					this.setState({ isLoading: false });
				});
		}, 1000);
	}

	SnackList() {
		const snacksList = this.state.snacks;

		return (
			snacksList &&
			snacksList.map((currentSnack, i) => (
				<Snacks snacks={currentSnack} key={i} />
			))
		);
	}

	render() {
		return (
			<Container fluid className='mt-5'>
				<Row>
					<Col>
						<Form.Group controlId='formControlPortion'>
							<Form.Control
								id='a'
								type='search'
								placeholder="🔎 Search for a snack's brand name..."
								onKeyUp={(event) => this.searchForItem(event.target.value)}
							/>
						</Form.Group>
					</Col>
				</Row>

				<Button variant='primary' onClick={this._scan}>
					Scan Barcode! 📷
				</Button>

				{/* {this.state.scanning ? <Scanner onDetected={this._onDetected} /> : null} */}

				<Modal show={this.state.modal} onHide={this._toggle}>
					<Modal.Header closeButton='true' />
					<Modal.Body>
						<Scanner onDetected={this._onDetected} />
					</Modal.Body>
				</Modal>

				<Row className='mt-1'>
					<Col>
						<Table striped hover>
							<thead>
								<tr>
									<th>Product</th>
								</tr>
							</thead>
							<tbody>
								<tr className={this.state.isLoading ? 'd-table-row' : 'd-none'}>
									<td colSpan='12' className='text-center'>
										Loading...
									</td>
								</tr>
								{!this.state.isLoading && this.SnackList()}
							</tbody>
							{console.log(this.state.snacks)}
						</Table>
					</Col>
				</Row>
			</Container>
		);
	}
}
