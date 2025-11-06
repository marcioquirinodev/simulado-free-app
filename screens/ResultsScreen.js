// E:\DevArea\simulado-app\screens\ResultsScreen.js

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function ResultsScreen({ route, navigation }) {
  const { questions, userAnswers } = route.params;

  const score = questions.reduce((acc, question, index) => {
    return userAnswers[index] === question.correctAnswer ? acc + 1 : acc;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Resultado Final</Text>
      <Text style={styles.scoreText}>Você acertou {score} de {questions.length}!</Text>
      
      <FlatList
        data={questions}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          const userAnswer = userAnswers[index];
          const isCorrect = userAnswer === item.correctAnswer;
          return (
            <View style={[styles.resultItem, { borderColor: isCorrect ? 'green' : 'red' }]}>
              <Text style={styles.questionText}>{index + 1}. {item.question}</Text>
              <Text>Sua resposta: <Text style={{ fontWeight: 'bold', color: isCorrect ? 'green' : 'red' }}>{userAnswer || 'Não respondida'}</Text></Text>
              {!isCorrect && <Text>Resposta correta: <Text style={{ fontWeight: 'bold', color: 'green' }}>{item.correctAnswer}</Text></Text>}
            </View>
          );
        }}
      />

      <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Home')}>
        <Text style={styles.buttonText}>Voltar ao Início</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f4f7' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  scoreText: { fontSize: 20, textAlign: 'center', marginBottom: 20 },
  resultItem: { backgroundColor: '#fff', padding: 15, marginBottom: 10, borderRadius: 8, borderWidth: 2 },
  questionText: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  button: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
