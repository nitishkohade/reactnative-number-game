import React, { useState, useRef, useEffect } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';

import {Ionicons} from '@expo/vector-icons'
import NumberContainer from '../components/NumberContainer';
import defaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min

    if(rndNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return rndNum
    }
}

const GameScreen = (props) => {

    const initialGuess = generateRandomBetween(1, 100, props.userChoice)

    const [currentGuess, setCurrentGuess] = useState(initialGuess)

    const [pastGuesses, setPastGuesses] = useState([initialGuess])
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const {userChoice, onGameOver} = props

    useEffect(() => {
        if(currentGuess === userChoice) {
            onGameOver(pastGuesses.length)
        }
    }, [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = (direction) => {
        if((direction === 'lower' && currentGuess < props.userChoice) || 
            (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie!', 'You know that this is wrong...', 
                [{text: 'Sorry', style: 'cancel'}
            ])
            return
        } 

        if(direction === 'lower') {
            currentHigh.current = currentGuess
        }

        if(direction === 'greater') {
            currentLow.current = currentGuess + 1
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber)
        setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses])
    }

  return (
    <View style={styles.screen}>
        <Text style={defaultStyles.title}>Opponent's Guess</Text>
        <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name="md-remove" size={24} color="white"  />
                </MainButton>

                <MainButton onPress={nextGuessHandler.bind(this, 'greater')} >
                <Ionicons name="md-add" size={24} color="white"  />
                </MainButton>
            </Card>
            <ScrollView>
                {
                    pastGuesses.map(guess => <View key={guess}><Text>{guess}</Text></View>)
                }
            </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '90%'
    }
});


export default GameScreen