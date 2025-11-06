import { router, useLocalSearchParams, Stack } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';

type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
};

export default function ResultsScreen() {
  // Pega os parâmetros JSON da rota
  const params = useLocalSearchParams<{ questions: string; userAnswers: string }>();
  // Converte as strings de volta para objetos
  const questions: Question[] = JSON.parse(params.questions!);
  const userAnswers: { [key: number]: string } = JSON.parse(params.userAnswers!);

  const score = questions.reduce((acc, question, index) => {
    return userAnswers[index] === question.correctAnswer ? acc + 1 : acc;
  }, 0);

  return (
    <SafeAreaView style={styles.container}>
      {/* Define o título e remove o botão de voltar */}
      <Stack.Screen options={{ title: 'Gabarito', headerLeft: () => null }} />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Resultado Final</Text>
        <Text style={styles.scoreText}>
          Você acertou {score} de {questions.length}!
        </Text>
      </View>

      <FlatList
        data={questions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        renderItem={({ item, index }) => {
          const userAnswer = userAnswers[index];
          const isCorrect = userAnswer === item.correctAnswer;
          return (
            <View style={[styles.resultItem, { borderColor: isCorrect ? '#28a745' : '#dc3545' }]}>
              <Text style={styles.questionText}>
                {index + 1}. {item.question}
              </Text>
              <Text style={styles.answerText}>
                Sua resposta:{' '}
                <Text style={{ fontWeight: 'bold', color: isCorrect ? '#28a745' : '#dc3545' }}>
                  {userAnswer || 'Não respondida'}
                </Text>
              </Text>
              {!isCorrect && (
                <Text style={styles.answerText}>
                  Resposta correta: <Text style={{ fontWeight: 'bold', color: '#28a745' }}>{item.correctAnswer}</Text>
                </Text>
              )}
            </View>
          );
        }}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.buttonText}>Voltar ao Início</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f7' },
  headerContainer: { padding: 20, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: '#333' },
  scoreText: { fontSize: 20, textAlign: 'center', color: '#333' },
  resultItem: { backgroundColor: '#fff', padding: 15, marginBottom: 10, borderRadius: 8, borderWidth: 2 },
  questionText: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#333' },
  answerText: { fontSize: 15, color: '#555' },
  footer: { padding: 20 },
  button: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});