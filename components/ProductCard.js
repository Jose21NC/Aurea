import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import theme from '../styles/theme';

const CARD_WIDTH = (Dimensions.get('window').width - 12 * 2 - 12) / 2; // paddings

export default function ProductCard({ product }) {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text numberOfLines={2} style={styles.name}>{product.name}</Text>
        <View style={styles.row}> 
          <Text style={styles.price}>${product.price}</Text>
          <TouchableOpacity style={styles.btnAdd}>
            <Text style={styles.btnText}>Ver</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  image: { width: '100%', height: CARD_WIDTH, resizeMode: 'cover' },
  info: { padding: 10 },
  name: { color: theme.colors.textPrimary, fontWeight: '600', marginBottom: 6 },
  price: { color: theme.colors.primary, fontWeight: '700' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  btnAdd: { backgroundColor: theme.colors.accent, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8 },
  btnText: { color: '#fff', fontWeight: '600' }
});
