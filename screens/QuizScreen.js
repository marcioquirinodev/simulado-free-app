// E:\DevArea\simulado-app\screens\QuizScreen.js

import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { QUIZ_DATA } from '../data/questions';

// Função para embaralhar e pegar 10 questões
const getRandomQuestions = (subject) => {
  const allQuestions = QUIZ_DATA[subject];
  return allQuestions.sort(() => 0.5 - Math.random()).slice(0, 10);
};

export default function QuizScreen({ route, navigation }) {
  const { subject } = route.params;
  
  // useMemo garante que as questões sejam sorteadas apenas uma vez
  const questions = useMemo(() => getRandomQuestions(subject), [subject]);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});

  const handleAnswer = (option) => {
    const newAnswers = { ...userAnswers, [currentQuestionIndex]: option };
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Finalizou o quiz, navega para a tela de resultados
      navigation.replace('Results', { questions, userAnswers });
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.progressText}>
        Questão {currentQuestionIndex + 1} de {questions.length}
      </Text>
      <Text style={styles.questionText}>{currentQuestion.question}</Text>
      
      {currentQuestion.options.map((option) => (
        <TouchableOpacity key={option} style={styles.optionButton} onPress={() => handleAnswer(option)}>
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f4f7' },
  progressText: { fontSize: 16, textAlign: 'center', marginBottom: 20, color: '#666' },
  questionText: { fontSize: 22, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  optionButton: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#ddd' },
  optionText: { fontSize: 18 },
});
