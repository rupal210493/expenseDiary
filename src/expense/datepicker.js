import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {Layout, Input} from '@ui-kitten/components';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Icon} from 'react-native-eva-icons';
import {globalStyle} from '../styles/globalstyle';

const formatDate = date => {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

const TextInput = props => {
  return (
    <View style={{flex: 1}}>
      <Text style={globalStyle.expenseModalDate}>
        {props.value || props.placeholder}{' '}
      </Text>
      <Icon
        name="calendar-outline"
        fill="#d5d5d5"
        width={30}
        height={30}
        style={globalStyle.dateIcon}
      />
    </View>
  );
};

export const DatePicker = props => {
  const [show, setShow] = React.useState(false);

  return (
    <Layout style={styles.container} level="1">
      <TouchableOpacity onPress={() => setShow(!show)}>
        <TextInput
          placeholder="Enter your amount"
          value={formatDate(props.date)}
          // onChangeText={nextValue => setValue(nextValue)}
        />
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={props.date}
          mode={'date'}
          display="default"
          onChange={(event, nextDate) => {
            setShow(false);
            props.onSelectDate(event, nextDate);
          }}
        />
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {},
  icon: {
    width: 32,
    height: 32,
  },
});
