import React, { Component } from 'react';
import Quagga from 'quagga';

class Scanner extends Component {
	constructor(props) {
		super(props);
		this.videoRef = React.createRef();
		this.state = {
			dataUri: '',
		};
		this._onDetected = this._onDetected.bind(this);
	}

	componentDidMount() {
		Quagga.init(
			{
				inputStream: {
					type: 'LiveStream',
					constraints: {
						width: { min: 800, max: 1280 },
						height: { min: 600, max: 720 },
						aspectRatio: { min: 4 / 3, max: 16 / 9 },
						facingMode: 'environment', // or user
					},
					area: {
						// defines rectangle of the detection/localization area
						top: '25%', // top offset
						right: '25%', // right offset
						left: '25%', // left offset
						bottom: '25%', // bottom offset
					},
				},
				frequency: 'full',
				locator: {
					patchSize: 'medium',
					halfSample: true,
				},
				numOfWorkers: 8,
				decoder: {
					readers: [
						//	'code_128_reader',
						//	'ean_8_reader',
						//	'code_39_reader',
						//	'code_39_vin_reader',
						//	'codabar_reader',
						'upc_reader',
						//	'upc_e_reader',
						//	'ean_reader',
						//	'i2of5_reader',
						//	'2of5_reader',
						//	'code_93_reader',
					],
					debug: {
						drawBoundingBox: true,
						drawScanline: true,
					},
				},
				locate: false,
			},
			function (err) {
				if (err) {
					console.error(err);
					return;
				}
				Quagga.start();
			}
		);
		Quagga.onDetected(this._onDetected);
		Quagga.onProcessed(this._onProcessed);
	}

	componentWillUnmount() {
		Quagga.stop();
	}

	_onDetected(result) {
		this.props.onDetected(result);
		Quagga.stop();
	}

	_onProcessed(result) {
		let drawingCtx = Quagga.canvas.ctx.overlay,
			drawingCanvas = Quagga.canvas.dom.overlay;

		if (result) {
			if (result.boxes) {
				drawingCtx.clearRect(
					0,
					0,
					parseInt(drawingCanvas.getAttribute('width'), 10),
					parseInt(drawingCanvas.getAttribute('height'), 10)
				);
				result.boxes
					.filter(function (box) {
						return box !== result.box;
					})
					.forEach(function (box) {
						Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
							color: 'green',
							lineWidth: 2,
						});
					});
			}

			if (result.box) {
				Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
					color: '#00F',
					lineWidth: 2,
				});
			}

			if (result.box) {
				Quagga.ImageDebug.drawPath(
					result.line,
					{ x: 'x', y: 'y' },
					drawingCtx,
					{ color: 'red', lineWidth: 3 }
				);
			}
		}
	}

	render() {
		return <div id='interactive' className='viewport' />;
	}
}

export default Scanner;
