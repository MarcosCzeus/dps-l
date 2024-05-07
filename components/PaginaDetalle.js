import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Input } from "@rneui/themed";
import Icon from "react-native-vector-icons/FontAwesome";
const PaginaDetalle = ({ route, navigation }) => {
  const [producto, setProducto] = useState(route.params, {});
  const uri = "https://marketudb2024.000webhostapp.com/"; //Asegúrate de reemplazar la URL completa con la URI que hascreado."
  const x = `${uri}/api.php?comando=editar&nombre=${producto.nombre}
&descripcion=${producto.descripcion}&cantidad=${producto.cantidad}&preciodecosto=${producto.preciodecosto}&pre
ciodeventa=${producto.preciodeventa}&fotografia=${producto.fotografia}`;
  console.log(x);
  const isValidNombre = (name) => /^[A-Za-z\s]+$/.test(name);
  const isValidCantidad = (cant) => /^\d+$/.test(cant);
  const isValidPrice = (price) => /^([0-9]+\.?[0-9]{0,2})$/.test(price);
  const actualizar = () => {
    if (!isValidNombre(producto.nombre)) {
      Alert.alert(
        "Error",
        "Nombre inválido. Debe contener solo letras y espacios."
      );
      return;
    }
    if (!isValidCantidad(producto.cantidad)) {
      Alert.alert(
        "Error",
        "Fecha inválido. Debe contener solo el dia."
      );
      return;
    }
    if (
      !isValidPrice(producto.preciodecosto) ||
      !isValidPrice(producto.preciodeventa)
    ) {
      Alert.alert(
        "Error",
        "precio inválido. Debe contener solo dos decimales."
      );
      return;
    }
    fetch(
      `${uri}/api.php?comando=editar&nombre=${producto.nombre}
&descripcion=${producto.descripcion}&cantidad=${producto.cantidad}&preciodecosto=${producto.preciodecosto}&pre
ciodeventa=${producto.preciodeventa}&fotografia=${producto.fotografia}&id=${producto.id}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        const mensaje = responseJson.mensaje;
        console.log(mensaje);
        if (!mensaje) alert("Error al actualizar!");
        else {
          alert(mensaje);
          navigation.goBack();
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Error de Internet!!");
      });
  };
  const eliminar = () => {
    fetch(`${uri}/api.php?comando=eliminar&id=${producto.id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        const mensaje = responseJson.mensaje;
        console.log(mensaje);
        if (!mensaje) alert("Error al eliminar!");
        else {
          alert(mensaje);
          navigation.goBack();
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Error de Internet!!");
      });
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={actualizar}>
            <Text style={styles.buttonText}>Actualizar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={eliminar}>
            <Text style={styles.buttonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detailsContainer}>
          <Input
            label="Nombre"
            value={producto.nombre}
            onChangeText={(text) => setProducto({ ...producto, nombre: text })}
          />
          <Input
            label="Descripción"
            value={producto.descripcion}
            onChangeText={(text) =>
              setProducto({ ...producto, descripcion: text })
            }
          />
          <Input
            label="Hora"
            value={producto.preciodecosto}
            onChangeText={(text) =>
              setProducto({ ...producto, preciodecosto: text })
            }
          />
          <Input
            label="Precio"
            value={producto.preciodeventa}
            onChangeText={(text) =>
              setProducto({ ...producto, preciodeventa: text })
            }
          />
          <Input
            label="Fecha"
            value={producto.cantidad}
            onChangeText={(text) =>
              setProducto({ ...producto, cantidad: text })
            }
          />
          <Input
            label="Fotografía"
            value={producto.fotografia}
            onChangeText={(text) =>
              setProducto({ ...producto, fotografia: text })
            }
          />
          <Image style={styles.image} source={{ uri: producto.fotografia }} />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4C3', 
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    flex: 1,
    height: 40,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    justifyContent: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  detailsContainer: {
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 10,
  },
});

export default PaginaDetalle;
