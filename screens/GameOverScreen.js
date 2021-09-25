import React, { useState } from 'react';
import { Button, 
  StyleSheet, 
  View, 
  Image, 
  Text,
  Dimensions,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import BodyText from '../components/BodyText'
import MainButton from '../components/MainButton';
import TitleText from '../components/TitleText'

const GameOverScreen = (props) => {

  return (
      <ScrollView>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    image: {
      width: '100%',
      height: '100%'
    },
    imageContainer: {
      width: Dimensions.get('window').width * 0.7,
      height: Dimensions.get('window').width * 0.7,
      borderRadius: Dimensions.get('window').width * 0.7 / 2,
      borderWidth: 3,
      borderColor: 'black',
      overflow: 'hidden',
      marginVertical: Dimensions.get('window').height / 20

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
