import { isEqual } from "lodash";
import { memo } from "react"
import { DefaultStyles, marker_width } from '../Common';
import { View, Text, Pressable, ViewStyle, TextStyle, StyleSheet } from "react-native"


interface InlineDayItemProps {
    noMarkers?: boolean
    isToday: boolean
    isSelected: boolean
    day: any
    dayName: string
    dayStyle: TextStyle,
    weekendStyle?: any
    todayStyle: TextStyle
    selectedStyle?: any
    selectedWrapperStyle: any
    isWeekend: boolean
    isWeekendStyle?: any
    dayWrapperStyle: ViewStyle,
    markerWrapperStyle?: any
    markerStyle: ViewStyle
    setSelectedDate: (val: any) => void
    markings: any
}

const InlineDayItem = memo((
    { noMarkers = false, isToday, isSelected, day, dayName, dayStyle, weekendStyle, todayStyle, selectedStyle, selectedWrapperStyle, isWeekend, dayWrapperStyle, setSelectedDate, markings, markerWrapperStyle: any
        , markerStyle }: InlineDayItemProps) => {

    return (<Pressable style={[Styles.DayWrapper,
    isSelected && selectedWrapperStyle, isToday && { borderColor: todayStyle.color, borderWidth: 2, borderRadius: 10 }]} onPress={() => setSelectedDate(day)}>
        <Text style={{ marginVertical: 1, color: isToday && !isSelected ? todayStyle.color : dayStyle.color, fontWeight: "normal", fontSize: 10 }}>{dayName}</Text>

        <View style={[Styles.DayTextWrapper]}>
            <Text
                style={[Styles.DayStyle, dayStyle,
                ...isToday && !isSelected ? [DefaultStyles.Today, todayStyle] : [],
                ]}>{day}</Text>
            {

                (!noMarkers && markings) && <View style={{ backgroundColor: !isSelected ? markings[0].color : dayStyle.color, borderRadius: 20, width: 5, height: 5 }} />
            }

        </View>

    </Pressable >)
}, isEqual)

const Styles = StyleSheet.create({
    DateContainer: {
    },
    DayWrapper: {
        alignItems: "center",
        justifyContent: 'center',
        width: 52,
        height: 52
    },
    DayTextWrapper: {
        height: 32,
        alignItems: "center",
    },
    DayStyle: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: -5
    },
    Weekend: {
    }
});


export default InlineDayItem;