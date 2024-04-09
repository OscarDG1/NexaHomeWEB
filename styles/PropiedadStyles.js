import { StyleSheet } from 'react-native';

const PropiedadStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: '#f0f0f0',
  },
  form: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    width: 200,
  },
  selectContainer: {
    marginBottom: 20, // Separación vertical entre los botones y otros elementos
  },
  optionButton: {
    backgroundColor: '#0056b3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10, // Separación horizontal entre los botones
  },
  optionText: {
    color: '#fff', // Cambiamos el color del texto a blanco
    fontWeight: 'bold',
    textAlign: 'center', // Alineamos el texto al centro
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    width: 200
  },
   buttonguardar: {
      backgroundColor: '#007bff',
      paddingVertical: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 20,
    },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  selectedOption: {
    backgroundColor: '#0056b3',
    color: '#fff',
  },
});

export default PropiedadStyles;
