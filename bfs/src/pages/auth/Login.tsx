import React, {Component} from 'react';

class Login extends Component<any, any> {
    // handleCallbackResponse(response: any) {
    //     console.log(response.credential);
    // }
    //
    // componentDidMount(): void {
    //     console.log(process.env.REACT_APP_API_URL);
    //     @ts-ignore global google
    //     google.accounts.id.initialize({
    //         client_id: "613532375927-vg6m7aqh9ksfegdf79pv2mtoi3kv75he.apps.googleusercontent.com",
    //         callback: this.handleCallbackResponse
    //     });
    //     // @ts-ignore global google
    //     google.accounts.id.renderButton(
    //         document.getElementById("signInButton"),
    //         {theme: "outline", size: "large"}
    //     )
    // }

    googleAuth() {
        window.open(
            `${process.env.REACT_APP_API_URL}/auth/google/callback`, "_self"
        );
    }

    render() {
        return (
            <main>
                <div className="container">
                    <section
                        className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div
                                    className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                                    <div className="d-flex justify-content-center py-4">
                                        <a href="#" className="logo d-flex align-items-center w-auto">
                                            <img src="assets/img/logo.png" alt=""/>
                                            <span className="d-none d-lg-block">Basic File System</span>
                                        </a>
                                    </div>
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="pt-4 pb-2">
                                                <h5 className="card-title text-center pb-0 fs-4">Sign in to Your
                                                    Account</h5>
                                                <p className="text-center small">You should use your Google account to sign in</p>
                                            </div>
                                            <div className="row g-3">
                                                <div className="col-12 text-center">
                                                    <button className="btn btn-primary w-100 mt-2" id="loginWithGoogle"
                                                            onClick={this.googleAuth}>
                                                        <i className="fa fa-google-plus google-font-color"
                                                           aria-hidden="true"></i>&nbsp;&nbsp;Sign in with Google
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        );
    }
}

export default Login;