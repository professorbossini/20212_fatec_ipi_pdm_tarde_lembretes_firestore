import React, { useState } from 'react'
import {
  Button, 
  StyleSheet, 
  TextInput, 
  View } from 'react-native';

import ENV from './env'
import firebase from 'firebase/app'
import 'firebase/firestore'


if (!firebase.apps.length)
  firebase.initializeApp(ENV)

const db = firebase.firestore()

export default function App() {

  const [lembrete, setLembrete] = useState ('')

  const capturarLembrete = (lembrete) => {
    setLembrete(lembrete)
  }

  const adicionarLembrete = () => {
    db.collection('lembretes').add({
      texto: lembrete,
      data: new Date()
    })
    setLembrete('')
  }

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.entrada}
        placeholder="Digite seu lembrete"
        onChangeText={capturarLembrete}
        value={lembrete}
      />
      <View style={styles.botao}>
        <Button 
          title="OK"
          onPress={adicionarLembrete}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  entrada: {
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    fontSize: 14,
    textAlign: 'center',
    width: '80%',
    marginBottom: 8
  },
  botao: {
    width: '80%'
  }
});
