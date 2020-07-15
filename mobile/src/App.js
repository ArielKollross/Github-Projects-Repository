import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";


import api from './services/api';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []); // insert [handleLikeRepository]

  async function handleLikeRepository(id) {
    //Implement "Like Repository" functionality
    await api.post(`/repositories/${id}/like`).then(response => {
      if (response.status != 200) {
        alert('Error to liked!');
      }

      const repositoryLiked = repositories.findIndex(repository => repository.id == id);

      repositories[repositoryLiked].likes += 1;

      const newRepository = repositories.map(el => el);

      setRepositories(newRepository);
    });
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          keyExtractor={repository => repository.id}
          renderItem={({ item: repository }) => (
            <>
              <View style={styles.repositoryContainer}>
                <Text style={styles.repository}>{repository.title}</Text>

                <Text style={styles.textDescription}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non deleniti velit ex corrupti voluptatem dolorum deserunt, quibusdam natus quos eveniet maiores minus consequatur assumenda quo officiis officia modi? Voluptate, ab!</Text>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.techsContainer}>
                  {repository.techs.map(tech => (
                    <>
                      <View style={[styles.techColor]}/>
                      <Text key={tech} style={styles.tech}>{tech}</Text>
                    </>
                  ))}
                </ScrollView>

                <View style={styles.likesContainer}>
                  <Text style={styles.likeText}
                    testID={`repository-likes-${repository.id}`}
                  >
                    {repository.likes} likes
                </Text>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleLikeRepository(repository.id)}
                  testID={`like-button-${repository.id}`}
                >
                  <Text style={styles.buttonText}>
                    Like
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  repositoryContainer: {
    marginTop: 32,
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    borderColor: '#e1e4e8',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 6,
    padding: 20,
  },
  repository: {
    fontSize: 18,
    color: '#0366d6',
    fontWeight: "bold",
  },
  textDescription: {
    marginTop: 12,
    color: '#586069'
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  tech: {
    borderRadius: 4,
    fontSize: 12,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#586069",
  },
  techColor: {
    backgroundColor: '#f1e05a',
    marginTop: 6,
    width: 14,
    height: 14,
    borderRadius: 50,
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 6,
  },
  c1: {
    backgroundColor: '#f1e05a',
    marginTop: 6,
    width: 14,
    height: 14,
    borderRadius: 50,
  },
  c2: {
    backgroundColor: '#586069',
    marginTop: 6,
    width: 14,
    height: 14,
    borderRadius: 50,
  }
});
