import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  TextInput,
  Text,
  SafeAreaView,
  FlatList,
  View,
} from "react-native";
import {
  ARTIST_FETCH_SUCCEEDED,
  SEARCH_ARTISTS_REQUESTED,
} from "../store/itunes/types";
import TrackListRow from "./TrackListRow";
import UILoadingButton from "./ui/UILoadingButton";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artistSearchText: "",
      searchLimit: 500,
    };

    this.onChangeSearchText = this.onChangeSearchText.bind(this);
    this.onSearchForArtist = this.onSearchForArtist.bind(this);
    this.renderError = this.renderError.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  onSearchForArtist() {
    const { artistSearchText, searchLimit } = this.state;
    this.props.dispatch({
      type: SEARCH_ARTISTS_REQUESTED,
      payload: { artistName: artistSearchText, searchLimit },
    });
  }

  onChangeSearchText(artistSearchText) {
    this.props.dispatch({
      type: ARTIST_FETCH_SUCCEEDED,
      artistSearchResults: undefined,
    });
    this.setState({ artistSearchText });
  }

  render() {
    const { artistSearchText } = this.state;
    const { artistSearchLoading } = this.props.itunes;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder={"Search by artist name..."}
            placeholderTextColor="#4A4A4A"
            onChangeText={this.onChangeSearchText}
            value={artistSearchText}
          />
          <UILoadingButton
            isLoading={artistSearchLoading}
            onSearch={this.onSearchForArtist}
          />
        </View>
        {this.renderError()}
        {this.renderList()}
      </SafeAreaView>
    );
  }

  //If an error is returned from the API
  renderError() {
    const { artistSearchError } = this.props.itunes;
    if (!artistSearchError) {
      return;
    }
    return (
      <View style={styles.defaultView}>
        <Text style={styles.errorText}>{artistSearchError.message}</Text>
      </View>
    );
  }

  //Render the list and empty data sets
  renderList() {
    const { artistSearchText } = this.state;
    const { artistSearchResults } = this.props.itunes;
    //No search term
    if (artistSearchText.length === 0) {
      return (
        <View style={styles.defaultView}>
          <Text>Search for an artist by name to begin</Text>
        </View>
      );
    }
    //No results
    else if (artistSearchResults && artistSearchResults.length === 0) {
      return (
        <View style={styles.defaultView}>
          <Text>No results found for {artistSearchText}!</Text>
        </View>
      );
    }
    //Show results
    return (
      <FlatList
        style={styles.trackList}
        data={artistSearchResults || []}
        renderItem={(track) => <TrackListRow track={track} />}
        keyExtractor={(track) => `${track.trackId}`}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    flex: 1,
    marginRight: 8,
  },
  trackList: {
    width: "100%",
    flex: 1,
  },
  defaultView: {
    width: "100%",
    flex: 1,
    padding: 16,
  },
  errorText: {
    color: "red",
  },
});

const mapStateToProps = (state) => {
  const { itunes } = state;
  return { itunes };
};

export default connect(mapStateToProps)(HomeScreen);
