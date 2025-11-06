// E:\DevArea\simulado-app\screens\HomeScreen.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  const startQuiz = (subject) => {
    navigation.navigate('Quiz', { subject }); // Passa a matéria como parâmetro para a tela de Quiz
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha o Simulado</Text>
      <TouchableOpacity style={styles.button} onPress={() => startQuiz('Português')}>
        <Text style={styles.buttonText}>Português</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => startQuiz('Matemática')}>
        <Text style={styles.buttonText}>Matemática</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f0f4f7' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  button: { width: '80%', backgroundColor: '#007bff', padding: 20, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  buttonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
});
