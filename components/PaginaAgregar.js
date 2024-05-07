import React, { useState } from 'react';
import { View,Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Input } from '@rneui/themed';
const PaginaAgregar = ({ navigation }) => {
const [producto, setProducto] = useState({
nombre: '',
descripcion: '',
preciodeventa: '',
preciodecosto: '',
cantidad: '',
fotografia: '',
});
const isValidNombre = (name) => /^[A-Za-z\s]+$/.test(name);
const isValidCantidad = (cant) => /^\d+$/.test(cant);
const isValidPrice = (price) => /^([0-9]+\.?[0-9]{0,2})$/.test(price);
const uri = 'https://marketudb2024.000webhostapp.com/';//Asegúrate de reemplazar la URL completa con la URI que hascreado."
const guardar = () => {
if (!isValidNombre(producto.nombre)) {
Alert.alert('Error', 'Nombre inválido. Debe contener solo letras y espacios.');
return;
}
if (!isValidCantidad(producto.cantidad)) {
Alert.alert('Error', 'Fecha inválido. Debe contener solo el dia.');
return;
}
if (!isValidPrice(producto.preciodecosto) || !isValidPrice(producto.preciodeventa) ) {
Alert.alert('Error', 'precio inválido. Debe contener solo dos decimales.');
return;
}
fetch(`${uri}/api.php?comando=agregar&nombre=${producto.nombre} &descripcion=${producto.descripcion}
&cantidad=${producto.cantidad}&preciodecosto=${producto.preciodecosto}&preciodeventa=${producto.preciodeventa}
&fotografia=${producto.fotografia}`, {
method: 'GET'
})
.then((response) => response.json())
.then((responseJson) => {
console.log(responseJson);
const mensaje=responseJson.mensaje;
// console.log(mensaje);
if(!mensaje)
alert("Error al agregar!");
else
{
alert(mensaje);
navigation.goBack()
}
})
.catch((error) => {
console.error(error);
alert("Error de Internet!!");
});
};
return (
<View style={styles.container}>
<Input
label="Nombre"
value={producto.nombre}
onChangeText={text => setProducto({ ...producto, nombre: text })}
/>
<Input
label="Descripción"
value={producto.descripcion}
onChangeText={text => setProducto({ ...producto, descripcion: text })}
/>
<Input
label="Hora"
value={producto.preciodecosto}
onChangeText={text => setProducto({ ...producto, preciodecosto: text })}
/>
<Input
label="Precio"
value={producto.preciodeventa}
onChangeText={text => setProducto({ ...producto, preciodeventa: text })}
/>
<Input
label="fecha"
value={producto.cantidad}
onChangeText={text => setProducto({ ...producto, cantidad: text })}
/>
<Input
label="Fotografía"
value={producto.fotografia}
onChangeText={text => setProducto({ ...producto, fotografia: text })}
/>
<TouchableOpacity style={styles.button} onPress={guardar}>
<Text style={styles.buttonText}>Guardar</Text>
</TouchableOpacity>
</View>
);
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F0F4C3',
    },
    button: {
        height: 50,
        backgroundColor: '#4CAF50', 
        borderRadius: 5,
        justifyContent: 'center',
        marginTop: 15,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 22,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});
        export default PaginaAgregar;