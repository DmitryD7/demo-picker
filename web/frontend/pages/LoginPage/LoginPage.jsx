import React from 'react';
import s from './LoginPage.module.css';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {selectIsLoggedIn} from "../../app/authReducer/index.js";
import {Link, Navigate} from 'react-router-dom';

function LoginPage() {
    // const isLoggedIn = useSelector(selectIsLoggedIn);
    const dispatch = useDispatch();

    const validate = (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!values.password) {
            errors.password = 'Required'
        } else if (values.password.length < 3) {
            errors.password = 'Too short password'
        }

        return errors;
    };

    // const fetchData = async (values, formikHelpers) => {
    //     const res = await dispatch(authActions.login(values));
    //     if (res.payload?.error) {
    //         const error = res.payload.error;
    //         formikHelpers.setFieldError('password', error);
    //     }
    // }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: (values) => console.log(values),
    });

    // if (isLoggedIn) {
    //     return <Navigate to={'/'}/>;
    // }

    return (
        <div className={s.LoginPage}>
            <h1 className={s.LoginPage_Header}>Login</h1>
            <Link to={'/signup'} className={s.LoginPage_NewAcc}>New to StyleScan?</Link>
            <div className={s.LoginPage_Form}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={s.LoginPage_Form_Element}>
                        <input
                            type="email"
                            placeholder={'Email'}
                            {...formik.getFieldProps('email')}
                        />
                        {formik.errors.email ?
                            <div className={s.LoginPage_Form_Element_Error}>{formik.errors.email}</div> : null}
                    </div>

                    <div className={s.LoginPage_Form_Element}>
                        <input
                            type="password"
                            placeholder={'Password'}
                            {...formik.getFieldProps('password')}
                        />
                        <div className={s.LoginPage_ForgotPasswBtn}><Link to={'/reset_request'}>Forgot password?</Link>
                        </div>
                        {formik.errors.password ?
                            <div className={s.LoginPage_Form_Element_Error}>{formik.errors.password}</div> : null}
                    </div>

                    <button className={s.LoginPage_Form_Btn} type={"submit"}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;