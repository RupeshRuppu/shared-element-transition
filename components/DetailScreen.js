import {useEffect} from 'react';
import {Text, SafeAreaView, Dimensions, StatusBar} from 'react-native';
import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
const {width} = Dimensions.get('screen');
import Icon from 'react-native-vector-icons/AntDesign';

const DetailScreen = ({navigation, route}) => {
  const {id, uri, title, desc} = route.params;
  console.log(id);
  const backSharedValue = useSharedValue(0);

  useEffect(() => {
    backSharedValue.value = withDelay(
      500,
      withTiming(1, {
        duration: 300,
      }),
    );
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Animated.View
        style={{
          position: 'absolute',
          top: StatusBar.currentHeight || 70,
          left: 10,
          zIndex: 2,
          opacity: backSharedValue,
        }}>
        <Icon
          name="leftcircleo"
          size={26}
          color={'#FFFFFF'}
          onPress={() => navigation.goBack()}
        />
      </Animated.View>
      <Animated.Image
        style={{width, height: 300, top: 0, left: 0}}
        resizeMode={'cover'}
        sharedTransitionTag={`image-${id}`}
        source={{uri}}
      />
      <Animated.View
        style={{
          marginVertical: 5,
          paddingHorizontal: 10,
          opacity: backSharedValue,
        }}>
        <Text
          style={{
            fontSize: 24,
            color: '#FFFFFF',
            marginVertical: 2,
          }}>
          {title}
        </Text>
        <Text style={{color: 'wheat'}}>{desc}</Text>
      </Animated.View>
    </SafeAreaView>
  );
};

export default DetailScreen;
