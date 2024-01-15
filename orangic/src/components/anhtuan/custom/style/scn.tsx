import { StyleSheet} from 'react-native'

export const screens = StyleSheet.create({
    parent_Cont:{
        flex: 1,
        backgroundColor: 'white',
    },
    main_Cont: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
    },
    noRes_Cont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -200
    }
})