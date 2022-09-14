import { extendTheme } from "native-base";
import { StyleSheet } from "react-native";
import { Store } from "../src/redux/store";

const state = Store.getState();

export const textColor = state.app.textColor;
export const bgColor = `hsla(${state.app.mainHue}, ${state.app.mainSaturation}%, ${state.app.mainLightness}%, 1)`;
export const secondaryColor = `hsla(${state.app.secondaryHue}, ${state.app.secondarySaturation}%, ${state.app.secondaryLightness}%, 1)`;
export const disabledColor = `hsla(${state.app.mainHue}, ${state.app.mainSaturation}%, ${state.app.mainLightness}%, 1)`;

export const theme = extendTheme({
  colors: {},
  fontConfig: {
    fonts: {
      heading: "Roboto",
    },
  },
});

export const classes = StyleSheet.create({
  background: {
    backgroundColor: `hsla(${state.app.mainHue}, ${state.app.mainSaturation}%, ${state.app.mainLightness}%, 1)`,
    flex: 1,
    justifyContent: 'center',
    paddingTop: 50,
  },
  card: {
    shadowColor: "rgba(138, 149, 158, 0.2)",
    shadowOffset: {
      width: -3,
      height: 6,
    },
    shadowRadius: 3,
    borderRadius: 15,
    borderColor: "transparent",
  },

  bodyText: {
    fontFamily: "Rubik_400Regular",
  },

  bottomNavigation: {
    borderColor: "transparent",
    flexDirection: "row",
    backgroundColor: `hsla(${state.app.mainHue}, ${state.app.mainSaturation}%, ${state.app.mainLightness}%, 1)`,
    marginTop: 20,
    height: 125,
    bottom: 0,
    borderRadius: 15,
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 0,
    padding: 0
  },

  inner: {
    backgroundColor: '#DEE9F7',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#E2ECFD',
    borderWidth: 1,

  },
  pressedInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dailyCheckButtonContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  headerText: {
    alignSelf: 'center',
    fontSize: 28,
    color: textColor,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 22,
    color: textColor,
    fontWeight: "bold",
  }
});