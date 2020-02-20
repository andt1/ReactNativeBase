import React,{Component} from 'react'
import {View,Text,Image,Button} from 'react-native'
import styles from './styles'

class ViewCamera extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Image
                        source={{
                            uri: 'data:image/jpeg;base64,' + this.props.state.filePath != null ? this.props.state.filePath.data : "",
                        }}
                        style={{ width: 100, height: 100 }}
                    />
                    <Image
                        source={{ uri: this.props.state.filePath.uri }}
                        style={{ width: 250, height: 250 }}
                    />
                    <Text style={{ alignItems: 'center' }}>
                        {this.props.state.filePath.uri}
                    </Text>
                    <Button title="Choose File" onPress={this.props.chooseFile} />
                </View>
            </View>
        )
    }
}

export default ViewCamera;
