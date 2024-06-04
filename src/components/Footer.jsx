import Box from "@mui/joy/Box";
const Footer = () => {
  return (
    <>
      <Box
        height={400}
        width="100%"
        my={4}
        display="flex"
        alignItems="center"
        gap={4}
        p={2}
        sx={{ border: "2px solid grey", bgcolor: "#2f2d2d" }}
      >
        차이 미술 과외
      </Box>
    </>
  );
};

export default Footer;
