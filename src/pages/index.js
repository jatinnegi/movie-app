import Meta from "../components/Meta";
import Container from "../components/Container/Container";
import Slider from "../components/Slider/Slider";
import Popular from "../components/Popular/Popular";

export default function Home() {
  return (
    <>
      <Meta />
      <Slider />
      <Container>
        <Popular />
      </Container>
    </>
  );
}
