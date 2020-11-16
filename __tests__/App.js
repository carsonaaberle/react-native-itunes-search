import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import TrackListRow from "../src/components/TrackListRow";
import moment from "moment";
configure({ adapter: new Adapter() });
import UILoadingButton from "../src/components/ui/UILoadingButton";

describe("Testing UILoadingButton render", () => {
  it(`renders a button with a search icon and "Show Records" text`, () => {
    const wrapper = shallow(<UILoadingButton isLoading={false} />);
    expect(wrapper.find({ id: "search-icon" })).toHaveLength(1);
    expect(wrapper.find({ id: "button-text" }).render().text()).toBe(
      "Show Records"
    );
  });

  it(`renders a button with a loading indicator and "Show Records" text`, () => {
    const wrapper = shallow(<UILoadingButton isLoading={true} />);
    expect(wrapper.find({ id: "loading-indicator" })).toHaveLength(1);
    expect(wrapper.find({ id: "button-text" }).render().text()).toBe(
      "Show Records"
    );
  });
});

describe("Testing Track Row render", () => {
  it("renders all required track elements as expected", () => {
    const track = {
      item: {
        artistName: "The Beatles",
        trackName: "Here Comes The Sun",
        trackPrice: 1.29,
        releaseDate: new Date(),
        primaryGenreName: "Rock",
      },
    };
    const wrapper = shallow(<TrackListRow track={track} />);
    expect(wrapper.find({ id: "album-artwork" })).toHaveLength(1);
    expect(wrapper.find({ id: "artist-name" }).render().text()).toBe(
      track.item.artistName
    );
    expect(wrapper.find({ id: "track-name" }).render().text()).toBe(
      track.item.trackName
    );
    expect(wrapper.find({ id: "track-price" }).render().text()).toBe(
      `$${track.item.trackPrice}`
    );
    expect(wrapper.find({ id: "release-date" }).render().text()).toBe(
      `released ${moment(track.item.releaseDate).format("MM/D/YYYY")}`
    );
    expect(wrapper.find({ id: "primary-genre-name" }).render().text()).toBe(
      track.item.primaryGenreName
    );
  });
});
