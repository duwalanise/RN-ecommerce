import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const FindMe = ({}) => {
  const openUrl = (url) => () => {
    Linking.openURL(url);
  };
  return (
    <View style={styles.body}>
      <TouchableOpacity
        onPress={openUrl('https://github.com/duwalanise')}
        style={styles.container}
      >
        <Ionicons style={styles.icon} name="logo-github" size={50} />
        <Text style={styles.socialText}>GitHub</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={openUrl('https://www.linkedin.com/in/anishduwal/')}
        style={styles.container}
      >
        <Ionicons
          style={styles.icon}
          name="logo-linkedin"
          size={50}
          color="#0e76a8"
        />
        <Text style={styles.socialText}>LinkedIn</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={openUrl('https://twitter.com/duwalanise')}
        style={styles.container}
      >
        <Ionicons
          style={styles.icon}
          name="logo-twitter"
          size={50}
          color="#1e9ceb"
        />
        <Text style={styles.socialText}>Twitter</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={openUrl('https://stackoverflow.com/users/7193872/duwalanise')}
        style={styles.container}
      >
        <FontAwesome
          style={styles.icon}
          name="stack-overflow"
          size={50}
          color="#F48024"
        />
        <Text style={styles.socialText}>Stack Overflow</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FindMe;

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fbf9ed',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 200,
    marginVertical: 10,
  },
  socialText: {
    fontSize: 24,
    paddingHorizontal: 10,
  },
  icon: {
    width: 50,
  },
});
