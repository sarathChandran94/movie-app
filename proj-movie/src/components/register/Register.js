import { useFormik } from "formik";
import * as yup from 'yup';
import axios from 'axios'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Register.css'
import { Alert, Spinner } from "react-bootstrap";

const Register = () => {


    const navigate = useNavigate()
    const [user, setUser] = useState('')
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    var responseMsg = ""
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
            setIsLoading(true)
            axios.post('http://localhost:5000/register/newuser', values)
                .then(res => {
                    responseMsg = res.data.msg;
                    setUser(responseMsg)
                    setShow(true)
                    setIsLoading(false)

                    console.log(`responseMsg: ${responseMsg}`)
                    if (responseMsg === 'Registration successfull!' ) {
                        console.log(`newUser: ${res.data.user.username}`);
                        setInterval(() => {
                            navigate('/login')
                        }, 1000);
                    }
                })
                .catch(e => {
                    setUser(e.message)
                    setIsLoading(false)
                    setShow(true)
                    console.log(`new user error: ${e}`)
                })
        }
    })
    // console.log(`const user = ${user}`)
    return (
        <>
            <h1>Register page</h1>
            <div className='registerCard'>
                <form onSubmit={formik.handleSubmit}>
                    <p>CREATE NEW ACCOUNT</p>
                    { isLoading &&  (<div className='loadAnimation'><Spinner animation="border" variant="success" /><span>Contacting server...</span></div>)}
                    <div>
                        {
                            show ?

                                <Alert variant="warning" onClose={() => setShow(false)} dismissible>
                                        {user ? <div>{user}</div> : ""}
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
                    {formik.touched.username && formik.errors.username ? <div style={{color: 'darkred', paddingBottom: '5px'}}>{ formik.errors.username }</div> : null}
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
                    {formik.touched.email && formik.errors.email ? <div style={{color: 'darkred', paddingBottom: '5px'}}>{ formik.errors.email }</div> : null}
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
                    {formik.touched.password && formik.errors.password ? <div style={{color: 'darkred', paddingBottom: '5px'}}>{formik.errors.password}</div> : null}
                    <button type='submit'>SIGN UP</button>
                    <div><p>Already registered? <Link to='/login'>LOGIN</Link></p></div>
                </form>
            </div>
        </>
    );
}

export default Register;
