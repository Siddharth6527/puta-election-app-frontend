import React from "react";
// import PutaImg from "../../resource/img/puta-cover-page.jpg";
import PutaLogo from "../../resource/img/latest3.png";
import { Box } from "@mui/material";
import FeaturesCard from "../components/Features";
import Features from "../components/textData/Features.json";
import ReliableImg from "../../resource/img/Reliable.svg";
import SafeImg from "../../resource/img/Safe.svg";
import FastImg from "../../resource/img/Fast.svg";
import { Typography } from "@mui/material";
import Aim from "../components/Aim";

export default function Home() {
  return (
    <React.Fragment>
      <Box margin={"auto"} maxWidth={1200}>
        <img
          src={PutaLogo}
          className="img-fluid rounded"
          alt="Responsive image"
        ></img>
      </Box>

      {/* AIM SECTION */}
      <Aim />
      <Box height={100} />

      <Box margin="auto">
        <Typography
          sx={{ typography: { xs: "h4", sm: "h3", md: "h2", lg: "h2" } }}
          variant="h2"
          gutterBottom
          color="#343a40"
        >
          Features
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          margin: "auto",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          justifyContent: "center",
          gap: "10%",
          padding: "2%",
        }}
      >
        <FeaturesCard
          heading={Features.feature1.heading}
          text={Features.feature1.text}
          image={ReliableImg}
        />
        <FeaturesCard
          heading={Features.feature2.heading}
          text={Features.feature2.text}
          image={SafeImg}
        />
        <FeaturesCard
          heading={Features.feature3.heading}
          text={Features.feature3.text}
          image={FastImg}
        />
      </Box>
    </React.Fragment>
  );
}
