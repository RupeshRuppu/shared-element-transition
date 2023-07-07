import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {
  Text,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Pressable,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';

const {width, height} = Dimensions.get('screen');
const SPACING = 2;
const ITEM_SIZE = width * 0.5 - 8;

const DATA = [
  {
    id: 101,
    uri: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    title: 'Black Skoda',
  },
  {
    id: 102,
    uri: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    title: 'Gray Skoda',
  },
  {
    id: 103,
    uri: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    title: 'Yellow Skoda',
  },
  {
    id: 104,
    uri: 'https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    title: 'Bugatti Black Power',
  },
  {
    id: 105,
    uri: 'https://images.unsplash.com/photo-1513036191774-b2badb8fcb76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    title: 'Red Skoda Power',
  },
  {
    id: 106,
    uri: 'https://images.unsplash.com/photo-1462396881884-de2c07cb95ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNhcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    title: 'GTR NISSAN RED',
  },
  {
    id: 107,
    uri: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    title: 'Lamborghini BLACK',
  },
  {
    id: 108,
    uri: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    title: 'Blue Skoda Power',
  },
  {
    id: 109,
    uri: 'https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNhcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    title: 'Red Ferrari Power',
  },
];

const ListScreen = ({navigation}) => {
  const scale = useSharedValue(0);
  const [uri, setUri] = useState(null);

  useFocusEffect(
    useCallback(() => {
      setUri(null);
      scale.value = withTiming(0, {duration: 100});
    }, [navigation]),
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 26,
          fontWeight: '500',
          color: '#121212',
          marginVertical: 10,
        }}>
        Beautiful Cars
      </Text>
      <ScrollView
        contentContainerStyle={{
          padding: SPACING,
          flexDirection: 'row',
          width,
          flexWrap: 'wrap',
        }}>
        {DATA.map(({id, uri, title, desc}) => {
          return (
            <Pressable
              key={id}
              style={{
                width: ITEM_SIZE,
                height: ITEM_SIZE,
                margin: SPACING,
              }}
              onPress={() => {
                navigation.navigate('DetailScreen', {
                  id,
                  uri,
                  title,
                  desc,
                });
                setUri(uri);
                scale.value = withTiming(1, {duration: 200});
              }}>
              <Animated.Image
                source={{uri}}
                style={{
                  width: '100%',
                  height: '90%',
                }}
                resizeMode={'cover'}
                sharedTransitionTag={`image-${id}`}
              />
              <Text style={{fontSize: 14, color: '#444', marginVertical: 2}}>
                {title}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
      <Animated.View
        style={{
          position: 'absolute',
          ...StyleSheet.absoluteFill,
          transform: [{scale}],
        }}>
        {uri && (
          <ImageBackground
            style={{width, height}}
            source={{uri}}
            blurRadius={25}
          />
        )}
      </Animated.View>
    </SafeAreaView>
  );
};

export default ListScreen;
