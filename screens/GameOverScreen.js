import React, { useState } from 'react';
import { Button, StyleSheet, View, Image, Text } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import BodyText from '../components/BodyText'
import MainButton from '../components/MainButton';
import TitleText from '../components/TitleText'

const GameOverScreen = (props) => {

  return (
    <View style={styles.screen}>
        <TitleText>The Game is over!</TitleText>
        <View style={styles.imageContainer}>
          <Image 
            source={require('../assets/success.png')} 
            // source={{uri: 'https://tgr.scdn2.secure.raxcdn.com/images/wysiwyg/_article/istockphoto-485966046-612x612.jpg'}}
            style={styles.image} 
            resizeMode="cover" />
        </View>
        <View style={styles.resultContainer}>
          <BodyText style={styles.resultText}>Your phone needed <Text style={styles.highlight}>{props.roundsNumber} </Text>
            rounds to guess the number <Text style={styles.highlight}>{props.userNumber} </Text>
          </BodyText>
         </View>
        <MainButton onPress={props.startNewGame} >
                NEW GAME
        </MainButton>
    </View>
  );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
      width: '100%',
      height: '100%'
    },
    imageContainer: {
      width: 300,
      height: 300,
      borderRadius: 150,
      borderWidth: 3,
      borderColor: 'black',
      overflow: 'hidden',
      marginVertical: 30

    },
    highlight: {
      color: Colors.primary
    },
    resultContainer: {
      width: '80%',
      marginHorizontal: 20,
      marginVertical: 5
    },
    resultText: {
      textAlign: 'center'
    }
});

export default GameOverScreen
