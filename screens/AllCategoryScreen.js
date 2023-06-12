import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../components/movieList';
import {
  fallbackPersonImage,
  fetchPersonDetails,
  fetchPersonMovies,
  image185,
  image342,
  image500,
} from '../api/moviedb';
import Loading from '../components/loading';
import { styles, theme } from '../theme';
import { TouchableWithoutFeedback } from 'react-native';

// const ios = Platform.OS == 'ios';
// const verticalMargin = ios ? '' : ' my-3';
var { width, height } = Dimensions.get('window');

export default function AllCategoryScreen() {
  const { params: items } = useRoute();
  const { title, data } = items;
  const [isFavourite, toggleFavourite] = useState(false);
  const navigation = useNavigation();
  const [person, setPerson] = useState({});
  const [personMovies, setPersonMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const BackButton = () => {
    //   console.log(props);
    return (
      <TouchableOpacity
        style={styles.background}
        className="rounded-xl p-1"
        onPress={() => navigation.goBack()}
      >
        <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
      </TouchableOpacity>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => <BackButton />,
      headerRight: () => (
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: 'rgb(212, 212, 212)',
          }}
        >
          {title} Movies
        </Text>
      ),
      headerStyle: {
        backgroundColor: 'rgb(23, 23, 23)',
      },
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    getPersonDetails(data.id);
    getPersonMovies(data.id);
  }, [data]);

  console.log(data);

  const getPersonDetails = async (id) => {
    const datas = await fetchPersonDetails(id);
    console.log('got person details');
    setLoading(false);
    if (datas) {
      setPerson(datas);
    }
  };
  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    console.log('got person movies');
    if (data && data.cast) {
      setPersonMovies(data.cast);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingVertical: 20 }}
    >
      {/* categories details */}
      {loading ? (
        <Loading />
      ) : (
        data.length > 0 && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            className="space-y-3"
          >
            {/* <Text className="text-white font-semibold ml-1">
              {title} ({data.length})
            </Text> */}
            <View className="flex-row justify-between flex-wrap">
              {data &&
                data.map((item, index) => {
                  return (
                    <TouchableWithoutFeedback
                      key={index}
                      onPress={() => navigation.push('Movie', item)}
                    >
                      <View className="space-y-2 mb-4">
                        <Image
                          source={{
                            uri:
                              image185(item.poster_path) || fallbackMoviePoster,
                          }}
                          // source={require('../assets/images/moviePoster2.png')}
                          className="rounded-3xl"
                          style={{ width: width * 0.44, height: height * 0.3 }}
                        />
                        <Text className="text-gray-300 ml-1">
                          {item.title.length > 22
                            ? item.title.slice(0, 22) + '...'
                            : item.title}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
            </View>
          </ScrollView>
        )
      )}
    </ScrollView>
  );
}
