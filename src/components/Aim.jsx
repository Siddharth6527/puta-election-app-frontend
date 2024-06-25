import React from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";
// import mainImg from "../../../public/main.jpg";
// import Image from "next/image";
import TeacherImg from "../../resource/img/teachers-img.png";

export default function Aim() {
  return (
    <div>
      <Box height={100} />
      <Box>
        {/* <Image src={mainImg} alt={"main-image"} layout="responsive"></Image> */}
        <img src={TeacherImg} alt="" className="img-fluid rounded" />
      </Box>
      <Box sx={{ padding: "2%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h2"
            // color="initial"
            color="#343a40"
            sx={{ typography: { xs: "h4", sm: "h4", lg: "h2" } }}
          >
            Puta Election App&apos;s Aim
          </Typography>
        </Box>
        <Box height={50} />
        <Box>
          <Grid
            sx={{ display: "flex", justifyContent: "center" }}
            container
            spacing={2}
          >
            <Grid item xs={10} md={8} lg={6}>
              <Typography variant="h5" color="#343a40" align="center">
                Develop a secure and user-friendly software application to
                streamline the process of conducting college-level elections for
                teachers&apos; associations, ensuring accurate vote tallying and
                transparent results.
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box height={100} />
      </Box>
    </div>
  );
}
