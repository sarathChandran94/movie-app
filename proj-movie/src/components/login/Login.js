// import { Card, Container, Form } from "react-bootstrap";
// import Button from '@mui/material/Button'
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
import { useState } from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios'
import './Login.css'
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    // const initialVal = {
    //     email: '',
    //     password: '',
    // }
    // const [formValues, setFormValues] = useState(initialVal);
    // const [isEmailInvalid, setIsEmailInvalid] = useState(false)
    // const [isPwInvalid, setIsPwInvalid] = useState(false)
    // const [emailHelper, setEmailHelper] = useState('')
    // const [pwHelper, setPwHelper] = useState('')
    // const [btnColor, setBtnColor] = useState()

    // const handleChange = (e) => {
    //     console.log(e.target)
    //     const { id, value } = e.target;
    //     setFormValues({ ...formValues, [id]: value })
    //     console.log(formValues)

    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     setIsEmailInvalid(false)
    //     setIsPwInvalid(false)
    //     setEmailHelper('')
    //     setPwHelper('')
    //     setBtnColor('success')

    //     if (formValues.email === '') {
    //         setIsEmailInvalid(true)
    //         setEmailHelper('Cannot be empty!')
    //         setBtnColor('error')

    //     }
    //     if (formValues.password === '') {
    //         setIsPwInvalid(true)
    //         setPwHelper('Cannot be empty!')
    //         setBtnColor('error')
    //     }
    //     if (formValues.email && formValues.password) {
    //         console.log(formValues)
    //     }
    // }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: yup.object({
            email: yup.string().email('Email address invalid!').required('Required'),
            password: yup.string().required('Required'),
        }),
        onSubmit: values => {
            axios.post('http://localhost:5000/register/login', values)
                .then(res => {
                    setMessage(res.data.msg)
                    console.log(res.data.user.role)
                    if (res.data.user.role === 'Admin') {
                        navigate('/admin')
                    }
                    if (res.data.user.role === 'User') {
                        navigate('/')
                    }
                })
                .catch(e => console.log(e))
            // console.log(values)
        }
    })

    return (
        <>
            <h1>Login Page</h1>
            {message ? <div style={{color: 'yellow'}}>{ message }</div> : ''}
            <div className='formContainer'>
                {/* <Box
                onSubmit={handleSubmit}
                bgcolor='white'
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                >
                <div >

                        <TextField
                        required
                        error={isEmailInvalid}
                        onChange={handleChange}
                        helperText={emailHelper}
                        id="email"
                        type='text'
                        label="Email"
                        />
                </div>
                <div>

                        <TextField
                        required
                        pattern = '/^[0-9]{5}$/'
                        error={isPwInvalid}
                        onChange={handleChange}
                        helperText={pwHelper}
                        id="password"
                        type="password"
                        label="Password"
                        />

                </div>
                    <Button type='submit' variant="contained" color={btnColor}>LOGIN</Button>
                </Box> */}


                <form onSubmit={formik.handleSubmit}>
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
                    <button type='submit'>LOGIN</button>
                </form>
            </div>
        </>
    );
}

export default Login;
