import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  Linking,
  TouchableOpacity,
  View,
} from "react-native";
import moment from "moment";

class TrackListRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.openTrackUrl = this.openTrackUrl.bind(this);
  }

  openTrackUrl() {
    const { track } = this.props;

    Linking.openURL(track.item.trackViewUrl).catch((err) => {
      console.error("Failed opening page because: ", err);
      alert("Failed to open page");
    });
  }
  render() {
    const { track } = this.props;

    return (
      <TouchableOpacity onPress={this.openTrackUrl}>
        <View style={styles.trackRow}>
          <Image
            id={"album-artwork"}
            source={{ uri: track.item.artworkUrl60 }}
            style={styles.albumArtwork}
          />
          <View style={styles.infoContainer}>
            <Text id={"artist-name"} style={styles.artistName}>
              {track.item.artistName}
            </Text>
            <Text id={"track-name"} style={styles.trackName}>
              {track.item.trackName}
            </Text>
            <Text id={"track-price"} style={styles.trackPrice}>
              ${track.item.trackPrice}
            </Text>
            <Text id={"release-date"} style={styles.releaseDate}>
              released {moment(track.item.releaseDate).format("MM/D/YYYY")}
            </Text>
            <Text id={"primary-genre-name"} style={styles.trackGenre}>
              {track.item.primaryGenreName}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  trackRow: {
    display: "flex",
    flexDirection: "row",
    width: "auto",
    padding: 8,
    margin: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#EEE",
    backgroundColor: "#FCFCFC",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  albumArtwork: {
    width: 48,
    height: 48,
    borderRadius: 4,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    marginHorizontal: 8,
  },
  artistName: {
    fontWeight: "500",
  },
  trackName: {
    color: "#4a4a4a",
  },
  trackPrice: {
    color: "green",
    fontWeight: "600",
  },
  releaseDate: {
    color: "#4a4a4a",
  },
  trackGenre: {
    color: "#4a4a4a",
    fontSize: 11,
    marginTop: 2,
    fontWeight: "600",
  },
});

export default TrackListRow;
