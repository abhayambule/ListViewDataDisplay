import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Card = ({route}) => {
  const data = route.params?.data;

  return (
    <View style={{backgroundColor: 'white'}}>
      <FlatList
        numColumns={2}
        data={data}
        renderItem={({item}) => (
          <View style={[styles.item, {backgroundColor: item.backgroundColor}]}>
            <Text style={styles.textstyle}>Name: {item.name}</Text>
            <Text style={styles.textstyle}>Email : {item.email}</Text>
            <Text style={styles.textstyle}>Phone : {item.phone}</Text>
            <Text style={styles.textstyle}>Manager : {item.email}</Text>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  item: {
    borderRadius: 2,
    margin: 2,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    width: Dimensions.get('window').width * 0.48,
  },

  textstyle: {
    color: '#00FFFF',
  },
});
