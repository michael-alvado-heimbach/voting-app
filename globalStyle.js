import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Roboto'), local('Roboto-Regular'), url("https://fonts.gstatic.com/s/roboto/v19/KFOmCnqEu92Fr1Mu72xKKTU1Kvnz.woff2") format('woff2');
  }

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

  :focus {
    outline:none;
  }
`;

export default GlobalStyle;
