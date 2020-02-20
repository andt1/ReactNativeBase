import React,{Component} from 'react'
import CameraScreens from './screens/ViewCamera'
import ImagePicker from 'react-native-image-picker';

class CameraContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filePath: {},
        };
        this.chooseFile = this.chooseFile.bind(this)
    }


    render() {
        return (
            <CameraScreens
                state={this.state}
                chooseFile={this.chooseFile}
                {...this.props}/>
        );
    }

    chooseFile = () => {
        const options = {
            title: 'Select Image',
            customButtons: [
                {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                let source = response;
                this.setState({
                    filePath: source,
                });
            }
        });
    };

}
export default CameraContainer;
