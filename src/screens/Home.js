import React, {useEffect, useState, createRef} from 'react';
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Button,
} from 'react-native';
import {Card} from '../components/Card';
import ToggleSwitch from 'rn-toggle-switch';

const Home = () => {
  const [pokemon, setPokemon] = useState(null);
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState(true);
  const [scroll, setScroll] = useState();
  const flatList = createRef();

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/')
      .then(response => response.json())
      .then(json => {
        setPokemon(json);
        setPokeData(json.results);
      });
  }, []);


  function loadMore() {
    setLoading(true);
    let link = pokemon.next;
    fetch(link)
      .then(response => response.json())
      .then(json => {
        setLoading(false);
        setPokemon(json);
        setPokeData([...pokeData, ...json.results]);
      })
      .catch(e => console.log(e));
  }

  const listFooter = () => {
    return <View>{loading ? <ActivityIndicator color="black" /> : null}</View>;
  };

  const handleScroll = event => {
    setScroll({scrollPosition: event.nativeEvent.contentOffset.y});
  };

  const toggle = val => {
    setView(val);
    flatList.current.scrollToOffset({scroll, animated: true});
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text>Comfortable </Text>
        <ToggleSwitch
          text={{
            on: '',
            off: '',
          }}
          textStyle={{fontWeight: 'bold'}}
          color={{
            indicator: 'white',
            active: 'rgba(32, 193, 173, 1)',
            inactive: 'rgba( 247, 247, 247, 1)',
            activeBorder: '#41B4A4',
            inactiveBorder: '#E9E9E9',
          }}
          active={true}
          disabled={false}
          width={40}
          radius={15}
          onValueChange={val => toggle(val)}
        />
        <Text> Compact</Text>
      </View>
      <FlatList
        ref={flatList}
        key={view}
        data={pokeData}
        renderItem={({item, i}) => <Card items={item} key={i} />}
        keyExtractor={item => item.name}
        onEndReached={loadMore}
        getItemLayout={(data, index) => ({
          length: 220,
          offset: 220 * index,
          index,
        })}
        refreshing={false}
        onEndReachedThreshold={0.5}
        ListFooterComponent={listFooter}
        numColumns={view ? 2 : 1}
        onScroll={handleScroll}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: '1%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  toggle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
  },
});

export default Home;
