import { userLogout } from "../../store/features/authReducer";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

const Logout = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(userLogout());
    navigation.navigate('Login');
  },[]);
  return (
    <View>
      <Text>Logout</Text>
    </View>
  )
}

export default Logout;
