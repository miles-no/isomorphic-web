import React from 'react';

export default class Html extends React.Component {
  render() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>{this.props.title}</title>
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          <link rel="stylesheet" href={`${this.props.baseUrl}/assets/main-${this.props.appVersion}.min.css`} />
        </head>
        <body>
          <div id="app-container" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
        </body>
        <script src={`${this.props.baseUrl}/assets/bundle-${this.props.appVersion}.min.js`} defer></script>
      </html>
    );
  }
}
