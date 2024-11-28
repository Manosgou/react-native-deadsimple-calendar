import React, { memo } from 'react';
import { StyleSheet, View, ViewStyle, TextStyle } from 'react-native';
import { isEqual } from "lodash";
import Animated, { FadeInUp } from 'react-native-reanimated';
import GestureRecognizer from 'react-native-swipe-gestures';
import DayItem from './DayItem';
import WeekItems from './WeekItems';

interface DateContainerProps {
    daysList: string[]
    selectedMonthYear: any
    selectedDate: any
    setSelectedDate: (val: number | null) => void
    setSelectedMonthYear: (val: { year: number; month: number; }) => any
    dayContainerStyle: ViewStyle
    dayStyle: TextStyle
    weekendStyle: TextStyle
    todayStyle: TextStyle
    selectedStyle: TextStyle
    selectedWrapperStyle: ViewStyle
    dayWrapperStyle: ViewStyle
    markedDates: any
    onlyMarked: boolean,
    markerWrapperStyle: ViewStyle
    markerStyle: ViewStyle
    weekStyle: ViewStyle
}

const DateContainer = ({
    daysList,
    selectedMonthYear,
    selectedDate,
    setSelectedDate,
    setSelectedMonthYear,
    dayContainerStyle,
    dayStyle,
    weekendStyle,
    todayStyle,
    selectedStyle,
    selectedWrapperStyle,
    dayWrapperStyle,
    markedDates,
    onlyMarked,
    markerWrapperStyle,
    markerStyle,
    weekStyle,

}: DateContainerProps) => {

    const TodaysDate = new Date().setHours(0, 0, 0, 0)
    const SelectDate = new Date(selectedMonthYear.year, selectedMonthYear.month, selectedDate).setHours(0, 0, 0, 0)
    const empty_days = new Date(selectedMonthYear.year, selectedMonthYear.month, 1).getDay()
    const days_in_month = new Date(selectedMonthYear.year, selectedMonthYear.month + 1, 0).getDate()

    const weeks_arr = []

    let days_arr = []
    let week = 0
    let day = 1

    for (; week < 6 && day <= days_in_month; week++) {

        days_arr = []

        if (!week)  // first week
            days_arr.push(<View key={0} style={{ flex: empty_days }} />)

        const sunday = 7 * (week) - empty_days + 1
        const saturday = 7 * (week + 1) - empty_days

        for (; day <= saturday && day <= days_in_month; day++) {

            const currentDate = (new Date(selectedMonthYear.year, selectedMonthYear.month, day)).setHours(0, 0, 0, 0)
            const markedDay = markedDates[`${selectedMonthYear.year}-${String(selectedMonthYear.month).padStart(2, '0')}-${String(day).padStart(2, '0')}`]
            days_arr.push(<DayItem
                isToday={TodaysDate == currentDate}
                markings={markedDay}
                onlyMarked={onlyMarked}
                isSelected={SelectDate == currentDate}
                weekend={day == saturday || day == sunday}
                dayStyle={dayStyle}
                weekendStyle={weekendStyle}
                selectedStyle={selectedStyle}
                selectedWrapperStyle={selectedWrapperStyle}
                todayStyle={todayStyle}
                dayWrapperStyle={dayWrapperStyle}
                setSelectedDate={setSelectedDate}
                markerWrapperStyle={markerWrapperStyle}
                markerStyle={markerStyle}
                day={day}
                key={day}
            />)




        }

        weeks_arr.push(<View key={week} style={[weekStyle, Styles.Week]}>{days_arr}</View>)
    }

    days_arr.push(<View key={day} style={{ flex: week * 7 - day - empty_days + 1 }} />)


    return (
        <GestureRecognizer
            onSwipeLeft={(_) => setSelectedMonthYear((val) => {

                const new_val = {
                    ...val,
                    year: val.year + (val.month == 11 ? 1 : 0),
                    month: (val.month + 1) % 12
                }
                setSelectedDate(null)
                return new_val
            })}
            onSwipeRight={(_) => setSelectedMonthYear((val) => {

                const new_val = {
                    ...val,
                    year: val.year - (val.month ? 0 : 1),
                    month: val.month ? val.month - 1 : 11
                }
                setSelectedDate(null)
                return new_val
            })}
            config={{
                velocityThreshold: 0.3,
                directionalOffsetThreshold: 80
            }}

        >
            <Animated.View entering={FadeInUp} style={{gap:5}}> 

                <WeekItems todaysStyle={todayStyle} daysList={daysList} selectedMonthYear={selectedMonthYear} />
                {weeks_arr}

            </Animated.View >
        </GestureRecognizer>
    )

}

export default memo(DateContainer, isEqual)

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