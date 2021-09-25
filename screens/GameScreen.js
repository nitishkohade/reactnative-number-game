import React, { useState, useRef, useEffect } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';

import {Ionicons} from '@expo/vector-icons'
import NumberContainer from '../components/NumberContainer';
import defaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText'

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

const renderListItem = (guess, numOfRound) => {
    return (
        <View style={styles.listItem} key={guess}>
            <BodyText>#{numOfRound}</BodyText>
            <BodyText>{guess}</BodyText>
        </View>
    )
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
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {
                        pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))
                    }
                </ScrollView>
            </View>
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
    },
    listContainer: {
        width: '80%',
        flex: 1
    },
    list: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'flex-end'
    },
    listItem: {
        borderColor: '#ccc',
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%'
    }
});


export default GameScreen