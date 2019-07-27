import React from "react";
import { Link } from "gatsby";

import Container from "../components/styles/container";
import Headline from "../components/styles/page-headline";

const IndexPage = () => (
  <Container>
    <Headline>Hi people</Headline>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }} />
    <Link to="/page-2/">Go to page 2</Link>
  </Container>
);

export default IndexPage;
