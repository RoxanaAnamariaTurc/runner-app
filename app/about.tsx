import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import Footer from "./_components/Footer";
import { LinearGradient } from "expo-linear-gradient";

const About = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>
            🏃‍♂️ Asociația Clubul Sportiv Running & Cycling Club Blaj
          </Text>
          <Text style={styles.founded}>📅 Fondat: 2017</Text>
        </View>

        {/* Scop */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scop</Text>
          <Text style={styles.description}>
            Promovarea sportului de masă, valorilor culturale și sportive,
            implicarea în activități caritabile și organizarea de evenimente
            pentru comunitate, cu sprijinul voluntarilor.
          </Text>
        </View>

        {/* Valori */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 Valori</Text>
          <View style={styles.valuesPillsContainer}>
            <View style={[styles.valuePill, styles.valuePillYellow]}>
              <Text style={styles.valuePillText}>Integritate</Text>
            </View>
            <View style={[styles.valuePill, styles.valuePillRed]}>
              <Text style={styles.valuePillText}>Entuziasm</Text>
            </View>
            <View style={[styles.valuePill, styles.valuePillYellow]}>
              <Text style={styles.valuePillText}>Pasiune</Text>
            </View>
            <View style={[styles.valuePill, styles.valuePillRed]}>
              <Text style={styles.valuePillText}>Profesionalism</Text>
            </View>
            <View style={[styles.valuePill, styles.valuePillYellow]}>
              <Text style={styles.valuePillText}>Spirit de echipă</Text>
            </View>
            <View style={[styles.valuePill, styles.valuePillRed]}>
              <Text style={styles.valuePillText}>Altruism</Text>
            </View>
          </View>
        </View>

        {/* Proiecte Majore */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌟 Proiecte Majore</Text>

          {/* Crosul Speranței */}
          <View style={styles.project}>
            <Text style={styles.projectTitle}>1. Crosul Speranței</Text>
            <Text style={styles.projectDescription}>
              Caritate & sport pentru susținerea persoanelor cu Sindrom Down și
              dizabilități.
            </Text>
            <View style={styles.projectDetails}>
              <Text style={styles.projectItem}>
                • Ediția I (2017): 666 participanți
              </Text>
              <Text style={styles.projectItem}>
                • Ediția II (2018): 262 adulți, 405 copii
              </Text>
              <Text style={styles.projectItem}>
                • Ediția III (2019): 723 participanți
              </Text>
            </View>
            <Text style={styles.probeTitle}>Probe:</Text>
            <View style={styles.projectDetails}>
              <Text style={styles.projectItem}>🏃 200m – 1300m copii</Text>
              <Text style={styles.projectItem}>🏃‍♂️ 2.5 km, 8 km – amatori</Text>
              <Text style={styles.projectItem}>
                🏅 Semimaraton 21 km / 26.4 km – avansați
              </Text>
            </View>
            <Text style={styles.highlight}>
              💡 Fondurile strânse au fost donate tinerilor cu dizabilități
            </Text>
          </View>

          {/* Campania Dăruiește Speranță */}
          <View style={styles.project}>
            <Text style={styles.projectTitle}>
              2. Campania „Dăruiește Speranță"
            </Text>
            <Text style={styles.projectDescription}>
              Distribuie alimente persoanelor izolate (Munții Trascău, Rîmeț),
              în fiecare an de Paști și Crăciun.
            </Text>
          </View>

          {/* Autism 24H */}
          <View style={styles.project}>
            <Text style={styles.projectTitle}>
              3. Autism 24H – Marea Neagră
            </Text>
            <Text style={styles.projectDescription}>
              Participare la eveniment național pentru sprijinul copiilor cu
              autism și Sindrom Down.
            </Text>
            <Text style={styles.projectItem}>
              🏃‍♂️ Blaj: 20 ambasadori, 1500+ km "licitați"
            </Text>
          </View>

          {/* Via Scriptorum */}
          <View style={styles.project}>
            <Text style={styles.projectTitle}>4. Proiect „Via Scriptorum"</Text>
            <Text style={styles.projectDescription}>
              Promovarea culturii scrise prin jocuri de pistă inspirate din
              scriitori locali.
            </Text>
            <View style={styles.projectDetails}>
              <Text style={styles.projectItem}>
                📚 Colaborare cu 10+ școli și licee
              </Text>
              <Text style={styles.projectItem}>
                🎯 100 de tineri participanți
              </Text>
              <Text style={styles.projectItem}>
                🏆 Nominalizat la premiile AFCN
              </Text>
            </View>
          </View>

          {/* Scrisoare Iepurașului */}
          <View style={styles.project}>
            <Text style={styles.projectTitle}>5. Scrisoare Iepurașului</Text>
            <Text style={styles.projectDescription}>
              Copii din familii nevoiașe primesc cadouri pe baza scrisorilor
              colectate înainte de Paști.
            </Text>
          </View>

          {/* Kids Race */}
          <View style={styles.project}>
            <Text style={styles.projectTitle}>6. Kids Race (2021)</Text>
            <View style={styles.projectDetails}>
              <Text style={styles.projectItem}>
                🚴‍♀️ Competiție de ciclism pentru copii sub 14 ani
              </Text>
              <Text style={styles.projectItem}>
                🗓 6 iulie 2021 – legată de Turul Ciclist al Sibiului
              </Text>
              <Text style={styles.projectItem}>👧👦 100 de participanți</Text>
            </View>
          </View>

          {/* Autism24H 2021 */}
          <View style={styles.project}>
            <Text style={styles.projectTitle}>7. Autism24H 2021</Text>
            <View style={styles.projectDetails}>
              <Text style={styles.projectItem}>🏁 70 echipe naționale</Text>
              <Text style={styles.projectItem}>
                🥇 Clubul din Blaj – locul 7 (1209 km alergați)
              </Text>
              <Text style={styles.projectItem}>🥉 Locul 3 la km licitați</Text>
            </View>
          </View>
        </View>

        <Footer />
      </ScrollView>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f3e25", // Back to solid dark green
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600", // Slightly less bold
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 26, // Increased line height
    letterSpacing: 0.3, // Add letter spacing
  },
  founded: {
    color: "#f0d26e", // Updated to new yellow color
    fontSize: 16,
    fontWeight: "500", // Slightly less bold
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: "#f0d26e", // Updated to new yellow color
    fontSize: 18,
    fontWeight: "600", // Slightly less bold
    marginBottom: 15,
    letterSpacing: 0.5, // Add letter spacing
  },
  description: {
    color: "#E8E8E8", // Softer white
    fontSize: 14,
    lineHeight: 22, // Increased line height for better readability
    textAlign: "justify",
  },
  valuesPillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 5,
  },
  valuePill: {
    borderRadius: 20,
    paddingHorizontal: 18, // Increased padding
    paddingVertical: 10, // Increased padding
    borderWidth: 1,
  },
  valuePillYellow: {
    backgroundColor: "rgba(240, 210, 110, 0.25)", // Updated to new yellow
    borderColor: "rgba(240, 210, 110, 0.4)",
  },
  valuePillRed: {
    backgroundColor: "rgba(135, 206, 250, 0.25)", // Changed to light blue
    borderColor: "rgba(135, 206, 250, 0.4)",
  },
  valuePillText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
  },
  project: {
    marginBottom: 25,
    padding: 18, // Increased padding
    backgroundColor: "rgba(255, 255, 255, 0.03)", // Softer background
    borderRadius: 12, // More modern rounded corners
    borderLeftWidth: 3,
    borderLeftColor: "#f0d26e", // Updated to new yellow color
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4, // Add subtle shadow
  },
  projectTitle: {
    color: "#f0d26e", // Updated to new yellow color
    fontSize: 16,
    fontWeight: "600", // Slightly less bold
    marginBottom: 10,
    letterSpacing: 0.3, // Add letter spacing
  },
  projectDescription: {
    color: "#ffffff",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
    textAlign: "justify",
  },
  projectDetails: {
    marginLeft: 10,
    marginBottom: 10,
  },
  projectItem: {
    color: "#cccccc",
    fontSize: 13,
    marginBottom: 5,
    lineHeight: 18,
  },
  probeTitle: {
    color: "#f0d26e", // Updated to new yellow color
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  highlight: {
    color: "#f0d26e", // Updated to new yellow color
    fontSize: 13,
    fontStyle: "italic",
    marginTop: 10,
  },
});
