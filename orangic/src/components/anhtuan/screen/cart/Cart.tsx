import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useReducer, useState} from 'react';
import {screens} from '../../custom/style/scn';
import CartBar from '../../custom/actionbars/CartBar';
import CartItems from '../../custom/lists/CartItems';
import Fluid_btn from '../../custom/buttons/Fluid_btn';
import {Colors, fonts} from '../../custom/style/cpt';
import {showMessage, hideMessage} from 'react-native-flash-message';

{
  /** Start of declaring order's item data */
}

type Data = {
  id: string;
  name: string;
  intro: string;
  price: number;
  discount: number;
  quantity: number;
  value: boolean;
};

{
  /** End of declaring order's item data */
}

{
  /** Declare reducer state and action */
}

type CartState = {
  data: Data[];
  address: string;
};

type CartAction = {
  type: keyof CartState;
  payload: any;
};

function handleCartItem(state: CartState, payload: CartAction) {
  return {
    ...state,
    [payload.type]: payload.payload,
  };
}

{
  /** Declare reducer state and action */
}

const Cart = () => {
  const [check, setCheck] = useState(false);
  const [locate, setLocate] = useState('');
  const [data, setData] = useReducer(handleCartItem, {
    data: [
      {
        id: '1',
        name: 'Bún chả',
        intro: 'Bún chả Hà Nội ngon nhất thế giới ăn 1 lần nhớ suốt đời',
        price: 30,
        discount: 10,
        quantity: 2,
        value: false,
      },
      {
        id: '2',
        name: 'Bún đậu',
        intro: 'Bún đậu mắm tôm',
        price: 40,
        discount: 20,
        quantity: 1,
        value: false,
      },
      {
        id: '3',
        name: 'Bún bò',
        intro: 'Bún bò Huế ngon nhất thế giới ăn 1 lần nhớ suốt đời',
        price: 50,
        discount: 30,
        quantity: 3,
        value: false,
      },
      {
        id: '4',
        name: 'Bún ốc',
        intro: 'Bún ốc ngon nhất thế giới ăn 1 lần nhớ suốt đời',
        price: 60,
        discount: 40,
        quantity: 4,
        value: false,
      },
      {
        id: '5',
        name: 'Bún riêu',
        intro: 'Bún riêu ngon nhất thế giới ăn 1 lần nhớ suốt đời',
        price: 70,
        discount: 50,
        quantity: 5,
        value: false,
      },
      {
        id: '6',
        name: 'Bún mắm',
        intro: 'Bún mắm ngon nhất thế giới ăn 1 lần nhớ suốt đời',
        price: 80,
        discount: 60,
        quantity: 6,
        value: false,
      },
    ],
    address: 'Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam',
  });

  useEffect(() => {
    if (check) {
      const arr = data.data.map((item: Data) => {
        return {...item, value: true};
      });
      setData({type: 'data', payload: arr});
    }
  }, [check]);

  useEffect(() => {
    const allCheck = data.data.every((item: Data) => item.value);
    setCheck(allCheck);
  }, [data]);

  return (
    <View style={screens.parent_Cont}>
      <CartBar
        value={check}
        title="Cart"
        style={{paddingHorizontal: 20}}
        onPress={() => {
          setCheck(!check);
        }}
      />

      <FlatList<Data>
        data={data.data}
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 20, marginTop: 20, marginBottom: 20}}
        renderItem={({item}) => (
            <CartItems
              key={item.id}
              name={item.name}
              price={Math.round(item.price * (1 - item.discount / 100))}
              quantity={item.quantity}
              intro={
                item.intro.length > 50
                  ? item.intro.slice(0, 50) + '...'
                  : item.intro
              }
              value={item.value}
              onPress={() => {
                setData({
                  type: 'data',
                  payload: data.data.map(i => {
                    if (i.id === item.id) i.value = !i.value;
                    return i;
                  }),
                });
              }}
              add={() => {
                setData({
                  type: 'data',
                  payload: data.data.map(i => {
                    if (i.id === item.id) i.quantity++;
                    return i;
                  }),
                });
              }}
              minus={() => {
                setData({
                  type: 'data',
                  payload: data.data.map(i => {
                    if (i.id === item.id) i.quantity--;
                    return i;
                  }),
                });
              }}
            />
        )}
      />

      <View style={{marginTop: 50, paddingHorizontal: 20}}>
        <View style={{marginBottom: 30}}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}>
            <Text style={[fonts.captionBold]}>Địa chỉ: </Text>
            <Text style={[fonts.caption]}>
              {data.address.length > 25
                ? data.address.slice(0, 25) + '...'
                : data.address}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}>
            <Text style={[fonts.captionBold]}>Ngân hàng: </Text>
            <Text style={[fonts.caption]}>MV Bank - 123456789</Text>
          </TouchableOpacity>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 20,
                paddingHorizontal: 10,
              }}>
              <Text style={[fonts.captionBold]}>Tổng vật phẩm: </Text>
              <Text style={[fonts.caption]}>
                {data.data
                  .map(item => {
                    if (item.value) return item.quantity;
                  })
                  .reduce((acc: number, item) => acc + (item || 0), 0)}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 20,
                paddingHorizontal: 10,
              }}>
              <Text style={[fonts.captionBold]}>Tổng tiền: </Text>
              <Text style={[fonts.caption]}>
                {data.data
                  .map(item => {
                    if (item.value)
                      return (
                        Math.round(item.price * (1 - item.discount / 100)) *
                        item.quantity
                      );
                  })
                  .reduce((acc: number, item) => acc + (item || 0), 0) + ' $'}
              </Text>
            </View>
          </View>
        </View>
        <Fluid_btn
          button={{
            btnStyle: {
              marginBottom: 25,
            },
            onPress: () => {},
          }}
          text={{
            text: 'Thanh toán',
          }}
        />
      </View>
    </View>
  );
};

export default Cart;
