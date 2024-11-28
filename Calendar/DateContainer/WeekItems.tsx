import React, { memo } from 'react';
import { StyleSheet,Text, TextStyle, View, ViewStyle } from "react-native";
import { isEqual } from "lodash";


interface WeekItemsProps {
    daysList: string[],
    selectedMonthYear:{},
    todaysStyle:any,
    weekdayWrapperStyle?: ViewStyle
    weekDayStyle?: TextStyle
}

const WeekItems = ({
    daysList,
    selectedMonthYear,
    todaysStyle,
    weekdayWrapperStyle,
    weekDayStyle
}: WeekItemsProps) => {
    const date =  new Date()
    const today = new Date(selectedMonthYear.year, selectedMonthYear.month, date.getDate()).setHours(0, 0, 0, 0)

    return (<View style={[DefaultStyles.WeekdaysWrapper, weekdayWrapperStyle]}>
        {
            daysList.map((day, index) => {
                return (
                    <Text key={index} style={[DefaultStyles.Weekday, weekDayStyle,(index ===date.getDay() && today==date.setHours(0, 0, 0, 0)) && {color:todaysStyle.color}]}>{day}</Text>
                )
            })
        }
    </View>)
}

export default memo(WeekItems, isEqual)


const DefaultStyles = StyleSheet.create({
    WeekdaysWrapper: {
        flexDirection: 'row',
        paddingVertical: 10,
        marginBottom: 5,
        backgroundColor: 'transparent'
    },
    Weekday: {
        flex: 1,
        textAlign: 'center',
        color: 'gray'
        // borderWidth: 2, borderColor: "black"
    }
});