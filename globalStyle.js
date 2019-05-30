import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    /* width: 100%; */
  }
  body {
    font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  body.fontLoaded {
    font-family: 'Roboto', 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  #app {
    /* min-width: 100%; */
  }
  p,
  label {
    font-family: 'Roboto', Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  tr:nth-child(even) {
    background-color: #dddddd;
  }

  .appBar {
    position: relative;
    top: -1.2vh;
    width: 100vw;
    left: -8px;
  }

  .mainContent {
    min-height: 85vh;
  }
`;

export default GlobalStyle;
