import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useReducer, useState } from 'react'
import { ViewStyle } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { selectUserID } from '../../../helpers/state/Global/globalSlice';
import AxiosInstance from '../../../helpers/AxiosInstance';
import { useIsFocused } from '@react-navigation/native';
import CouponUserCart from './CouponUserCart';


type Data = {
    Id: string;
    Status?: string;
    CouponID?: string;
    Code?: string;
    Discount?: number;
    Start?: Date;
    End?: Date;
    Title?: string;
    Content?: string;
    EventID?: string;
    Type?: string;
}

type CouponUserListState = {
    data: Data[];
};

type CouponUserListAction = {
    type: keyof CouponUserListState;
    payload: any;
};

function handleCouponUserListItem(state: CouponUserListState, payload: CouponUserListAction) {
    return {
        ...state,
        [payload.type]: payload.payload,
    };
}

type Prop = {
    style?: ViewStyle | ViewStyle[];
    itemsStyle?: ViewStyle | ViewStyle[];
    showsVerticalScrollIndicator?: boolean;
    scrollEnabled?: boolean;
    selectedItem?: Data;
    selectedItemStyle?: ViewStyle | ViewStyle[];
    onItemPress?: (item: Data) => void;
}

const CouponUserList = (props: Prop) => {
    const { style, itemsStyle, showsVerticalScrollIndicator, scrollEnabled, selectedItem,selectedItemStyle, onItemPress} = props;
    const userId = useSelector(selectUserID);

    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState(false);
    const isFocused = useIsFocused();

    const [data, setData] = useReducer(handleCouponUserListItem, {
        data: [],
    });

    const getAllCoupons = async () => {
        const response = await AxiosInstance().post('/get-all-coupons-of-user.php', {
            userId: userId,
        });
        if (response.status) {
            setData({ type: 'data', payload: response.data });
        }
    }

    useEffect(() => {
        if (isFocused) {
            getAllCoupons();
        }
    }, [isFocused]);

    const handleRefresh = () => {
        setRefresh(true);
        getAllCoupons();
        setRefresh(false);
    }

    const renderItem = ({ item }: { item: Data }) => {
        return (
            <CouponUserCart
                style={{ ...itemsStyle, ...(selectedItem?.Id === item?.Id ? selectedItemStyle : {}) }}
                code={item.Code}
                discount={item.Discount}
                startDate={item.Start?.toString()}
                endDate={item.End?.toString()}
                onPress={() => {
                    if (props.onItemPress) {
                        props.onItemPress(item);
                    }
                }}
            />
        )
    }

    return (

        data.data.length === 0 ?
            <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 20 }}>Không có mã giảm giá nào</Text>
            : <FlatList
                data={data.data}
                renderItem={renderItem}
                keyExtractor={item => item.Id}
                style={style}
                showsVerticalScrollIndicator={showsVerticalScrollIndicator}
                scrollEnabled={scrollEnabled}
                refreshing={refresh}
                onRefresh={handleRefresh}
                ItemSeparatorComponent={() => {
                    return <View style={{ height: 10, backgroundColor: "#66666630" }} />;
                }}
            />
    )
}

export default CouponUserList