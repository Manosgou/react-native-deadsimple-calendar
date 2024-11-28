import { memo } from "react";
import { isEqual } from "lodash";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { DefaultStyles } from '../Common';


interface DayItemProps {
    isToday: boolean
    isSelected: boolean
    day: any
    dayStyle?: any
    weekendStyle?: any
    todayStyle?: any
    selectedStyle?: any
    selectedWrapperStyle?: any
    weekend: any
    dayWrapperStyle?: any
    setSelectedStyle?: any
    setSelectedDate: (val: number) => void
    markings: []
    onlyMarked:boolean
    markerWrapperStyle?: any
    markerStyle?: any
}

const DayItem = memo(({
    isToday,
    isSelected,
    day,
    dayStyle,
    weekendStyle,
    todayStyle,
    selectedStyle,
    selectedWrapperStyle,
    weekend,
    dayWrapperStyle,
    setSelectedDate,
    markings,
    onlyMarked,
    markerWrapperStyle,
    markerStyle
}: DayItemProps) => {

    return (<Pressable style={[Styles.DayWrapper, dayWrapperStyle]} onPress={() => setSelectedDate(day)}>

        <View style={[Styles.DayTextWrapper, ...isSelected ? [DefaultStyles.SelectedWrapper, selectedWrapperStyle] : [], isToday && { borderColor: todayStyle.color, borderWidth: 2, borderRadius: 10 }]}>

            <Text
                style={[Styles.DayStyle, dayStyle,
                ...weekend ? [Styles.Weekend, weekendStyle] : [],
                ...isToday ? [DefaultStyles.Today, todayStyle] : [],
                ...isSelected ? [DefaultStyles.Selected, selectedStyle] : []
                ]}>{day}</Text>


            {
                markings && <View style={{ backgroundColor: !isSelected ? markings[0].color : dayStyle.color, borderRadius: 20, width: 5, height: 5, alignItems: 'center', justifyContent: 'center' }} />
            }
        </View>

    </Pressable >)
}, isEqual)


export default DayItem;


const Styles = StyleSheet.create({
    DateContainer: {
    },
    Week: {
        width: "100%",
        flexDirection: 'row',
    },
    DayWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: "hidden",
    },
    DayTextWrapper: {
        width: "70%",
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: "center"
    },
    DayStyle: {
        color: 'black',
        fontWeight: 'bold',
    },
    Weekend: {
        color: "darkgray"
    },
});