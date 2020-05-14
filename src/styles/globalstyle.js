import theme from './theme.json';
import {StyleSheet} from 'react-native';
import hexToRgba from 'hex-to-rgba';

export const globalStyle = StyleSheet.create({
  color: {
    color: theme['color-basic-500'],
    fontSize: 18,
  },
  backgroundColor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    height: 50,
    width: '100%',
    backgroundColor: '#ffffff',
    color: '#000',
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 40,
  },
  expenseModal: {
    width: '85%',
  },
  expenseModalCard: {
    backgroundColor: '#f6f6f6',
    paddingTop: 40,
    paddingBottom: 40,
  },
  modalInput: {
    marginBottom: 25,
    width: '100%',
  },
  expenseModalDate: {
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: '#fff',
    borderColor: '#e4e4e4',
    height: 44,
    paddingLeft: 20,
    justifyContent: 'center',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    paddingTop: 11,
  },
  expenseModalButton: {
    marginTop: 45,
    backgroundColor: '#ed213a',
    borderColor: '#ed219a',
    fontSize: 30,
  },
  dateIcon: {
    position: 'absolute',
    right: 10,
    top: -37,
    flexDirection: 'row',
  },
  expenseCard: {
    backgroundColor: 'rgba(0,0,0,0.06)',
    padding: 10,
    borderWidth: 1,
    borderLeftWidth: 5,
    borderStyle: 'solid',
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 5,
  },
  editIcon: {
    position: 'absolute',
    right: 10,
    top: -12,
    bottom: 0,
    left: -12,
    alignItems:'center',
    justifyContent:'center',
  },
  outerIconBg: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: '#ff0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  lebel: {
    color: '#000',
    marginBottom: 6,
  },
  expenseName: {
    fontSize: 18,
    color: '#ff0',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  expenseAmount: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dataRight: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  expenseTag: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom:10,
  },
  tagIcon: { 
    marginRight: 5,
  },
  expenseDate: {
    fontWeight: 'bold',
    color: '#777',
  }
});
