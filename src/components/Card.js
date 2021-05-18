import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';


const Card = props => {
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    fetch(props.items.url)
      .then(response => response.json())
      .then(json => {
        setPokemonDetails(json);
      })
      .catch(e => {
        console.log(e);
      });
  }, [props]);

  return (
    <View style={styles.card}>
      {pokemonDetails && (
        <View>
          <Image
            source={{
              uri: pokemonDetails.sprites.other['official-artwork']
                .front_default,
            }}
            style={styles.pokemonImage}
          />
          <Text style={styles.pokemonName}>{props.items.name}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Height: {pokemonDetails.height}</Text>
            <Text>Weight: {pokemonDetails.weight}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pokemonName: {
    textTransform: 'capitalize',
    textAlign: 'center',
    marginBottom: 10,
  },
  pokemonImage: {
    alignSelf: 'center',
    height: 150,
    width: 150,
    borderWidth: 1,
    borderRadius: 75,
    resizeMode: 'stretch',
  },
  card: {
    margin: 20,
    borderWidth: 0,
    borderRadius: 5,
    backgroundColor: 'white',
    elevation: 4,
    padding: 10,
    height: 220,
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
});

export {Card};
