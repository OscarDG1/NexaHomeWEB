import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import PropiedadStyles from '../Styles/PropiedadStyles';

const HouseComponent = ({ onSave }) => {
  const [tipoPropiedad, setTipoPropiedad] = useState('casa');
  const [correo, setCorreo] = useState('');
  const [metrosCuadrados, setMetrosCuadrados] = useState('');
  const [habitaciones, setHabitaciones] = useState('');
  const [baños, setBaños] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [provincia, setProvincia] = useState('');
  const [calle, setCalle] = useState('');
  const [numero, setNumero] = useState('');
  const [precio, setPrecio] = useState('');
  const [estado, setEstado] = useState('');
  const [parking, setParking] = useState(false);
  const [piscina, setPiscina] = useState(false);
  const [planta, setPlanta] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [orientacion, setOrientacion] = useState('');
  const [ascensor, setAscensor] = useState(false);

  const handleSubmit = () => {
    const propiedadData = {
      correo,
      metroscuadrados: parseInt(metrosCuadrados),
      habitaciones: parseInt(habitaciones),
      baños: parseInt(baños),
      ciudad,
      provincia,
      calle,
      numero: parseInt(numero),
      precio: parseInt(precio),
      estado,
      parking,
      piscina,
      tipopropiedad: tipoPropiedad,
      planta: parseInt(planta),
      descripcion: descripcion || null,
      orientacion: orientacion || null,
      ascensor: tipoPropiedad === 'piso' ? ascensor : false,
    };

    onSave(propiedadData);
  };

  return (
    <View style={PropiedadStyles.container}>
      <ScrollView contentContainerStyle={PropiedadStyles.form}>
        <Text style={PropiedadStyles.title}>Formulario de Propiedad</Text>

        <View style={PropiedadStyles.inputContainer}>
          <Text style={PropiedadStyles.label}>Correo:</Text>
          <TextInput
            style={PropiedadStyles.input}
            keyboardType="email-address"
            value={correo}
            onChangeText={setCorreo}
          />
        </View>

        {/* Agrega más campos de entrada aquí según sea necesario */}
        <View style={PropiedadStyles.inputContainer}>
          <Text style={PropiedadStyles.label}>Metros cuadrados:</Text>
          <TextInput
            style={PropiedadStyles.input}
            keyboardType="numeric"
            value={metrosCuadrados}
            onChangeText={setMetrosCuadrados}
          />
        </View>

        <View style={PropiedadStyles.inputContainer}>
          <Text style={PropiedadStyles.label}>Habitaciones:</Text>
          <TextInput
            style={PropiedadStyles.input}
            keyboardType="numeric"
            value={habitaciones}
            onChangeText={setHabitaciones}
          />
        </View>

        <View style={PropiedadStyles.inputContainer}>
          <Text style={PropiedadStyles.label}>Baños:</Text>
          <TextInput
            style={PropiedadStyles.input}
            keyboardType="numeric"
            value={baños}
            onChangeText={setBaños}
          />
        </View>

        <View style={PropiedadStyles.inputContainer}>
          <Text style={PropiedadStyles.label}>Ciudad:</Text>
          <TextInput
            style={PropiedadStyles.input}
            value={ciudad}
            onChangeText={setCiudad}
          />
        </View>

        <View style={PropiedadStyles.inputContainer}>
          <Text style={PropiedadStyles.label}>Provincia:</Text>
          <TextInput
            style={PropiedadStyles.input}
            value={provincia}
            onChangeText={setProvincia}
          />
        </View>

        <View style={PropiedadStyles.inputContainer}>
          <Text style={PropiedadStyles.label}>Calle:</Text>
          <TextInput
            style={PropiedadStyles.input}
            value={calle}
            onChangeText={setCalle}
          />
        </View>

        <View style={PropiedadStyles.inputContainer}>
          <Text style={PropiedadStyles.label}>Número:</Text>
          <TextInput
            style={PropiedadStyles.input}
            keyboardType="numeric"
            value={numero}
            onChangeText={setNumero}
          />
        </View>

        <View style={PropiedadStyles.inputContainer}>
          <Text style={PropiedadStyles.label}>Precio:</Text>
          <TextInput
            style={PropiedadStyles.input}
            keyboardType="numeric"
            value={precio}
            onChangeText={setPrecio}
          />
        </View>

        <View style={PropiedadStyles.inputContainer}>
          <Text style={PropiedadStyles.label}>Estado:</Text>
          <TextInput
            style={PropiedadStyles.input}
            value={estado}
            onChangeText={setEstado}
          />
        </View>

        <View style={PropiedadStyles.checkboxContainer}>
          <Text style={PropiedadStyles.label}>Parking:</Text>
          <TouchableOpacity
            style={[PropiedadStyles.checkbox, parking && PropiedadStyles.selectedOption]}
            onPress={() => setParking(!parking)}
          ></TouchableOpacity>
        </View>

        <View style={PropiedadStyles.checkboxContainer}>
          <Text style={PropiedadStyles.label}>Piscina:</Text>
          <TouchableOpacity
            style={[PropiedadStyles.checkbox, piscina && PropiedadStyles.selectedOption]}
            onPress={() => setPiscina(!piscina)}
          ></TouchableOpacity>
        </View>

        <View style={PropiedadStyles.selectContainer}>
                 <Text style={PropiedadStyles.label}>Tipo de propiedad:</Text>
                 <View style={PropiedadStyles.select}>
                   <TouchableOpacity onPress={() => setTipoPropiedad('casa')} style={[PropiedadStyles.button, tipoPropiedad === 'casa' && PropiedadStyles.selectedOption]}>
                     <Text style={PropiedadStyles.buttonText}>Casa</Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={() => setTipoPropiedad('piso')} style={[PropiedadStyles.button, tipoPropiedad === 'piso' && PropiedadStyles.selectedOption]}>
                     <Text style={PropiedadStyles.buttonText}>Piso</Text>
                   </TouchableOpacity>
                 </View>
               </View>

               {/* Mostrar los campos adicionales según el tipo de propiedad seleccionada */}
               {tipoPropiedad === 'piso' && (
                 <View>
                   <View style={PropiedadStyles.inputContainer}>
                     <Text style={PropiedadStyles.label}>Planta:</Text>
                     <TextInput
                       style={PropiedadStyles.input}
                       keyboardType="numeric"
                       value={planta}
                       onChangeText={setPlanta}
                     />
                   </View>
                   <View style={PropiedadStyles.checkboxContainer}>
                     <Text style={PropiedadStyles.label}>Ascensor:</Text>
                     <TouchableOpacity
                       style={[PropiedadStyles.checkbox, ascensor && PropiedadStyles.selectedOption]}
                       onPress={() => setAscensor(!ascensor)}
                     ></TouchableOpacity>
                   </View>
                 </View>
               )}

               {tipoPropiedad === 'casa' && (
                 <View style={PropiedadStyles.inputContainer}>
                   <Text style={PropiedadStyles.label}>Planta:</Text>
                   <TextInput
                     style={PropiedadStyles.input}
                     keyboardType="numeric"
                     value={planta}
                     onChangeText={setPlanta}
                   />
                 </View>
               )}

        <View style={PropiedadStyles.inputContainer}>
          <Text style={PropiedadStyles.label}>Descripción:</Text>
          <TextInput
            style={[PropiedadStyles.input, { height: 100 }]}
            multiline
            value={descripcion}
            onChangeText={setDescripcion}
          />
        </View>

        <View style={PropiedadStyles.inputContainer}>
          <Text style={PropiedadStyles.label}>Orientación:</Text>
          <TextInput
            style={PropiedadStyles.input}
            value={orientacion}
            onChangeText={setOrientacion}
          />
        </View>

        <TouchableOpacity style={PropiedadStyles.buttonguardar} onPress={handleSubmit}>
          <Text style={PropiedadStyles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default HouseComponent;
