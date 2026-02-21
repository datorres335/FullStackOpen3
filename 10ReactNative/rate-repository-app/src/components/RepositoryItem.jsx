import { View, Image, StyleSheet } from 'react-native';

import theme from '../theme';
import Text from './Text';
import formatInThousands from '../utils/formatInThousands';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white', 
    padding: 15, 
  },
  topContainer: {
    flexDirection: 'row', // Arrange items horizontally
    marginBottom: 15, 
  },
  bottomContainer: {
    flexDirection: 'row', // Arrange stats horizontally
    justifyContent: 'space-around', // Distribute items evenly with equal spacing
  },
  avatarContainer: {
    flexGrow: 0, // Don't grow beyond its content size
    marginRight: 20,
  },
  contentContainer: {
    flexGrow: 1, // Take remaining space in the row; The direction of growth depends on the parent's flexDirection. Default flexDirection is 'column' (vertical) if not specified.
    flexShrink: 1, // Allow shrinking if space is limited
  },
  nameText: {
    marginBottom: 5,
  },
  descriptionText: {
    flexGrow: 1, // Fill available vertical space; The direction of growth depends on the parent's flexDirection.
  },
  avatar: {
    width: 45, // Fixed width for circular image
    height: 45, // Fixed height for circular image
    borderRadius: theme.roundness, // Round corners for circular appearance
  },
  countItem: {
    flexGrow: 0, // Don't grow, maintain fixed size
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
    paddingHorizontal: 15,
  },
  countItemCount: {
    marginBottom: 5,
  },
  languageContainer: {
    marginTop: 10,
    flexDirection: 'row', // Arrange horizontally
  },
  languageText: {
    color: 'white',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
    flexGrow: 0, // Don't grow beyond text size
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
});

const CountItem = ({ label, count }) => {
  return (
    <View style={styles.countItem}>
      <Text style={styles.countItemCount} fontWeight="bold">
        {formatInThousands(count)}
      </Text>
      <Text color="textSecondary">{label}</Text>
    </View>
  );
};

const RepositoryItem = ({ repository }) => {
  const {
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
  } = repository;

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: ownerAvatarUrl }} style={styles.avatar} />
        </View>
        <View style={styles.contentContainer}>
          <Text
            style={styles.nameText}
            fontWeight="bold"
            fontSize="subheading"
            numberOfLines={1}
          >
            {fullName}
          </Text>
          <Text style={styles.descriptionText} color="textSecondary">
            {description}
          </Text>
          {language ? (
            <View style={styles.languageContainer}>
              <Text style={styles.languageText}>{language}</Text>
            </View>
          ) : null}
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <CountItem count={stargazersCount} label="Stars" />
        <CountItem count={forksCount} label="Forks" />
        <CountItem count={reviewCount} label="Reviews" />
        <CountItem count={ratingAverage} label="Rating" />
      </View>
    </View>
  );
};

export default RepositoryItem;