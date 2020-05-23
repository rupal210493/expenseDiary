import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  // TouchableHighlight,
} from 'react-native';
import {
  Layout,
  Card,
  Modal,
  Button,
  Input,
  Datepicker,
  Text,
  List,
  ListItem,
} from '@ui-kitten/components';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';
import {globalStyle} from '../styles/globalstyle';
import {getUserSettings, saveExpenseList, getExpenseList} from '../db';
import {DatePicker} from './datepicker';
import {Icon} from 'react-native-eva-icons';
import hexToRgba from 'hex-to-rgba';
import NumberFormat from 'react-number-format';

const colorsList = [
  '#ffea00',
  '#8bc34a',
  '#00e5ff',
  '#cddc39',
  '#ff9800',
  '#f44336',
  '#9c27b0',
  '#c6ff00',
  '#f50057',
];

let colorVisited = 0;

const getRandomColor = date => {
  colorVisited += 1;
  return colorsList[colorVisited % colorsList.length];
};

const generateId = function() {
  let key =
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9);
  // console.log('kry generated ', key);
  return key;
};

class AddUserExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.expense.date || new Date(),
      amount: this.props.expense.amount || null,
      name: this.props.expense.name || '',
      expenseId: this.props.expenseId,
    };
  }
  render() {
    return (
      <View>
        <Modal
          visible={this.props.visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => this.props.setVisible()}
          style={globalStyle.expenseModal}
          showModal={() => this.props.setVisible()}>
          <Card disabled={true} style={globalStyle.expenseModalCard}>
            <View>
              <Text style={globalStyle.lebel}>Enter your amount*</Text>

              <NumberFormat
                value={this.state.amount}
                displayType={'text'}
                thousandSeparator={true}
                prefix={getUserSettings().currency}
                thousandsGroupStyle="lakh"
                // isNumericString={true}
                renderText={value => (
                  <Input
                    keyboardType="numeric"
                    value={value}
                    style={globalStyle.modalInput}
                    onChangeText={newAmount =>
                      this.setState({amount: newAmount})
                    }
                  />
                )}
              />

              <Text style={globalStyle.lebel}>Enter expense name*</Text>
              <Input
                value={this.state.name}
                style={globalStyle.modalInput}
                onChangeText={newName => this.setState({name: newName})}
              />
              <Text style={globalStyle.lebel}>Enter expense date*</Text>
              <DatePicker
                style={globalStyle.expenseModalDate}
                date={this.state.date}
                onSelectDate={(event, nextDate) =>
                  this.setState({date: nextDate})
                }
              />
            </View>
            <Button
              onPress={() => this.props.saveExpenseData(this.state)}
              style={globalStyle.expenseModalButton}>
              Save
            </Button>
          </Card>
        </Modal>
      </View>
    );
  }
}

export class ExpenseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenseMap: {},
      expenseIds: [],
      showAddExpenseModal: false,
      expenseId: generateId(),
    };
  }

  //  groupExpenseData= (epenseList) => {
  //        let groupExpenses = [];
  //         for (let i = 0; i < expenseList.length; i++) {
  //             let dates = expenseList[i].time.slice(0,10);

  //             if (!groupExpenses[dates]) {
  //               groupExpenses[dates] = [];
  //             }
  //             groupExpenses[dates].push([expenseExpense[i]);
  //         }
  //       }

  componentDidMount() {
    // let expensesData = {};
    // this.setState({
    //   expenseIds: expensesData.expenseIds,
    //   expenseMap: {},
    // });
  }
  toggleAddExpenseModal = currentExpenseId => {
    let nextState = {
      showAddExpenseModal: !this.state.showAddExpenseModal,
    };

    nextState.expenseId = currentExpenseId || generateId();
    this.setState(nextState);
  };

  isSameMonth = (d1, d2) => {
    return (
      d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth()
    );
  };

  saveExpenseData = item => {
    let nextState = {
      showAddExpenseModal: !this.state.showAddExpenseModal,
      expenseMap: {
        ...this.state.expenseMap,
        [item.expenseId]: item,
      },
    };

    if (this.state.expenseMap[item.expenseId]) {
      this.setState(nextState, () => {
        return saveExpenseList({
          expenseMap: this.state.expenseMap,
          expenseIds: this.state.expenseIds,
        });
      });
    } else {
      let expenseIds = [
        {expenseId: item.expenseId, date: item.date, type: 'expense'},
      ];
      if (this.state.expenseIds.length === 0) {
        expenseIds = [{type: 'header', date: item.date}, ...expenseIds];
      } else {
        if (this.isSameMonth(item.date, this.state.expenseIds[0].date)) {
          expenseIds = [
            this.state.expenseIds[0],
            expenseIds[0],
            this.state.expenseIds.slice(1),
          ];
        } else {
          expenseIds = [
            {type: 'header', date: item.date},
            expenseIds[0],
            ...this.state.expenseIds,
          ];
        }
      }

      nextState.expenseIds = [...expenseIds, ...this.state.expenseIds];
      this.setState(nextState, () => {
        console.log("Current state ", this.state);
        return saveExpenseList({
          expenseMap: this.state.expenseMap,
          expenseIds: this.state.expenseIds,
        });
      });
    }
  };

  renderItem = ({item, index}) => {
    if (item.type === 'expense') {
      console.log('renderItem', item, this.state.expenseMap);
      const expense = this.state.expenseMap[item.expenseId];
      const cardColor = getRandomColor(item.date);

      return (
        <ListItem disabled={true}>
          <View
            key={expense.expenseId}
            style={{
              ...globalStyle.expenseCard,
              borderLeftColor: cardColor,
              borderTopColor: hexToRgba(cardColor, 0.19),
              borderRightColor: hexToRgba(cardColor, 0.19),
              borderBottomColor: hexToRgba(cardColor, 0.19),
              backgroundColor: hexToRgba(cardColor, 0.1),
            }}>
            <View style={globalStyle.dataLeft}>
              <View style={globalStyle.expenseTag}>
                <Icon
                  name="pricetags-outline"
                  fill={cardColor}
                  width={20}
                  height={20}
                  style={globalStyle.tagIcon}
                />
                <Text style={{...globalStyle.expenseName, color: cardColor}}>
                  {expense.name}
                </Text>
              </View>
              <View style={globalStyle.expenseTag}>
                <Icon
                  name="calendar-outline"
                  fill={cardColor}
                  width={20}
                  height={20}
                  style={globalStyle.calendarIcon}
                />
                <Text
                  style={
                    globalStyle.expenseDate
                  }>{`${expense.date.getFullYear().toString()}, ${
                  expense.date.toDateString().split(' ')[1]
                } ${expense.date.getDate().toString()}`}</Text>
                {/* <Text>{item.expenseId}</Text> */}
              </View>
            </View>
            <View style={globalStyle.dataRight}>
              <TouchableOpacity
                onPress={() => {
                  this.toggleAddExpenseModal(expense.expenseId);
                }}>
                <View
                  style={{
                    ...globalStyle.outerIconBg,
                    backgroundColor: hexToRgba(cardColor, 0.6),
                  }}>
                  <Icon
                    name="edit"
                    fill={'#fff'}
                    width={25}
                    height={25}
                    style={globalStyle.editIcon}
                  />
                </View>
              </TouchableOpacity>
              <Text style={{...globalStyle.expenseAmount, color: cardColor}}>
                {item.amount}
              </Text>
            </View>
          </View>
        </ListItem>
      );
    } else {
      return (
        <View>
          <Text>{item.date.getFullYear()}</Text>
          <Text>{item.date.getMonth()}</Text>
        </View>
      );
    }
  };

  render() {
    return (
      <Layout level="3" style={globalStyle.backgroundColor}>
        <Layout style={styles.header}>
          <Text style={styles.headerText}>
            {getUserSettings().name}'s expenses ({getUserSettings().currency})
          </Text>
        </Layout>
        <Layout style={styles.contentSection}>
          <View>
            <List renderItem={this.renderItem} data={this.state.expenseIds} />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              this.toggleAddExpenseModal();
              // this.setState({
              //     expenseId: generateId(),
              //   },
              //   this.toggleAddExpenseModal,
              // );
              // console.log('test', this.state);
            }}
            style={styles.TouchableOpacityStyle}>
            <Image
              //We are making FAB using TouchableOpacity with an image
              //We are using online image here

              source={require('../assets/plus_icon.png')}
              // uri:
              //   // 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
              //   ''

              //You can use you project image Example below
              //source={require('./images/float-add-icon.png')}
              style={styles.FloatingButtonStyle}
            />
          </TouchableOpacity>
          <AddUserExpense
            visible={this.state.showAddExpenseModal}
            setVisible={this.toggleAddExpenseModal}
            saveExpenseData={this.saveExpenseData}
            expense={this.state.expenseMap[this.state.expenseId] || {}}
            expenseId={this.state.expenseId}
            key={this.state.expenseId}
          />
        </Layout>
      </Layout>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ed213a',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingTop: 40,
  },
  headerText: {
    fontSize: 28,
    color: '#ffffff',
    flexWrap: 'wrap',
  },
  contentSection: {
    flex: 11,
    width: '100%',
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 65,
    height: 65,
    //backgroundColor:'black'
  },
  modalContainer: {
    minHeight: 192,
    width: '100%',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});
