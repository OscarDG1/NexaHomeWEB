import { StyleSheet } from 'react-native';

const LoginRegistroStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 30,
     overflow: 'hidden',
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  underline: {
    width: 61,
    height: 6,
    backgroundColor: '#ffffff',
    borderRadius: 9,
    marginTop: 5,
  },
  inputs: {
    marginTop: 25,
    width: '100%',
    paddingHorizontal: 16,
    maxWidth: 600,
    alignItems: 'center',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 480,
    height: 50,
    backgroundColor: '#eaeaea',
    borderRadius: 6,
    marginBottom: 20,
    paddingLeft: 10,
  },
  icon: {
    marginHorizontal: 10,
    width: 18,
    height: 18,
  },
  inputText: {
    flex: 1,
    height: 40,
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: '#797979',
    fontSize: 16,
  },
  olvidarContraseña: {
    paddingLeft: 20,
    marginTop: 20,
    color: '#797979',
    fontSize: 16,
  },
  olvidarContraseñaSpan: {
    color: '#4c00b4',
    cursor: 'pointer',
  },
  submitContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    marginTop: -20,
  },
  submit: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 40,
    marginTop: 10,
    color: '#fff',
    backgroundColor: '#4c00b4',
    borderRadius: 20,
    fontSize: 16,
    fontWeight: '700',
    cursor: 'pointer',
    alignSelf: 'center',
  },
  entrarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 40,
    marginTop: 10,
    color: '#fff',
    backgroundColor: '#4c00b4',
    borderRadius: 20,
    fontSize: 16,
    fontWeight: '700',
    cursor: 'pointer',
    alignSelf: 'center',
  },
 videoContainer: {
     ...StyleSheet.absoluteFillObject,
     zIndex: -1,
 },
 backgroundVideo: {
     ...StyleSheet.absoluteFillObject,
     width: '100%',
     height: '100%',
 },


});

export default LoginRegistroStyles;
