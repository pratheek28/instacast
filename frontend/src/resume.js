import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ActorResumePDF from "./resumepdf";

const ResumeModal = ({ show, onClose, resumeData }) => {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(6px)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        borderRadius: "24px",
      }}
    >
      <div
        style={{
          position: "relative",
          background: "white",
          color: "black",
          borderRadius: "12px",
          padding: "24px",
          width: "100%",
          maxWidth: "420px", // Smaller A4 width
          aspectRatio: "210 / 297", // Maintains A4 ratio
          maxHeight: "75vh", // Keep it from being too tall
          overflowY: "auto",
          boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            backgroundColor: "#e53e3e",
            color: "white",
            border: "none",
            padding: "6px 12px",
            borderRadius: "999px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          X
        </button>

        {/* Download Button */}
        <div style={{ position: "absolute", top: "16px", left: "16px" }}>
          <PDFDownloadLink
            document={<ActorResumePDF data={resumeData} />}
            fileName={`${resumeData.name}_Resume.pdf`}
          >
            {({ loading }) => (
              <button
                style={{
                  backgroundColor: "#3182ce",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {loading ? "Preparing..." : "Download PDF"}
              </button>
            )}
          </PDFDownloadLink>
        </div>

        {/* Resume Content */}
        <div>
          <div style={{ display: "flex", gap: "24px", marginTop: "25px" }}>
            <img
              src={resumeData.headshot}
              alt="Headshot"
              style={{
                width: "160px",
                height: "160px",
                objectFit: "cover",
                borderRadius: "50%", // Makes it circular
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
            />
            <div>
              <h1
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                }}
              >
                {resumeData.name}
              </h1>
              <p style={{ fontSize: "14px", color: "#555" }}>
                ({resumeData.gender}, {resumeData.age}yo)
              </p>
              <p
                style={{ color: "#444", marginBottom: "4px", fontSize: "15px" }}
              >
                📧 {resumeData.contact}
              </p>
              <p
                style={{ color: "#444", marginBottom: "4px", fontSize: "15px" }}
              >
                📞 {resumeData.number}
              </p>
              <p style={{ fontSize: "14px", color: "#666" }}>
                Height: {resumeData.height} | Weight: {resumeData.weight}
              </p>
            </div>
          </div>

          <div style={{ marginTop: "24px" }}>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "12px",
              }}
            >
              Intro
            </h2>
            <p style={{ fontSize: "14px", color: "#333" }}>
              {resumeData.intro}
            </p>
          </div>

          <div style={{ marginTop: "24px" }}>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "12px",
              }}
            >
              Interests
            </h2>

            {/* Center aligned text */}
            <p style={{ fontSize: "14px", color: "#333", textAlign: "center" }}>
              {resumeData.genres.join(", ")}
            </p>
          </div>

          <div style={{ marginTop: "24px" }}>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "12px",
              }}
            >
              Location
            </h2>
            <p style={{ fontSize: "14px", color: "#333" }}>
              {resumeData.location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
