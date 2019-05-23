import styled from 'styled-components';
import PropTypes from 'prop-types';

const TitleStyle = styled.h2`
  color: #222;
`;

const Title = props => {
  const { children } = props;
  return <TitleStyle>{children}</TitleStyle>;
};

Title.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Title;
