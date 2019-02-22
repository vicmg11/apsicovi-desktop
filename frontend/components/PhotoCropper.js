import dynamic from 'next/dynamic';
import styled from 'styled-components';
import 'semantic-ui-css/semantic.min.css';
import { Icon } from 'semantic-ui-react';
import FotoVisitor from './styles/FotoVisitor';

const AvatarCropper = dynamic(() => import('react-avatar-edit'), {
	ssr: false
});

const PhotoDiv = styled.div`
	display: inline-flex;
  z-index: 1;
	margin-top: 10px;
	img {
		margin: auto 48px auto 0px;
	}
`;

function PhotoCropper(props) {
	const onClose = () => {
		props.updateSrc(null);
	};

	const onCrop = (preview) => {
		props.updateSrc(preview);
	};

	const onBeforeFileLoad = (elem) => {
		if (elem.target.files[0].size > 391680) {
			alert('File is too big!');
			elem.target.value = '';
		}
	};

	return (
		<PhotoDiv>
			<img
				className="ui circular bordered image"
				width="100"
				height="100"
				src={props.preview || '../static/user_gray.png'}
				alt="Agrega una foto"
			/>

			<AvatarCropper
				width={150}
				height={150}
				imageHeight={150}
				label="Elije una foto"
				labelStyle="fontSize:12px"
				onCrop={onCrop}
				onClose={onClose}
				onBeforeFileLoad={onBeforeFileLoad}
			/>

			<FotoVisitor>
				<Icon name="camera" />
			</FotoVisitor>
		</PhotoDiv>
	);
}
export default PhotoCropper;
