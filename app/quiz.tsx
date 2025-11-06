import { router, useLocalSearchParams, Stack } from 'expo-router';
import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { QUIZ_DATA } from '../data/questions'; // Certifique-se que o caminho está correto

const getRandomQuestions = (subject: string) => {
  // Adicionamos uma verificação para garantir que a matéria existe
  const allQuestions = QUIZ_DATA[subject as keyof typeof QUIZ_DATA] || [];
  if (allQuestions.length === 0) {
    return [];
  }
  // Embaralha o array e pega os 10 primeiros
  return allQuestions.sort(() => 0.5 - Math.random()).slice(0, 10);
};

export default function QuizScreen() {
  // Pega o parâmetro 'subject' passado da tela anterior
  const { subject } = useLocalSearchParams<{ subject: string }>();

  // useMemo garante que as questões sejam sorteadas apenas uma vez
  // A função só será executada se 'subject' for uma string válida
  const questions = useMemo(() => {
    if (typeof subject === 'string') return getRandomQuestions(subject);
    return [];
  }, [subject]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});

  const handleAnswer = (option: string) => {
    const newAnswers = { ...userAnswers, [currentQuestionIndex]: option };
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Navega para a tela de resultados, passando os dados como strings JSON
      router.replace({
        pathname: '/results',
        params: { questions: JSON.stringify(questions), userAnswers: JSON.stringify(newAnswers) },
      });
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  // Se as questões ainda não foram carregadas, mostra uma mensagem
  if (!currentQuestion) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Carregando simulado...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Define o título do cabeçalho dinamicamente */}
      <Stack.Screen options={{ title: `Simulado de ${subject}` }} />
      <View style={styles.innerContainer}>
        <Text style={styles.progressText}>
          Questão {currentQuestionIndex + 1} de {questions.length}
        </Text>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option) => (
            <TouchableOpacity key={option} style={styles.optionButton} onPress={() => handleAnswer(option)}>
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f7' },
  innerContainer: { flex: 1, padding: 20, justifyContent: 'space-between' },
  progressText: { fontSize: 16, textAlign: 'center', color: '#666', paddingTop: 10 },
  questionContainer: { flex: 1, justifyContent: 'center' },
  questionText: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', color: '#333', marginBottom: 20 },
  optionsContainer: { paddingBottom: 20 },
  optionButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  optionText: { fontSize: 18, color: '#333' },
});