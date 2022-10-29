import { Container, Grid, Title } from "@mantine/core";
import Image from "next/image";

const data = [
  { src: "/kucoin.png", alt: "Kucoin" },
  { src: "/ascend.png", alt: "Ascend" },
  { src: "/mexc.svg", alt: "Mexc Global" },
  { src: "/toko.png", alt: "Toko Crypto" },
  { src: "/coinw.svg", alt: "Coinw" },
  { src: "/kommunitas.png", alt: "Kommunitas", strech: false },
  { src: "/rg.png", alt: "Rainmaker Games", strech: false },
  { src: "/bombcrypto.png", alt: "Bomb Crypto" },
  { src: "/angelic_logo_white.png", alt: "Angelic" },
  { src: "/orbitau.png", alt: "Orbitau" },
  { src: "/ricewallet.png", alt: "Rice Wallet" },
  { src: "/metagear.png", alt: "Meta Gear" },
];

export default function Collab() {
  return (
    <Container my={32}>
      <Title align="center" mb={32} style={{ color: "white" }}>
        Clients
      </Title>
      <Grid
        grow
        justify="center"
        align="center"
        gutter="lg"
        sx={{ gap: "1em" }}
      >
        {data.map(({ src, alt, strech = true }) => (
          <Grid.Col
            key={src}
            span={4}
            lg={3}
            sx={{
              filter: "grayscale(100%)",
              transition: "filter 200ms ease-in",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid gray",
              borderRadius:"5px" ,

              "&:hover": {
                filter: "grayscale(0%)",
              },
            }}
          >
            <Image
              src={src}
              alt={alt}
              width={strech ? "150%" : "95%"}
              height={"150%"}
              objectFit="contain"
            />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
