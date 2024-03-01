import { StyleSheet } from 'react-native'

export const flexBox = StyleSheet.create({
    rowFlexBox: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        gap: 5,
    },

    rowFlexBoxReverse: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row-reverse",
        justifyContent: "center",
        gap: 5,
    },

    columnFlexBox: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        gap: 5,
    },

    columnFlexBoxReverse: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column-reverse",
        justifyContent: "center",
        gap: 5,
    },

    justifyContentSpaceBetween: {
        justifyContent: "space-between",
    },

    justifyContentSpaceAround: {
        justifyContent: "space-around",
    },

    justifyContentCenter: {
        justifyContent: "center",
    },

    justifyContentFlexStart: {
        justifyContent: "flex-start",
    },

    justifyContentFlexEnd: {
        justifyContent: "flex-end",
    },

    alignItemsCenter: {
        alignItems: "center",
    },

    alignItemsFlexStart: {
        alignItems: "flex-start",
    },

    alignItemsFlexEnd: {
        alignItems: "flex-end",
    },

    alignItemsStretch: {
        alignItems: "stretch",
    },

    alignItemsBaseline: {
        alignItems: "baseline",
    },

    flexWrap: {
        flexWrap: "wrap",
    },

})