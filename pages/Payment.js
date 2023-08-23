import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import BackButton from '../Components/BackButton';
import Menu from '../Components/Menu';
import Button from '../Components/Button';
function Payment() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleCardNumberChange = text => {
    setCardNumber(text);
  };

  const handleExpiryDateChange = text => {
    setExpiryDate(text);
  };

  const handleCvvChange = text => {
    setCvv(text);
  };

  const handlePayment = () => {
    // Here, you can implement the logic to process the payment using your preferred method.
    console.log('Payment processed');
    // You can also add functionality to clear the input fields after payment if needed.
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.barView}>
        <BackButton />
        <Text style={styles.text}>Payment Gateway</Text>
        <Menu />
      </View>
      <View style={styles.paymentStyle}>
        <TextInput
          style={styles.input}
          placeholder="Card Number"
          value={cardNumber}
          onChangeText={handleCardNumberChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Expiry Date (MM/YY)"
          value={expiryDate}
          onChangeText={handleExpiryDateChange}
        />
        <TextInput
          style={styles.input}
          placeholder="CVV"
          value={cvv}
          onChangeText={handleCvvChange}
        />
      </View>
      <Button buttonText="Pay Now" onClick={handlePayment} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1f2937',
  },
  paymentStyle: {
    marginTop: '70%',
  },
  barView: {
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: 60,
    paddingHorizontal: '2%',
    marginBottom: '50%',
    position: 'absolute',
    top: '3%',
    left: '5%',
    zIndex: 1,
  },
  text: {
    fontSize: 30,
    textAlign: 'left',
    color: '#ccc',
    position: 'absolute',
    top: '3%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
});

export default Payment;
