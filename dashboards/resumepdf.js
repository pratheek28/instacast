import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';

// Styles for the PDF layout
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#f0f0f5', // light grayish-blue background
  },
  headshot: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
  },
  foot: {
    width: 50,
    height: 50,
    //borderRadius: 60,
    marginBottom: 10,
  },
  footer: {
    //borderRadius: 60,
    marginTop: 50,
    marginBottom: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 12,
    color: '#444',
    marginBottom: 8,
  },
  section: {
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  sectionText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
  interests: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
  },
});

// Component
const ActorResumePDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Headshot */}
      {data.headshot && <Image src={data.headshot} style={styles.headshot} />}

      {/* Name and Info */}
      <Text style={styles.name}>{data.name}</Text>
      <Text style={styles.info}>
        ({data.gender}, {data.age}yo)
      </Text>
      <Text style={styles.info}>Email: {data.contact}</Text>
      <Text style={styles.info}>Phone: {data.number}</Text>
      <Text style={styles.info}>
        Height: {data.height} | Weight: {data.weight}
      </Text>

      {/* Intro */}
      {data.intro && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Intro</Text>
          <Text style={styles.sectionText}>{data.intro}</Text>
        </View>
      )}

      {/* Interests / Credits */}
      {data.genres?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <Text style={styles.interests}>{data.genres.join(', ')}</Text>
        </View>
      )}

      {/* Location */}
      {data.location && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <Text style={styles.sectionText}>{data.location}</Text>
        </View>
      )}

      <Text style={styles.footer}>Powered by</Text>
      {data.headshot && <Image src="/INSTACAST.png" style={styles.foot} />}
    </Page>
  </Document>
);

export default ActorResumePDF;
