import React, { memo } from 'react';
import { StyleProp, StyleSheet, TextStyle, View } from 'react-native';
import { isEqual } from "lodash";
import Title, { TitleProps } from './Title';
import Arrow, { ArrowProps } from './Arrow';

interface HeaderProps {
    monthsList: string[]
    onTitlePress: () => void
    setSelectedDate: (val: number | null) => void
    selectedMonthYear: { year: number; month: number; }
    setSelectedMonthYear: (val: { year: number; month: number; }) => any
    headerStyle: TextStyle,
    titleStyle: TextStyle,
    titleTextStyle: TextStyle,
    CustomLeftArrow: React.ElementType<ArrowProps>
    CustomRightArrow: React.ElementType<ArrowProps>
    CustomTitle: React.ElementType<TitleProps>
}


const Header = ({ monthsList,
    onTitlePress,
    setSelectedDate,
    selectedMonthYear,
    setSelectedMonthYear,

    headerStyle,
    titleStyle,
    titleTextStyle,

    CustomLeftArrow = Arrow,
    CustomRightArrow = Arrow,

    CustomTitle = Title

}: HeaderProps) => {

    return (<View style={[DefaultStyles.Header, headerStyle]}>
        <CustomLeftArrow
            arrowColor={titleTextStyle.color}
            direction={"left"}
            onPress={() => {
                setSelectedMonthYear((val) => {

                    const new_val = {
                        ...val,
                        year: val.year - (val.month ? 0 : 1),
                        month: val.month ? val.month - 1 : 11
                    }
                    console.log(val)
                    setSelectedDate(null)
                    return new_val
                })
            }}
        />

        <CustomTitle
            titleStyle={[DefaultStyles.Title, titleStyle]}
            titleTextStyle={[DefaultStyles.TitleText, titleTextStyle]}
            onTitlePress={onTitlePress}
            onTitleLongPress={() => {
                const today = new Date()
                setSelectedDate(today.getDate())
                setSelectedMonthYear({
                    "month": today.getMonth(),
                    "year": today.getFullYear(),
                })
            }}
            selectedMonthYear={selectedMonthYear}
            monthsList={monthsList}
        />

        <CustomRightArrow
            arrowColor={titleTextStyle.color}
            onPress={() => {
                setSelectedMonthYear((val) => {

                    const new_val = {
                        ...val,
                        year: val.year + (val.month == 11 ? 1 : 0),
                        month: (val.month + 1) % 12
                    }
                    setSelectedDate(null)
                    return new_val
                })
            }}
        />
    </View>)

}

export default memo(Header, isEqual)

const DefaultStyles = StyleSheet.create({
    Header: {
        width: "100%",
        backgroundColor: 'transparent',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: -5
    },
    Title: {
        backgroundColor: 'darkgray',
        paddingHorizontal: 0,
        paddingVertical: 2,
        marginVertical: 2,
    },
    TitleText: {
        fontWeight: 'bold',
        color: "white"
    },
});