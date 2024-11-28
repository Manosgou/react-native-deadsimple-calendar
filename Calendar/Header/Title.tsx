import { TouchableOpacity, Text, TextStyle } from "react-native"


export interface TitleProps {
    titleStyle: TextStyle
    titleTextStyle: {}
    onTitlePress: () => void
    selectedMonthYear: { month: number, year: number }
    monthsList: string[]
    onTitleLongPress: () => void
}

function Title({ titleStyle, titleTextStyle, onTitlePress, selectedMonthYear, monthsList, onTitleLongPress }: TitleProps) {
    return (<TouchableOpacity style={titleStyle} onPress={onTitlePress} onLongPress={onTitleLongPress}>
        <Text style={titleTextStyle}> {`${monthsList[selectedMonthYear.month]} ${selectedMonthYear.year}`}</Text>
    </TouchableOpacity>)
}

export default Title;