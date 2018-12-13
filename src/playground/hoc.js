// Higher Order Component - a component (HOC) that renders another component
// Meant to reuse code. Will be able to hijack render
// prop minipulation
// abstract state
import React from 'react';
import ReactDOM from 'react-dom';

const Info = props => (
  <div>
    <h1>Info</h1>
    <p>
The info is:
      {props.info}
    </p>
  </div>
);

const withAdminWarning = WrappedComponent => props => (
  <div>
    {props.isAdmin && <p>This is private information. Please don't share</p>}
    <WrappedComponent {...props} />
  </div>
);

const requireAuthentication = WrappedComponent => props => (
  <div>
    {props.isAuthenticated ? (
      <WrappedComponent {...props} />
    ) : (
      <p>Please log in</p>
    )}
  </div>
);

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin={false} info="These are the details" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated info="These are the details" />, document.getElementById('app'));
