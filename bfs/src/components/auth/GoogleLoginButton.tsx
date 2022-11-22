import React, {Component} from 'react';
import {getScript} from "../../Utils/Utils";

export interface IGoogleLoginButtonProps {
    readonly clientConfig: gapi.auth2.ClientConfig,
    readonly signInOptions?: gapi.auth2.SigninOptions | gapi.auth2.SigninOptionsBuilder,
    readonly classNames?: string,
    readonly preLogin?: () => void,
    readonly responseHandler: (response: gapi.auth2.GoogleUser) => void
    readonly failureHandler?: (error: string) => void,
    readonly children?: ReadonlyArray<JSX.Element> | JSX.Element
    readonly renderOptions?: {
        readonly width?: number,
        readonly height?: number,
        readonly longtitle?: boolean,
        readonly theme?: string
    }
}

export class GoogleLoginButton extends Component<IGoogleLoginButtonProps> {
    componentDidMount(): void {
        const {classNames, children} = this.props;
        if (typeof gapi == 'undefined') {
            this.setState({disabled: true});
            getScript('https://apis.google.com/js/platform.js', () => {
                gapi.load('auth2', () => {
                    gapi.auth2.init(this.props.clientConfig);
                    if (!classNames && !children) {
                        gapi.signin2.render('google-react-login', {...this.props.renderOptions})
                    }
                })
            })
        } else if (!classNames && !children) {
            gapi.signin2.render('ts-google-react-login', {...this.props.renderOptions})
        }
    }

    readonly clickHandler = () => {
        const {preLogin, responseHandler, signInOptions, failureHandler} = this.props;
        preLogin && preLogin();
        const googleAuth = gapi.auth2.getAuthInstance();
        if (googleAuth) {
            googleAuth.signIn(signInOptions)
                .then((googleUser: any) => {
                    responseHandler(googleUser)
                })
                .catch((reason: any) => {
                    failureHandler && failureHandler(reason.error)
                })
        }
    };

    render(): JSX.Element {
        const {classNames, children} = this.props;
        return (
            <div id='google-react-login' className={`${classNames ? classNames : ''}`} onClick={this.clickHandler}>
                {children ? children : null}
            </div>
        )
    }
}