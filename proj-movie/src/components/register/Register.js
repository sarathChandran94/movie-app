import { useFormik } from "formik";
import * as yup from 'yup';
import axios from 'axios'
import { useState } from "react";

const Register = () => {
    const [user, setUser] = useState('')
    var response = ""
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: yup.object({
            username: yup.string().matches(/^[A-Za-z0-9]+$/, 'no special characters or spaces allowed!').required('Required'),
            email: yup.string().email('Email address invalid!').required('Required'),
            password: yup.string().required('Required'),
        }),
        onSubmit: values => {
            axios.post('http://localhost:5000/register/newuser', values)
                .then(res => {
                    console.log(res);
                    response = res.data.msg;
                    setUser(response)
                    console.log(response)
                })
                .catch(e => console.log(e))
        }
    })
    return (
        <>
            <h1>Register page</h1>
            {user ? <div style={{ color: 'yellow' }}> {user} </div> : "" }
            <form onSubmit={formik.handleSubmit}>
                    <div>
                        <input
                            name="username"
                            type="text"
                            placeholder="Username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                        />
                    </div>
                    {formik.touched.username && formik.errors.username ? <div style={{color: 'red'}}>{ formik.errors.username }</div> : null}
                    <div>
                        <input
                            name="email"
                            type="text"
                            placeholder="Email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                    </div>
                    {formik.touched.email && formik.errors.email ? <div style={{color: 'red'}}>{ formik.errors.email }</div> : null}
                    <div>
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            />
                    </div>
                    {formik.touched.password && formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                    <button type='submit'>SIGN UP</button>
                </form>
        </>
    );
}

export default Register;
