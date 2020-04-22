import zxcvbn from 'zxcvbn';
import { useState } from 'react';

const Index = props => {

    const [password, setPass] = useState({
        length: 0,
        uppercase: false,
        lowercase: false,
        numbers: false,
        symbols: false,
        strength: {score: 0, title: 'Weak'}
    });
    const [passwordToggled, setToggled] = useState(false);
    const hasUpperCase = (str) => {
        let upper = false;
        [...str].forEach(c => {
            if (/^[A-Z]*$/.test(c)) { 
                upper = true ;
            }
        })
        return upper;
    };
    const hasLowerCase = (str) => {
        let lower = false;
        [...str].forEach(c => {
            if (/^[a-z]*$/.test(c)) { 
                lower = true ;
            }
        })
        return lower;
    };
    const hasNumber = (str) => {
        let number = false;
        [...str].forEach(c => {
            if (/^[0-9]*$/.test(c)) { 
                number = true ;
            }
        })
        return number;
    };
    const hasSymbol = (str) => {
        let symbol = false;
        [...str].forEach(c => {
            if (/^[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*$/.test(c)) { 
                symbol = true ;
            }
        })
        return symbol;
    };
    const passStrength = (str) => {
        switch (zxcvbn(str).score) {
            case 0:
              return {score: 0, title: 'Weak'};
            case 1:
              return {score: 1, title: 'Weak'};
            case 2:
              return {score: 2, title: 'Fair'};
            case 3:
              return {score: 3, title: 'Good'};
            case 4:
              return {score: 4, title: 'Strong'};
            default:
              return {score: 0, title: 'Weak'};
          }
    }
    const passwordTest = (e) => {
        setPass({
            length: e.target.value.length,
            uppercase: hasUpperCase(e.target.value),
            lowercase: hasLowerCase(e.target.value),
            numbers: hasNumber(e.target.value),
            symbols: hasSymbol(e.target.value),
            strength: passStrength(e.target.value)
        });
    }
    const togglePasswordShow = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setToggled(!passwordToggled);
    }

    return (
        <div className="main">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6">
                        <div className="card my-5">
                            <div className="card-header">
                            <h3>Sign Up <small className="text-muted font-weight-light">(Password Strength Test)</small></h3>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="inputEmail">Email</label>
                                        <input type="email" name="email" id="inputEmail" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputPassword">Password</label>
                                        <div className="input-group">
                                            <input type={passwordToggled ? "input" : "password"} name="password" id="inputPassword" className="form-control" onChange={e => passwordTest(e) } autoComplete="new-password" />
                                            <div className="input-group-append">
                                                <button className="btn btn-link" onClick={e => togglePasswordShow(e)}>{passwordToggled ? `Hide` : `Show`}</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row justify-content-between">
                                        <div>
                                            <button type="submit" className="btn btn-primary" disabled={!(password.length > 7 && password.uppercase && password.lowercase && password.numbers && password.symbols)}>Sign Up</button>
                                        </div>
                                        <div className="card">
                                            <div className="card-body">
                                                <h5>Password Requirements</h5>
                                                <ul className="list-unstyled">
                                                    <li><i className={password.length > 7 ? `fal fa-check-circle` : `fal fa-circle`}></i> Minimum 8 characters in length</li>
                                                    <li><i className={password.uppercase ? `fal fa-check-circle` : `fal fa-circle`}></i> Uppercase Letters</li>
                                                    <li><i className={password.lowercase ? `fal fa-check-circle` : `fal fa-circle`}></i> Lowercase Letters</li>
                                                    <li><i className={password.numbers ? `fal fa-check-circle` : `fal fa-circle`}></i> Numbers</li>
                                                    <li><i className={password.symbols ? `fal fa-check-circle` : `fal fa-circle`}></i> Symbols</li>
                                                </ul>
                                                <div className="progress">
                                                    <div className={"progress-bar str-" + password.strength.score} role="progressbar" aria-valuenow={password.strength.score} aria-valuemin="0" aria-valuemax="4"></div>
                                                </div>
                                                <p className="text-center font-weight-bolder">Password Strength: {password.strength.title}</p>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .fa-check-circle {
                    color: #4BBF73;
                }
                small {
                    font-size: 50%;
                }
		`}</style>
        </div>
    )
}

export default Index;