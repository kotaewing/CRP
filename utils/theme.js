import { extendTheme } from "native-base";
import { StyleSheet } from "react-native";

export const theme = extendTheme({
  colors: {},
  fontConfig: {
    fonts: {
      heading: "Roboto",
    },
  },
});

export const classes = StyleSheet.create({
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
    shadowColor: "rgba(138, 149, 158, 0.2)",
    shadowOffset: {
      width: 10,
      height: -2,
    },
    shadowRadius: 10,
    shadowOpacity: 1,
    borderRadius: 15,
    borderColor: "transparent",
    flexDirection: "row",
    backgroundColor: "#FFF",
    marginTop: 20,
    height: 85,
    bottom: 25,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
});
