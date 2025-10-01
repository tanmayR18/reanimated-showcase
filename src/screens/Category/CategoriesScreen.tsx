import { View, Text, Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import { categories } from '../../data/categories';

const { height, width } = Dimensions.get('window');

const CategoriesScreen = () => {
  return (
    <View style={styles.container}>
      {categories?.map(category => (
        <View style={[styles.category, { backgroundColor: category.color}]} key={category.id}>
          <Text style={styles.title}>{category.title}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 8,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#BDBDBD'
  },
  category: {
    width: width * 0.5 - 16 - 4,
    height: width * 0.5,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    textAlign:'center',
    color: '#555555'
  },
});

export default CategoriesScreen;
