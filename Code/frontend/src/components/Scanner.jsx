import React, { Component } from 'react';
import Quagga from 'quagga';
import styles from '../styles/scanner.css';

class Scanner extends Component {
	componentDidMount() {
		Quagga.init(
			{
				inputStream: {
					type: 'LiveStream',
					constraints: {
						width: 640,
						height: 480,
						facingMode: 'environment', // or user
					},
					area: {
						// defines rectangle of the detection/localization area
						top: '0%', // top offset
						right: '0%', // right offset
						left: '0%', // left offset
						bottom: '0%', // bottom offset
					},
				},
				locator: {
					patchSize: 'medium',
					halfSample: true,
				},
				numOfWorkers: 4,
				decoder: {
					readers: [
						'code_128_reader',
						'ean_reader',
						'ean_8_reader',
						'code_39_reader',
						'code_39_vin_reader',
						'codabar_reader',
						'upc_reader',
						'upc_e_reader',
						'i2of5_reader',
						'2of5_reader',
						'code_93_reader',
					],
				},
				locate: true,
			},
			function (err) {
				if (err) {
					return console.log(err);
				}
				Quagga.start();
			}
		);
		Quagga.onDetected(this._onDetected);
		Quagga.onProcessed(this._onProcessed);
	}

	componentWillUnmount() {
		Quagga.offDetected(this._onDetected);
	}

	_onDetected = (result) => {
		Quagga.stop();
		this.props.onDetected(result);
	};

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
