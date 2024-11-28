import { TouchableOpacity, Image } from "react-native"

import Icon from "@react-native-vector-icons/octicons";
import { IconProps } from "@react-native-vector-icons/common";

export interface ArrowProps {
    direction?: string
    onPress: () => void
    arrowColor?: string
}

function Arrow({ direction = "right", onPress, arrowColor }: ArrowProps) {

    return (<TouchableOpacity onPress={onPress} style={{ backgroundColor: 'tranparent' }}>
        <Icon name={`chevron-${direction}`} color={arrowColor} size={20} />
    </TouchableOpacity>)

}

export default Arrow;