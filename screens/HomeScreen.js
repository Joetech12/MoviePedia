import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  SafeAreaView,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import { StatusBar } from 'expo-status-bar';
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from '../api/moviedb';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { styles } from '../theme';

const ios = Platform.OS === 'ios';

export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    console.log('got trending', data.results.length);
    if (data && data.results) setTrending(data.results);
    setLoading(false);
  };
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    console.log('got upcoming', data.results.length);
    if (data && data.results) setUpcoming(data.results);
  };
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    console.log('got top rated', data.results.length);
    if (data && data.results) setTopRated(data.results);
  };

  return (
    <View className="flex-1 bg-neutral-800">
      {/* search bar */}
      <SafeAreaView className={ios ? '-mb-2' : 'mt-[45px] mb-[20px]'}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          {/* <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" /> */}
          <Image
            source={require('../assets/logo.png')}
            style={{ width: 50, height: 50, resizeMode: 'contain' }}
          />
          <Text className="text-white text-2xl font-bold">
            <Text style={styles.text}>M</Text>oviepedia
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* Trending Movies Carousel */}
          {trending.length > 0 && <TrendingMovies data={trending} />}
          {/* <TrendingMovies data={trending} /> */}

          {/* upcoming movies row */}
          {upcoming.length > 0 && (
            <MovieList title="Upcoming" data={upcoming} />
          )}

          {/* top rated movies row */}
          {topRated.length > 0 && (
            <MovieList title="Top Rated" data={topRated} />
          )}
          {/* <MovieList title="Top Rated" data={topRated} /> */}
          <Text
            // style={{
            //   color: colors.Grey,
            //   fontSize: 13,
            //   opacity: 0.5,
            //   marginBottom: 30,
            // }}
            style={styles.text}
            className="text-[14px] mb-[30px] mt-[20px] w-full text-center"
          >
            Ifeanyi Umeh © 2023
          </Text>
        </ScrollView>
      )}
    </View>
  );
}
