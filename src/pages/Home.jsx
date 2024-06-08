import React from "react";
import PutaImg from "../../resource/img/puta-cover-page.jpg";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <React.Fragment>
      <Box margin={"auto"} maxWidth={1200}>
        <img
          src={PutaImg}
          className="img-fluid rounded"
          alt="Responsive image"
        ></img>
      </Box>
    </React.Fragment>
  );
}
