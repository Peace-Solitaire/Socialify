import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../FlexBetween";
import WidgetWrapper from "../WidgetWrapper";

const AdvertisementWidget = () => {
 
  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color="black" variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color="grey.500">Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color="grey.500">MikaCosmetics</Typography>
        <Typography color="grey.500">mikacosmetics.com</Typography>
      </FlexBetween>
      <Typography color="grey.600" m="0.5rem 0">
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertisementWidget;
