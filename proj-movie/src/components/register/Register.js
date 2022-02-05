import { useFormik } from "formik";
import * as yup from 'yup';
import axios from 'axios'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Register.css'
import { Alert, OverlayTrigger, Popover } from "react-bootstrap";

const Register = () => {


    const navigate = useNavigate()
    const [user, setUser] = useState('')
    const [show, setShow] = useState(false)
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
                    setShow(true)

                    console.log(response)
                    if (response === 'user added successfully' ) {
                        setInterval(() => {
                            navigate('/login')
                        }, 1000);
                    }
                })
                .catch(e => console.log(e))
        }
    })
    // console.log(`const user = ${user}`)
    return (
        <>
            <h1>Register page</h1>
            <div className='registerCard'>
                <form onSubmit={formik.handleSubmit}>
                    <p>CREATE NEW ACCOUNT</p>
                    <div>
                        {
                            show ?

                                <Alert variant="warning" onClose={() => setShow(false)} dismissible>
                                        {user ? <div> {user} </div> : ""}
                                </Alert>
                                :
                                <div></div>
                        }
                        </div>
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
                    {formik.touched.username && formik.errors.username ? <div style={{color: 'red', paddingBottom: '5px'}}>{ formik.errors.username }</div> : null}
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
                    {formik.touched.email && formik.errors.email ? <div style={{color: 'red', paddingBottom: '5px'}}>{ formik.errors.email }</div> : null}
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
                    {formik.touched.password && formik.errors.password ? <div style={{color: 'red', paddingBottom: '5px'}}>{formik.errors.password}</div> : null}
                    <button type='submit'>SIGN UP</button>
                </form>
            </div>
        </>
    );
}

export default Register;
