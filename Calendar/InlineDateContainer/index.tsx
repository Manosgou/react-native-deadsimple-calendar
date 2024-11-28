import React, { memo, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, ViewStyle } from 'react-native';
import { isEqual } from "lodash";
import InlineDayItem from './InlineDayItem';


interface InlineDateContainerProps {
    daysList: string[]
    selectedMonthYear: any
    selectedDate: any
    setSelectedDate: any
    dayContainerStyle: ViewStyle
    dayStyle: any
    weekendStyle: any
    todayStyle: any
    titleTextStyle: any
    selectedStyle: any
    selectedWrapperStyle: any
    dayWrapperStyle: any
    markedDates: any
    onlyMarked: boolean,
    markerWrapperStyle: any
    markerStyle: any

}


const InlineDateContainer = ({
    daysList,
    selectedMonthYear,
    selectedDate,
    setSelectedDate,
    dayContainerStyle,
    dayStyle,
    weekendStyle,
    todayStyle,
    titleTextStyle,
    selectedStyle,
    selectedWrapperStyle,
    dayWrapperStyle,
    markedDates,
    onlyMarked,
    markerWrapperStyle,
    markerStyle
}: InlineDateContainerProps) => {
    const [scrollWidth, setScrollWidth] = useState(0);
    const containerRef = useRef<ScrollView>()
    const todays_date = new Date()
    const TodaysDate = todays_date.setHours(0, 0, 0, 0)
    const SelectDate = new Date(selectedMonthYear.year, selectedMonthYear.month, selectedDate).setHours(0, 0, 0, 0)
    const days_in_month = new Date(selectedMonthYear.year, selectedMonthYear.month + 1, 0).getDate()

    useEffect(() => {
        if (containerRef) {
            containerRef?.current?.scrollTo({ x: ((selectedDate - 4) * scrollWidth / days_in_month), y: 0, animated: true })
        }
    }, [scrollWidth, selectedDate])

    return (<ScrollView style={[Styles.DateContainer, dayContainerStyle]} horizontal={true} ref={containerRef} showsHorizontalScrollIndicator={false}
        onContentSizeChange={(width, height) => {
            setScrollWidth(width)
        }}>

        <View style={{ flexDirection: 'row', gap: 52 / 7 - 3 }}>

            {onlyMarked ?
                [...Array(days_in_month)].map((val, day) => {
                    day += 1
                    const markedDay = markedDates[`${selectedMonthYear.year}-${String(selectedMonthYear.month).padStart(2, '0')}-${String(day).padStart(2, '0')}`]
                    const current_date = new Date(selectedMonthYear.year, selectedMonthYear.month, day)
                    const iterate_date = current_date.setHours(0, 0, 0, 0)
                    const day_number = current_date.getDay()
                    if (markedDay) {
                        return (<InlineDayItem
                            noMarkers={true}
                            isToday={TodaysDate == iterate_date}
                            markings={markedDay}
                            isSelected={SelectDate == iterate_date}
                            dayName={daysList[day_number]}
                            isWeekend={day_number == 0 || day_number == 6}
                            key={day}

                            {...{
                                dayStyle,
                                weekendStyle,
                                selectedStyle,
                                selectedWrapperStyle,
                                todayStyle,
                                titleTextStyle,
                                dayWrapperStyle,
                                setSelectedDate,
                                markerWrapperStyle,
                                markerStyle,
                                day
                            }}
                        />)
                    }

                }) : [...Array(days_in_month)].map((val, day) => {
                    day += 1
                    const markedDay = markedDates[`${selectedMonthYear.year}-${String(selectedMonthYear.month).padStart(2, '0')}-${String(day).padStart(2, '0')}`]
                    const current_date = new Date(selectedMonthYear.year, selectedMonthYear.month, day)
                    const iterate_date = current_date.setHours(0, 0, 0, 0)
                    const day_number = current_date.getDay()
                    return (<InlineDayItem
                        isToday={TodaysDate == iterate_date}
                        markings={markedDay}
                        isSelected={SelectDate == iterate_date}
                        dayName={daysList[day_number]}
                        isWeekend={day_number == 0 || day_number == 6}
                        key={day}

                        {...{
                            dayStyle,
                            weekendStyle,
                            selectedStyle,
                            selectedWrapperStyle,
                            todayStyle,
                            titleTextStyle,
                            dayWrapperStyle,
                            setSelectedDate,
                            markerWrapperStyle,
                            markerStyle,
                            day
                        }}
                    />)

                })}

        </View>
    </ScrollView >)

}

export default memo(InlineDateContainer, isEqual)

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