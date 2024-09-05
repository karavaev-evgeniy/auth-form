import { useState } from 'react';
import UInput from "../../ui/UInput/UInput.tsx";
import UButton from "../../ui/UButton/UButton.tsx";
import './AuthForm.css'

function AuthForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return <>
        <form className="auth-form" action="">
            <div className="auth-form__fields">
                <div className="auth-form__row">
                    <label htmlFor="email">
                        Email
                    </label>

                    <UInput
                        id="email"
                        name="email"
                        type="email"
                        placeholder="@"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="auth-form__row">
                    <label htmlFor="password">
                        Password
                    </label>

                    <UInput
                        id="password"
                        name="password"
                        type="password"
                        placeholder="*"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>

            <div className="auth-form__controls">
                <UButton className="auth-form__button" type="submit">
                    Login
                </UButton>
            </div>
        </form>
    </>
}

export default AuthForm