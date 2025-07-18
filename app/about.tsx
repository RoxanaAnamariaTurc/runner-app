import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import Footer from "./_components/Footer";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{t("associationTitle")}</Text>
          <Text style={styles.founded}>{t("founded")}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("purpose")}</Text>
          <Text style={styles.description}>{t("purposeText")}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("values")}</Text>
          <View style={styles.valuesPillsContainer}>
            <View style={[styles.valuePill, styles.valuePillYellow]}>
              <Text style={styles.valuePillText}>{t("integrity")}</Text>
            </View>
            <View style={[styles.valuePill, styles.valuePillRed]}>
              <Text style={styles.valuePillText}>{t("enthusiasm")}</Text>
            </View>
            <View style={[styles.valuePill, styles.valuePillYellow]}>
              <Text style={styles.valuePillText}>{t("passion")}</Text>
            </View>
            <View style={[styles.valuePill, styles.valuePillRed]}>
              <Text style={styles.valuePillText}>{t("professionalism")}</Text>
            </View>
            <View style={[styles.valuePill, styles.valuePillYellow]}>
              <Text style={styles.valuePillText}>{t("teamSpirit")}</Text>
            </View>
            <View style={[styles.valuePill, styles.valuePillRed]}>
              <Text style={styles.valuePillText}>{t("altruism")}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t("majorProjects")}</Text>

          <View style={styles.project}>
            <Text style={styles.projectTitle}>{t("crosulSperantei")}</Text>
            <Text style={styles.projectDescription}>
              {t("crosulDescription")}
            </Text>
            <View style={styles.projectDetails}>
              <Text style={styles.projectItem}>{t("edition1")}</Text>
              <Text style={styles.projectItem}>{t("edition2")}</Text>
              <Text style={styles.projectItem}>{t("edition3")}</Text>
            </View>
            <Text style={styles.probeTitle}>{t("races")}</Text>
            <View style={styles.projectDetails}>
              <Text style={styles.projectItem}>{t("childrenRaces")}</Text>
              <Text style={styles.projectItem}>{t("amateurRaces")}</Text>
              <Text style={styles.projectItem}>{t("advancedRaces")}</Text>
            </View>
            <Text style={styles.highlight}>{t("donationHighlight")}</Text>
          </View>

          <View style={styles.project}>
            <Text style={styles.projectTitle}>{t("giveHopeCampaign")}</Text>
            <Text style={styles.projectDescription}>
              {t("giveHopeDescription")}
            </Text>
          </View>

          <View style={styles.project}>
            <Text style={styles.projectTitle}>{t("autism24h")}</Text>
            <Text style={styles.projectDescription}>
              {t("autismDescription")}
            </Text>
            <Text style={styles.projectItem}>{t("blajAmbassadors")}</Text>
          </View>

          <View style={styles.project}>
            <Text style={styles.projectTitle}>{t("viaScriptorum")}</Text>
            <Text style={styles.projectDescription}>
              {t("viaScriptorumDescription")}
            </Text>
            <View style={styles.projectDetails}>
              <Text style={styles.projectItem}>
                {t("viaScriptorumDetails1")}
              </Text>
              <Text style={styles.projectItem}>
                {t("viaScriptorumDetails2")}
              </Text>
              <Text style={styles.projectItem}>
                {t("viaScriptorumDetails3")}
              </Text>
            </View>
          </View>

          <View style={styles.project}>
            <Text style={styles.projectTitle}>
              5. {t("scrisorareIepurasului")}
            </Text>
            <Text style={styles.projectDescription}>
              {t("scrisorareDescription")}
            </Text>
          </View>

          <View style={styles.project}>
            <Text style={styles.projectTitle}>6. {t("kidsRace2021")}</Text>
            <View style={styles.projectDetails}>
              <Text style={styles.projectItem}>{t("kidsRaceDetails1")}</Text>
              <Text style={styles.projectItem}>{t("kidsRaceDetails2")}</Text>
              <Text style={styles.projectItem}>{t("kidsRaceDetails3")}</Text>
            </View>
          </View>

          <View style={styles.project}>
            <Text style={styles.projectTitle}>7. {t("autism24h2021")}</Text>
            <View style={styles.projectDetails}>
              <Text style={styles.projectItem}>{t("autism24hDetails1")}</Text>
              <Text style={styles.projectItem}>{t("autism24hDetails2")}</Text>
              <Text style={styles.projectItem}>{t("autism24hDetails3")}</Text>
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
    backgroundColor: "#1f3e25",
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
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 26,
    letterSpacing: 0.3,
  },
  founded: {
    color: "#f0d26e",
    fontSize: 16,
    fontWeight: "500",
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: "#f0d26e",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    letterSpacing: 0.5,
  },
  description: {
    color: "#E8E8E8",
    fontSize: 14,
    lineHeight: 22,
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
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderWidth: 1,
  },
  valuePillYellow: {
    backgroundColor: "rgba(240, 210, 110, 0.25)",
    borderColor: "rgba(240, 210, 110, 0.4)",
  },
  valuePillRed: {
    backgroundColor: "rgba(135, 206, 250, 0.25)",
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
    padding: 18,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#f0d26e",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  projectTitle: {
    color: "#f0d26e",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    letterSpacing: 0.3,
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
    color: "#f0d26e",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  highlight: {
    color: "#f0d26e",
    fontSize: 13,
    fontStyle: "italic",
    marginTop: 10,
  },
});
