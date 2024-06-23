import React from "react";
// import PutaImg from "../../resource/img/puta-cover-page.jpg";
import PutaLogo from "../../resource/img/latest4.png";
import { Box } from "@mui/material";

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
    </React.Fragment>
  );
}
