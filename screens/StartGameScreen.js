import React, {useState} from 'react'
import {StyleSheet, 
    View, 
    Text, 
    TextInput, 
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native'
import Card from '../components/Card';
import Input from '../components/Input';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
import Colors from '../constants/colors'

const StartGameScreen = props => {

    let confirmedOutput

    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState(0)

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    }

    const resetInputHandler = () => {
        setEnteredValue('')
        setConfirmed(false)
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue)
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number!', 
            'Number has to be a number between 1 and 99.',
            [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}])
            return
        }
        setConfirmed(true)
        setSelectedNumber(chosenNumber)
        setEnteredValue(''),
        Keyboard.dismiss();
    }

    if(confirmed) {
        confirmedOutput = (
        <Card style={styles.summaryContainer}>
            <Text>You selected</Text>
            <NumberContainer >{selectedNumber}</NumberContainer>
            <MainButton onPress={() => props.onStartGame(selectedNumber)} >
                START GAME
            </MainButton>
        </Card>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <Text style={styles.title}>The Game Screen</Text>
                <Card style={styles.inputContainer}>
                    <Text style={styles.text}>Select a Number</Text>
                    <Input style={styles.input}
                        blurOnSubmit
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="number-pad"
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button color={Colors.secondary} title="Reset" onPress={resetInputHandler} />
                        </View>
                        <View style={styles.button}>
                            <Button color={Colors.primary} title="Confirm" onPress={confirmInputHandler} />
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
  screen: {
      flex: 1,
      padding: 10,
      alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  }, 
  title: {
      fontSize: 20,
      marginVertical: 10,
      fontFamily: 'open-sans-bold'
  },
  button: {
      width: 100
  },
  input: {
      width: 100,
      textAlign: 'center'
  },
  summaryContainer: {
      marginTop: 20,
      alignItems: 'center'
  },
  text: {
      fontFamily: 'open-sans-font'
  }
});

export default StartGameScreen