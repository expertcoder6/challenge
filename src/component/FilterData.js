import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function FilterData(props) {
    const {
        onpress,
        onpress1,

    } = props;

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.nameView}
                onPress={onpress}
            >
                <Text style={styles.nameText}>Name</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.ratingView}
                onPress={onpress1}>
                <Text style={styles.ratingText}>Rating</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{ marginVertical: 5 },
    nameView:{ height: 30, justifyContent: 'center'},
    nameText:{ fontSize: 18 },
    ratingView:{ height: 30, justifyContent: 'center' },
    ratingText:{ fontSize: 18 }
})