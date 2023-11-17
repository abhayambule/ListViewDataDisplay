import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'react-native-axios';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewType, setViewType] = useState('list');
  const [isModalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  useEffect(() => {
    setLoading(false);

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'https://mocki.io/v1/3a4b56bd-ad05-4b12-a181-1eb9a4f5ac8d',
        );
        setData(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const addNewData = () => {
    const newData = {
      id: data.length + 1,
      name: name,
      backgroundColor: backgroundColor.toLowerCase(),
      email: email,
      phone: phoneNo,
    };
    if (!name || !backgroundColor || !email || !phoneNo) {
      Alert.alert('Please enter all field');
    } else {
      setData(prevData => [...prevData, newData]);
      setModalVisible(false);
      setName('');
      setPhoneNo('');
      setBackgroundColor('');
      setEmail('');
      ToastAndroid.showWithGravityAndOffset(
        'New field added at end of list',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={{padding: 20, backgroundColor: 'white'}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Card', {data: data});
              }}
              style={styles.button}>
              <Text style={styles.buttonText}>Card View</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // addNewData();
                setModalVisible(true);
              }}
              style={styles.button}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            style={{marginBottom: Dimensions.get('window').height * 0.0285}}
            renderItem={({item}) => (
              <View
                style={[styles.item, {backgroundColor: item.backgroundColor}]}>
                <Text style={styles.textstyle}>Name: {item.name}</Text>
                <Text style={styles.textstyle}>Email : {item.email}</Text>
                <Text style={styles.textstyle}>Phone : {item.phone}</Text>
                <Text style={styles.textstyle}>Manager : {item.email}</Text>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
          <Modal
            transparent={true}
            animationType="slide"
            visible={isModalVisible}
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Name:</Text>
                  <TextInput
                    style={styles.Modelinput}
                    placeholder="Enter Name"
                    onChangeText={text => {
                      setName(text);
                    }}
                    value={name}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email:</Text>
                  <TextInput
                    style={styles.Modelinput}
                    placeholder="Enter Email"
                    onChangeText={text => {
                      setEmail(text);
                    }}
                    value={email}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>backgroundColor:</Text>
                  <TextInput
                    style={styles.Modelinput}
                    placeholder="Enter Color"
                    onChangeText={text => {
                      setBackgroundColor(text);
                    }}
                    value={backgroundColor}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Phone No:</Text>
                  <TextInput
                    style={styles.Modelinput}
                    placeholder="Enter Phone"
                    keyboardType="numeric"
                    onChangeText={text => {
                      setPhoneNo(text);
                    }}
                    value={phoneNo}
                  />
                </View>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginTop: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      addNewData();
                    }}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Add</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  item: {
    borderRadius: 2,
    margin: 2,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  textstyle: {
    color: '#00FFFF',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginRight: 5,
    color: 'black',
  },
  Modelinput: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    paddingLeft: 10,
  },
});
