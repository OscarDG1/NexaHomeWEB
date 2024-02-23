import { StyleSheet } from 'react-native';

const HomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50, // Ajusta según sea necesario para subir todos los elementos
  },
  header: {
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    width: 150,
    height: 150,
    marginTop: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start', // Alinea el contenido al principio
    alignItems: 'center',
    marginTop: 20, // Ajusta según sea necesario para subir los elementos del contenido
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 20, // Ajusta según sea necesario para subir la barra de búsqueda
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  searchButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20, // Ajusta según sea necesario para subir las opciones
  },
  optionButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  optionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  selectedOption: {
    backgroundColor: '#0056b3',
  },

  // Nuevos estilos para los enlaces en la esquina superior derecha
  headerLinksContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row',
    marginRight: -530,
    marginTop: -40,
  },
  headerLink: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreenStyles;
