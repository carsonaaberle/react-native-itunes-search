import React from "react";
import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";
import LottieView from "lottie-react-native";
import LoadingAnimation from "../../assets/animations/loading-circle.json";
import SearchIcon from "../../assets/icons/search-icon.png";

class UILoadingButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { onSearch, isLoading } = this.props;

    return (
      <TouchableOpacity onPress={onSearch}>
        <View style={styles.loadingButton}>
          {isLoading ? (
            <LottieView
              id={"loading-indicator"}
              autoPlay
              loop
              style={styles.iconLoader}
              source={LoadingAnimation}
            />
          ) : (
            <Image
              id={"search-icon"}
              style={styles.iconLoader}
              source={SearchIcon}
            />
          )}
          <Text id={"button-text"} style={styles.buttonText}>
            Show Records
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  iconLoader: {
    width: 20,
    height: 20,
  },
  loadingButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "auto",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderColor: "#4a4a4a",
    backgroundColor: "#CCCCCC",
  },
  buttonText: {
    marginLeft: 8,
  },
});

export default UILoadingButton;
