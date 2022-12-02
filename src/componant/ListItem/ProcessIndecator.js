import {  ActivityIndicator, View } from 'react-native';

const ProcessIndecator = ({indicator}) => {
  return (
    <View style={{
      position:"absolute",
      width:"100%",
      height:"100%",
      alignItems:"center",
      justifyContent:"center",
      zIndex:999,
      display:indicator ? "flex" : "none",
    }}>
      <ActivityIndicator size="large" />
    </View>
  )
}

export default ProcessIndecator;