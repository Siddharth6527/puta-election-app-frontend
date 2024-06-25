import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
// import Image from "next/image";
import { Box } from "@mui/material";

export default function FeaturesCard(props) {
  return (
    // default maxwidth 345
    <Card
      sx={{
        width: { sm: 300, md: 345, lg: 400 },
        heigth: 200,
        marginBottom: 5,
        borderRadius: "10px",
        backgroundColor: "#f1f3f5",
        margin: { xs: 5, md: 2 },
      }}
    >
      {/* <Image src={props.image} alt="testing" layout="responsive"></Image> */}
      {/* height = 140 */}
      <Box margin={"auto"} maxWidth={1200} padding={10}>
        <img
          // sx={{ padding: 10 }}
          src={props.image}
          // height={40}
          className="img-fluid rounded"
          alt="Responsive image"
        ></img>
      </Box>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          align={"center"}
          gutterBottom
          variant="h5"
          component="div"
          margin={"auto"}
        >
          {props.heading}
        </Typography>
        <Box height={10} />
        <Typography
          align={"center"}
          variant="body1"
          color="text.secondary"
          margin={"auto"}
        >
          {props.text}
        </Typography>
      </CardContent>
    </Card>
  );
}
