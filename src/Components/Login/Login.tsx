import React, { useDebugValue, useState } from 'react'
import { FormLayout, TextField, Text, Button, InlineError } from '@shopify/polaris';
import { useNavigate } from 'react-router-dom';
import classes from "./Login.module.css";
import { useFetch } from '../../Hooks/useFetch';
import StorageWrapper from '../../Services/storageWrapper';


const Login = () => {

    type User = {
        username: string;
        password: string;
    }

    type Err = {
        [index: string]: string;
    }

    const storage = new (StorageWrapper as any)();
    storage.setStorage(sessionStorage);

    const [user, setuser] = useState<User>({ username: "", password: "" });
    const [formErr, setFormErr] = useState<Err>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const [api] = useFetch(`https://fbapi.sellernext.com/user/`)


    function handleLogin(e: React.FormEvent): void {
        e.preventDefault();

        setFormErr({});

        const _formErr: Err = {};

        if (!user.username) {
            _formErr['username'] = "Username shouldn't by empty";
        }

        if (!user.password) {
            _formErr['password'] = "Password shouldn't by empty";
        }

        setFormErr(_formErr);

        if (Object.keys(_formErr).length === 0) {
            setIsLoading(true);
            api.get(`login`, {
                params: { username: user.username, password: user.password },
                headers: {
                    "Content-Type": "application/json",
                    authorization:
                        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsInJvbGUiOiJhcHAiLCJpYXQiOjE1MzkwNTk5NzgsImlzcyI6Imh0dHBzOlwvXC9hcHBzLmNlZGNvbW1lcmNlLmNvbSIsImF1ZCI6ImV4YW1wbGUuY29tIiwibmJmIjoxNTM5MDU5OTc4LCJ0b2tlbl9pZCI6MTUzOTA1OTk3OH0.GRSNBwvFrYe4H7FBkDISVee27fNfd1LiocugSntzxAUq_PIioj4-fDnuKYh-WHsTdIFMHIbtyt-uNI1uStVPJQ4K2oYrR_OmVe5_zW4fetHyFmoOuoulR1htZlX8pDXHeybRMYlkk95nKZZAYQDB0Lpq8gxnTCOSITTDES0Jbs9MENwZWVLfyZk6vkMhMoIAtETDXdElIdWjP6W_Q1kdzhwqatnUyzOBTdjd_pt9ZkbHHYnv6gUWiQV1bifWpMO5BYsSGR-MW3VzLqsH4QetZ-DC_AuF4W2FvdjMRpHrsCgqlDL4I4ZgHJVp-iXGfpug3sJKx_2AJ_2aT1k5sQYOMA",
                },

            }).then(response => {
                console.log(response);
                if (!response.success) {
                    throw new Error(response.message);
                }

                debugger;

                storage.set("kk", "1000");
                storage.set("session", response.data.token);
                navigate("/dashboard");

            }).catch((error) => {
                console.error(error.toString());
                setFormErr({ ...formErr, generalError: error.toString() });
                // setUser({ ...user, password: "" });
            }).finally(() => {
                setIsLoading(false);
            });
        }

    }
    
    return (
        <div className={classes.login}>

            <div className={classes.loginText}>
                <Text variant="heading4xl" as="h1" >
                    Login
                </Text>

                {formErr.generalError && (
                    <div style={{ marginTop: "4px", textAlign: "center" }}>
                        <div>{formErr.generalError}</div>
                    </div>
                )}

            </div>
            <form onSubmit={handleLogin} >
                <FormLayout
                >
                    <TextField
                        label="Username"
                        onChange={(value) => { setuser({ ...user, username: value }) }}
                        autoComplete="off"
                        value={user.username ?? ""} />

                    {formErr.username &&
                        <InlineError message={formErr.username} fieldID="myFieldID" />
                    }
                    <TextField
                        type="password"
                        label="Password"
                        onChange={(value) => { setuser({ ...user, password: value }) }}
                        autoComplete="password"
                        value={user.password ?? ""}
                    />
                    {formErr.password &&
                        <InlineError message={formErr.password} fieldID="myFieldID" />
                    }
                    <Button loading={isLoading} primary submit >Login</Button>
                </FormLayout>
            </form>
        </div >
    )
}

export default Login;