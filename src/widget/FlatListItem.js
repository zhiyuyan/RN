import React, { PureComponent } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native'

class FlatListItem extends React.PureComponent {
    constructor(props) {
        super(props)
        this.itemOnpress = this.props.onPress;
        this.data = this.props.data;
        this.index = this.props.index;
        this._onPressed = this._onPressed.bind(this);
    }

    render() {
        let data = this.data;
        let index = this.index;
        return (
            <TouchableOpacity style={styles.container} onPress={this._onPressed}>
                <Image style={{ width: 160 }} source={{ uri: data.cover }} resizeMode={Image.resizeMode.cover} />
                <View style={styles.textContainer}>
                    <Text style={styles.h1} numberOfLines={1}>{data.title}</Text>
                    <Text style={styles.p} numberOfLines={3}>{data.description}</Text>
                </View>
            </TouchableOpacity>

        );
    }

    _onPressed() {
        let parm = this.data.title + '-' + this.index;
        this.itemOnpress(parm);
    }
}

const styles = StyleSheet.create(
    {
        container: {
            padding: 10,
            flex: 1,
            flexDirection: 'row',
            backgroundColor: 'white',
            height: 120
        },
        textContainer: {
            flex: 1,
            flexDirection: 'column',
            marginLeft: 10
        },
        h1: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#222222',
        },
        p: {
            fontSize: 12,
            color: '#777777',
            marginVertical: 8,
        },
    }
)

export default FlatListItem