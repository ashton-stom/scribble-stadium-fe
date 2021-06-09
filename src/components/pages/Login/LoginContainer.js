import React, { useEffect } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';

import { config } from '../../../utils/oktaConfig';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

import Header from '../../common/Header';

const LoginContainer = () => {
  useEffect(() => {
    const { pkce, issuer, clientId, redirectUri, scopes } = config;
    // destructure your config so that you can pass it into the required fields in your widget.
    const widget = new OktaSignIn({
      baseUrl: issuer ? issuer.split('/oauth2')[0] : '',
      clientId,
      redirectUri,
      registration: {
        // parseSchema: function (schema, onSuccess, onFailure) {
        //   // This example will add an additional field to the registration form
        //     schema.profileSchema.properties.address = {
        //       'type': 'string',
        //       'description': 'name',
        //       'default': 'Enter your name',
        //       'maxLength': 255
        //     };
        //     schema.profileSchema.fieldOrder.push('name');
        //     onSuccess(schema);
        // }
      },
      features: { registration: true },
      // turning this feature on allows your widget to use Okta for user registration
      logo: 'path-to-your-logo',
      // add your custom logo to your signing/register widget here.
      i18n: {
        en: {
          'primaryauth.title': `Sign-in to your account`,
          'primaryauth.username.placeholder': 'Email Address',
          // change title for your app
        },
      },
      authParams: {
        pkce,
        issuer,
        display: 'page',
        scopes,
      },
    });

    widget.renderEl(
      { el: '#sign-in-widget' },
      () => {
        /**
         * In this flow, the success handler will not be called because we redirect
         * to the Okta org for the authentication workflow.
         */
      },
      err => {
        throw err;
      }
    );
  }, []);

  return (
    <>
      <Header displayMenu={false} />
      <div>
        <div id="sign-in-widget" />
      </div>
    </>
  );
};

export default LoginContainer;
