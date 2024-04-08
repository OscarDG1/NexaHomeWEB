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
  select: {
    flexDirection: 'row', // Cambiamos la dirección del contenedor a fila
    justifyContent: 'space-around',
    marginBottom: 20, // Separación vertical entre los botones y otros elementos
  },
  optionButton: {
    flex: 1, // Para que los botones se ajusten al contenido y no ocupen toda la fila
    backgroundColor: '#007bff', // Color de fondo inicial
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10, // Separación horizontal entre los botones
  },
  optionText: {
    color: '#fff', // Color del texto en los botones
    fontWeight: 'bold',
    textAlign: 'center', // Alineación del texto al centro
  },
  selectedOption: {
    backgroundColor: '#0056b3', // Color de fondo al ser seleccionado
  },
});

export default PropiedadStyles;
