import React from "react";
import { Provider } from "react-redux";
import { rootReducer } from "./src/store/rootReducer";
import HomeScreen from "./src/components/HomeScreen";

import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import fetchArtistTracksSaga from "./src/sagas/fetchTracksSaga";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// then run the saga
sagaMiddleware.run(fetchArtistTracksSaga);

export default function App() {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
}
