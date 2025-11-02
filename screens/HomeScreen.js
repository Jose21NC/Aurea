import React from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import ProductCard from '../components/ProductCard';
import theme from '../styles/theme';

const SAMPLE_PRODUCTS = Array.from({ length: 12 }).map((_, i) => ({
  id: String(i + 1),
  name: `Producto ${i + 1}`,
  price: (Math.random() * 80 + 5).toFixed(2),
  image: `https://picsum.photos/seed/product${i + 1}/400/400`
}));

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Aurea</Text>
        <Text style={styles.subtitle}>Descubre lo nuevo</Text>
      </View>

      <FlatList
        data={SAMPLE_PRODUCTS}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => <ProductCard product={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { padding: 16 },
  title: { fontSize: 28, fontWeight: '700', color: theme.colors.textPrimary },
  subtitle: { color: theme.colors.textSecondary, marginTop: 4 },
  list: { paddingHorizontal: 12, paddingBottom: 24 },
  row: { justifyContent: 'space-between', marginBottom: 12 }
});
