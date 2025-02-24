import React, { forwardRef, memo, useEffect, useImperativeHandle, useState } from 'react';
import { StyleSheet, TextStyle, View } from 'react-native';
import Header from './Header';
import DateContainer from './DateContainer';
import { isEqual } from "lodash";
import InlineDateContainer from './InlineDateContainer';
import moment from 'moment';


interface CalendarProps {
    locale: string
    markedDates?: {},
    onlyMarked: boolean,
    inlineStrip?: boolean
    onTitlePress?: () => void
    onMonthYearChange?: (val: any) => void
    onDatePressed?: (val: any) => void
    style?: any
    headerStyle?: any
    titleStyle?: any
    titleTextStyle?: TextStyle
    rightArrowWrapperStyle?: any
    rightArrowStyle?: any
    leftArrowWrapperStyle?: any
    leftArrowStyle?: any
    weekItemsWrapperStyle?: any
    weekItemstyle?: any
    dayContainerStyle?: any
    dayStyle?: any
    todayStyle?: any
    selectedStyle?: any
    weekendStyle?: any
    weekStyle?: any
    dayWrapperStyle?: any
    selectedWrapperStyle?: any
    markerWrapperStyle?: any
    markerStyle?: any

    customTitle?: string,
    CustomRightArrow?: any
    CustomLeftArrow?: any
    CustomHeader?: any
}

const Calendar = forwardRef(({
    locale = 'en',
    markedDates = {},
    onlyMarked,

    inlineStrip = false,

    onTitlePress,
    onMonthYearChange = () => { },
    onDatePressed = () => { },

    style,
    headerStyle,
    titleStyle,
    titleTextStyle,
    rightArrowWrapperStyle,
    rightArrowStyle,
    leftArrowWrapperStyle,
    leftArrowStyle,
    weekItemsWrapperStyle,
    weekItemstyle,
    dayContainerStyle,
    dayStyle,
    todayStyle,
    selectedStyle,
    weekendStyle,
    weekStyle,
    dayWrapperStyle,
    selectedWrapperStyle,
    markerWrapperStyle,
    markerStyle,

    customTitle,
    CustomRightArrow,
    CustomLeftArrow,
    CustomHeader = Header,
}: CalendarProps, ref) => {

    const currentDate = new Date()
    const [selectedMonthYear, setSelectedMonthYear] = useState<{ month: number, year: number }>({ "month": currentDate.getMonth()+1, "year": currentDate.getFullYear() })
    const [selectedDate, setSelectedDate] = useState<number | null>(currentDate.getDate())

    const [daysList, setDaysList] = useState<string[]>(["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]);
    const [monthsList, setMonthsList] = useState<string[]>(['January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December']);

    useImperativeHandle(ref, () => ({
        setDate(date: number, month: number, year: number) {
            setSelectedMonthYear({
                "month": month ?? selectedMonthYear.month,
                "year": year ?? selectedMonthYear.year,
            })

            setSelectedDate(date ?? selectedDate)
        },

        getDate() {
            return {
                "date": selectedDate,
                "month": selectedMonthYear.month,
                "year": selectedMonthYear.year,
            }
        }
    }), [selectedMonthYear, selectedDate])

    useEffect(() => {
        moment.locale(locale)
        setMonthsList(moment.months())
        setDaysList(moment.weekdaysShort().map((day) => day.toLocaleUpperCase(locale)))
    }, [])

    useEffect(() => {
        onDatePressed({
            date: selectedDate,
            month: selectedMonthYear.month,
            year: selectedMonthYear.year,
        })
    }, [selectedDate])

    const Container = inlineStrip ? InlineDateContainer : DateContainer

    return (<View style={[DefaultStyles.Style, style]}>
        <CustomHeader
            {...{
                selectedMonthYear,
                setSelectedMonthYear,
                setSelectedDate,
                onTitlePress,
                customTitle,
                CustomRightArrow,
                CustomLeftArrow,
                rightArrowWrapperStyle,
                rightArrowStyle,
                leftArrowWrapperStyle,
                leftArrowStyle,
                headerStyle,
                titleStyle,
                titleTextStyle,

                monthsList,

            }}
        />

        <Container {...{
            daysList,

            selectedMonthYear,
            selectedDate,
            setSelectedDate,
            setSelectedMonthYear,
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
            markerStyle,
            weekStyle,
        }} />

    </View>);

})

const DefaultStyles = StyleSheet.create({
    Style: {
        width: "100%",
        backgroundColor: 'red',
        paddingBottom: 5,
        marginTop: 0
    },
    dateBox: {
        flex: 1
    },
    dateBoxText: {
        fontWeight: 'bold'
    }
});

export default memo(Calendar, isEqual)
