import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react';

const { width } = Dimensions.get('screen');
const DetailsPageSkelton = () => {
  return (
    <View>
      <View style={{ paddingHorizontal: 50, }}>
        <View style={styles.banner} />
        <View style={styles.singleLine} />
        <View style={styles.singleLine} />
        <View style={styles.singleLine} />

        <View style={{ flexDirection: "row", marginTop: 20, }}>
          <View style={styles.line2}></View>
          <View style={{ flex: 0.1 }}></View>
          <View style={styles.line3}></View>
        </View>
      </View>


      <View style={{ flexDirection: "row", paddingHorizontal: 15, marginTop: 40, }}>
        <View style={styles.amm} />
        <View style={styles.ammSpace} />
        <View style={styles.amm} />
      </View>

      <View style={{ paddingHorizontal: 15, marginTop: 40, }}>
        <View style={styles.createBy} />
        <View style={styles.line5} />
        <View style={styles.line5} />
        <View style={styles.line5} />
        <View style={styles.line5} />
        <View style={styles.line5} />
        <View style={styles.line5} />
        <View style={styles.line5} />
        <View style={styles.line5} />
      </View>
    </View>
  )
}

export default DetailsPageSkelton;

const styles = StyleSheet.create({
  circle: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  singleLine: {
    height: 10,
    width: width - 100,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 10,
    marginBottom: 10,
  },
  createBy: {
    height: 10,
    width: width - 200,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 10,
    marginBottom: 10,
    marginBottom: 20,
  },
  line5: {
    height: 10,
    width: width - 30,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 10,
    marginBottom: 10,
  },
  ammSpace: {
    width: 20,
  },
  amm: {
    height: 60,
    flex: 0.8,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 10,
    marginBottom: 10,
  },
  line2: {
    height: 30,
    flex: 0.8,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 10,
    marginBottom: 10,
  },

  line3: {
    flex: 0.1,
    height: 30,
    width: width - 100,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 10,
    marginBottom: 10,
  },
  banner: {
    height: 140,
    width: width - 100,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 10,
    marginBottom: 20,
  },
  category: {
    flexDirection: "row",
    paddingTop: 40,
    paddingBottom: 20,
  },
  categoryItem: {
    height: 30,
    width: 90,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 20,
    marginRight: 10,
  },
  banner2: {
    height: 110,
    width: width - 60,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 10,
  }
})