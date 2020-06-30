import React from 'react';
import './Box.css';

const Box = ({ children, ...rest }) => <div {...rest}>{children}</div>;

export default Box;
