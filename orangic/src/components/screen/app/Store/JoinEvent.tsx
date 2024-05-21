import { View, Text, StatusBar, TouchableOpacity, FlatList, Modal } from 'react-native'
import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import Fluid_btn from '../../../custom/buttons/Fluid_btn';
import { Colors, screenStyles } from '../../../custom/styles/ScreenStyle';
import { fonts, modals } from '../../../custom/styles/ComponentStyle';
import { ParamList } from '../../../navigation/RootNavigation';
import { NavigationProp, RouteProp, useIsFocused, useNavigation } from '@react-navigation/native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import Icons, { IconName } from '../../../../assets/icons/Icons';
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector } from 'react-redux';
import { selectRestaurantID } from '../../../../helpers/state/AppTab/storeSlice';
import AxiosInstance from '../../../../helpers/AxiosInstance';
import JoinEventEventInforCart from '../../../custom/cards/JoinEventEventInforCart';
import JoinEventFoodCart from '../../../custom/cards/JoinEventFoodCart';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, {
    BottomSheetFlatList,
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetScrollView
} from '@gorhom/bottom-sheet';
import { showMessage } from 'react-native-flash-message';

type EventsParti = {
    Id: string,
    Title: string
}

type EventDetail = {
    Id: string,
    Title: string,
    Content: string,
    Start: string,
    End: string,
    CouponID: string,
    CouponCode: string,
    Discount: number,
    Type: string,
    Amount: number
}

type Food = {
    Id: string,
    Name: string,
    Price: number,
    Image: string,
    InCouponItems: boolean
}

enum EventStatusEnum {
    Participated = 'Participated',
    Participating = 'Participating',
    NotParticipated = 'NotParticipated'
}

type EventStatus = EventStatusEnum;

type DropdowData = {
    label: string,
    value: string
}

type InforState = {
    EventsParticipated: EventsParti[],
    EventsParticipating: EventsParti[],
    EventsNotParticipated: EventsParti[],
    eventTransformedDropdowData: DropdowData[],

    foodList: Food[],

};

const initialState: InforState = {
    EventsParticipated: [],
    EventsParticipating: [],
    EventsNotParticipated: [],
    eventTransformedDropdowData: [],

    foodList: [],

};

type InforAction = {
    type: keyof InforState;
    payload: InforState[keyof InforState];
};

const handleReducer = (state: InforState, action: InforAction) => {
    return {
        ...state,
        [action.type]: action.payload,
    };
};

type Prop = {
    route: RouteProp<ParamList, 'JoinEvent'>;
};


const JoinEvent = (props: Prop) => {

    const naviagtion = useNavigation<NavigationProp<ParamList, 'JoinEvent'>>();
    const [infor, setInfor] = useReducer(handleReducer, initialState);
    const resID = useSelector(selectRestaurantID);
    // const [infor, setInfor] = useState<InforState>(initialState);
    const foucsed = useIsFocused();
    const [reloadEvents, setReloadEvents] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    const [eventStatus, setEventStatus] = useState<EventStatus>();
    const [eventDetail, setEventDetail] = useState<EventDetail>();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const snapPoints = useMemo(() => ['50%', '65%'], []);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const transformedDropdowShowData = useCallback((data: EventsParti[]) => {

        const tempData = data?.map((item, index) => ({
            label: item.Title,
            value: item.Id
        }));

        setInfor({ type: 'eventTransformedDropdowData', payload: tempData });
    }, []);

    const filterEventStatus = (key: EventStatus) => {
        bottomSheetModalRef.current?.collapse();
        setEventDetail(undefined);
        setInfor({ type: "foodList", payload: [] });


        switch (key) {
            case EventStatusEnum.Participated:
                console.log('Đã tham gia sự kiện');
                transformedDropdowShowData(infor.EventsParticipated);
                setEventStatus(key);
                // setReloadEvents(true);
                break;
            case EventStatusEnum.Participating:
                console.log('Đang tham gia sự kiện');
                transformedDropdowShowData(infor.EventsParticipating);
                setEventStatus(key);
                // setReloadEvents(true);
                break;
            case EventStatusEnum.NotParticipated:
                console.log('Chưa tham gia sự kiện');
                transformedDropdowShowData(infor.EventsNotParticipated);
                setEventStatus(key);
                // setReloadEvents(true);
                break;
            default:
                console.log('Trạng thái không hợp lệ');
                break;
        }
    }

    const getEvents = async () => {
        try {
            // console.log(resID);
            const response = await AxiosInstance().get(
                'get-all-events-off-restaurrant.php',
                { params: { id: resID } }
            );

            console.log("res events", response);
            // console.log("res events", response.data);
            const resData: InforState = response.data;
            if (resData) {
                setInfor({ type: 'EventsParticipated', payload: resData.EventsParticipated });
                setInfor({ type: 'EventsParticipating', payload: resData.EventsParticipating });
                setInfor({ type: 'EventsNotParticipated', payload: resData.EventsNotParticipated });
            }
            console.log("infor.eventTransformedDropdowData", infor.eventTransformedDropdowData);

        } catch (error) {
            console.log('has restaurants screen get detail error: ', error);
        }
    };

    useEffect(() => {
        // if (reloadEvents) {
            getEvents();
            setReloadEvents(false); // Sau khi gọi lại getEvents, đặt lại trạng thái của reloadEvents
        // }
    }, [foucsed]);

    const getEventDetail = async (eventID: string) => {
        try {
            // console.log(resID);
            const response = await AxiosInstance().get(
                'get-event-detail.php',
                { params: { id: eventID } }
            );

            console.log("res events", response);
            // console.log("res events", response.data);
            const resData: EventDetail = response.data;
            if (resData) {
                setEventDetail(resData);
            }


        } catch (error) {
            console.log('restaurants screen getEventDetail error: ', error);
        }
    };

    const getAllFoodJoinEvent = async (eventID: string, resID: string) => {
        try {
            // console.log(resID);
            // setInfor({ type: "foodList", payload: [] });
console.log(resID,eventID);
            const response = await AxiosInstance().get(
                'get-all-foods-off-restaurant-join-event.php',
                { params: { eventId: eventID, resId: resID } }
            );
            console.log("infor.foodList", infor.foodList);

            console.log("res events a", response);
            // console.log("res events", response.data);
            const resData: Food[] = response.data;
            if (resData) {
                setInfor({ type: "foodList", payload: resData });
                console.log("resData", resData);
            } 


        } catch (error) {
            console.log('restaurants screen getEventDetail error: ', error);
        }
    };

    const handleChooseEvent = (eventID: string) => {
        // bottomSheetModalRef.current?.collapse();
        getEventDetail(eventID);
        getAllFoodJoinEvent(eventID, resID);
        handlePresentModalPress();
    }

    // thay đổi trường InCouponItems của food trong foodList
    const handleJoinFood = (foodID: string, bool: boolean) => {
        const tempFoodList = infor.foodList.map((item) => {
            if (item.Id === foodID) {
                return { ...item, InCouponItems: bool };
            }
            return item;
        });

        setInfor({ type: "foodList", payload: tempFoodList });
    }

    const updateFoodJoinEvent = async () => {
        try {

            console.log(infor.foodList);
            const response = await AxiosInstance().post(
                'update-food-join-event.php',
                { eventId: eventDetail?.CouponID, couponId: eventDetail?.CouponID, resId: resID, foodList: infor.foodList }
            );

            console.log("res events", response);
            // console.log("res events", response.data);     
            response.status ?
                showMessage({
                    message: 'Cập nhật thành công',
                    type: 'success',
                    icon: 'success',
                }) :
                showMessage({
                    message: 'Cập nhật thất bại',
                    type: 'danger',
                    icon: 'danger',
                })

        } catch (error) {
            showMessage({
                message: 'Cập nhật thất bại',
                type: 'danger',
                icon: 'danger',
            })
            console.log('restaurants screen getEventDetail error: ', error);
        }
    }

    const handleUpdateFoodJoinEvent = () => {
        if (!eventDetail) {
            showMessage({
                message: 'Chưa chọn sự kiện',
                type: 'danger',
                icon: 'danger',
            });
            return;
        }

        if (eventStatus === EventStatusEnum.Participated) {
            showMessage({
                message: 'Sự kiện này đã qua rồi',
                type: 'warning',
                icon: 'warning',
            });
            return;
        }
        // hỏi và bấm nút xác nhận để cập nhật
        setModalVisible(true);
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={[screenStyles.container, { alignContent: 'center' }]}>
                {/* modal hỏi xác nhận cập nhật */}
                {modalVisible && (
                    <View style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{
                                    backgroundColor: Colors.white,
                                    width: '80%',
                                    padding: 20,
                                    borderRadius: 10,
                                    elevation: 5
                                }}>
                                    <Text style={[fonts.captionBold, { textAlign: 'center' }]}>Xác nhận cập nhật</Text>
                                    <Text style={[fonts.text, { marginTop: 10, textAlign: 'center' }]}>Bạn có chắc chắn muốn cập nhật không?</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                                        <TouchableOpacity
                                            style={{
                                                backgroundColor: Colors.white,
                                                borderColor: Colors.ember,
                                                borderWidth: 1,
                                                padding: 10,
                                                borderRadius: 10
                                            }}
                                            onPress={() => {
                                                updateFoodJoinEvent();
                                                setModalVisible(!modalVisible);
                                            }}>
                                            <Text style={[fonts.text, { color: Colors.ember }]}>Xác nhận</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{
                                                backgroundColor: Colors.ember,
                                                padding: 10,
                                                borderRadius: 10
                                            }}
                                            onPress={() => {
                                                setModalVisible(!modalVisible);
                                            }}>
                                            <Text style={[fonts.text, { color: Colors.white }]}>Hủy</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                )}


                <StatusBar backgroundColor={Colors.orange} barStyle="dark-content" />

                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 20,
                        alignItems: 'center',
                    }}>
                    <TouchableOpacity
                        onPress={() => {
                            naviagtion.navigate('Store');
                        }}
                        style={{
                            width: 45,
                            height: 45,
                            borderRadius: 10,
                            backgroundColor: Colors.white,
                            elevation: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Icons name={IconName.back} size={18} color={Colors.orange} />
                    </TouchableOpacity>

                    <Text style={[fonts.captionBold]}>Tham gia sự kiện</Text>

                    <View style={{ width: 45 }} />
                </View>


                <View style={[screenStyles.parent_container, { paddingBottom: 30 }]}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'column', gap: 10 }}>
                        <Dropdown
                            data={[
                                { label: 'Đã tham gia', value: EventStatusEnum.Participated },
                                { label: 'Đang tham gia', value: EventStatusEnum.Participating },
                                { label: 'Chưa tham gia', value: EventStatusEnum.NotParticipated },
                            ]}
                            maxHeight={200}
                            placeholder="Trạng thái"
                            labelField={'label'}
                            valueField={'value'}
                            value={eventStatus}
                            onChange={text => { filterEventStatus(text.value as EventStatus) }}
                            style={{
                                height: 50,
                                borderWidth: 1,
                                borderColor: Colors.slate,
                                marginTop: 5,
                                padding: 10,
                                borderRadius: 10,
                                // marginHorizontal: 20,
                                // flex: 1,
                                backgroundColor: Colors.white,
                            }}
                        />

                        {
                            infor?.eventTransformedDropdowData ?
                                <Dropdown
                                    data={infor.eventTransformedDropdowData}
                                    maxHeight={200}
                                    placeholder="Chọn sự kiện"
                                    labelField={'label'}
                                    valueField={'value'}
                                    // value={infor?.eventTransformedDropdowData[0]?.value ?  infor?.eventTransformedDropdowData[0]?.value : ""}
                                    onChange={text => { handleChooseEvent(text.value as string) }}
                                    search
                                    searchPlaceholder="Tìm..."
                                    style={{
                                        height: 50,
                                        borderWidth: 1,
                                        borderColor: Colors.slate,
                                        marginTop: 5,
                                        padding: 10,
                                        borderRadius: 10,
                                        // marginHorizontal: 20,
                                        // flex: 1,
                                        backgroundColor: Colors.white,
                                    }}
                                />
                                :
                                <View
                                    style={{
                                        height: 50,
                                        borderWidth: 1,
                                        borderColor: Colors.slate,
                                        marginTop: 5,
                                        padding: 10,
                                        borderRadius: 10,
                                        backgroundColor: Colors.white,
                                        justifyContent: "center",
                                        display: "flex"
                                    }}>
                                    <Text
                                        style={{ lineHeight: 20, fontSize: 16 }}>
                                        Không có sự kiện
                                    </Text>
                                </View>

                        }

                    </View>

                    <View
                        style={{ flex: 1 }}>

                        <Text
                            style={[fonts.captionBold, { marginVertical: 10 }]}>
                            Danh sách món ăn
                        </Text>

                        {
                            infor?.foodList?.length > 0 ?
                                <FlatList
                                    data={infor.foodList}
                                    numColumns={2}
                                    // style={{ backgroundColor: "#000" }}
                                    columnWrapperStyle={{ justifyContent: 'space-between', paddingBottom: 20 }}
                                    contentContainerStyle={{ paddingHorizontal: 20 }}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => {
                                        return (
                                            <JoinEventFoodCart
                                                allowsChangingStatus={eventStatus !== EventStatusEnum.Participated}
                                                isJoin={item.InCouponItems}
                                                image={item.Image}
                                                name={item.Name}
                                                price={item.Price}
                                                onIsJoinChange={(bool) => {
                                                    handleJoinFood(item.Id, bool);
                                                }}
                                            />
                                        )
                                    }}
                                />
                                :
                                <View
                                    style={{
                                        // height: 50,
                                        borderWidth: 1,
                                        borderColor: Colors.slate,
                                        marginTop: 5,
                                        padding: 10,
                                        borderRadius: 10,
                                        backgroundColor: Colors.white,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flex: 1
                                    }}>
                                    <Text
                                        style={[fonts.captionBold]}>
                                        Chưa chọn sự kiện
                                    </Text>
                                </View>
                        }
                        {/* <FlatList
                        data={Array(5).fill(0)}
                        numColumns={2}
                        style={{ backgroundColor: "#000" }}
                        columnWrapperStyle={{ justifyContent: 'space-between', paddingBottom: 20 }}
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => {
                            return (
                                <JoinEventFoodCart
                                // isJoin={true}
                                />
                            )
                        }}
                    /> */}

                    </View>


                </View>



                <View style={{ paddingHorizontal: 10 }}>
                    <Fluid_btn
                        title="Lưu"
                        onPress={() => {
                            handleUpdateFoodJoinEvent();
                        }}
                        style={{ marginTop: 5 }}
                    />
                </View>

                <BottomSheetModalProvider>

                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        index={1}
                        // snapPoints={[200, 500]}
                        snapPoints={snapPoints}
                        style={{
                            flex: 1,
                            // elevation: 5,
                            paddingHorizontal: 20,
                            // marginBottom: 100
                        }}
                        backgroundComponent={({ style }) => (
                            <View style={[style, {
                                backgroundColor: 'rgba(230,230,230, 1)',
                                borderTopLeftRadius: 30,
                                borderTopRightRadius: 30,
                                // marginBottom: 100

                            }]} />
                        )}
                    >
                        <Text
                            style={[fonts.captionBold, { marginBottom: 1, textAlign: "center" }]}>
                            Thông tin sự kiện
                        </Text>
                        <BottomSheetScrollView>
                            {
                                eventDetail ?

                                    <JoinEventEventInforCart
                                        style={{ marginTop: 20 }}
                                        title={eventDetail.Title}
                                        content={eventDetail.Content}
                                        discount={eventDetail.Discount}
                                        type={eventDetail.Type}
                                        amount={eventDetail.Amount}
                                        start={eventDetail.Start}
                                        end={eventDetail.End}
                                    />
                                    :
                                    <View
                                        style={{
                                            // height: 50,
                                            borderWidth: 1,
                                            borderColor: Colors.slate,
                                            marginTop: 5,
                                            padding: 10,
                                            borderRadius: 10,
                                            backgroundColor: Colors.white,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            flex: 1,
                                            height: 200
                                        }}>
                                        <Text
                                            style={[fonts.captionBold]}>
                                            Chưa chọn sự kiện
                                        </Text>
                                    </View>
                            }

                        </BottomSheetScrollView>
                    </BottomSheetModal>

                </BottomSheetModalProvider>
            </View>
        </GestureHandlerRootView>
    )
}

export default JoinEvent