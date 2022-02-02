import { Card, Container, Form } from "react-bootstrap";
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { FormControl, useFormControl } from "@mui/material";
import './Login.css'

const Login = () => {
    const initialVal = {
        email: '',
        password: '',
    }
    const [formValues, setFormValues] = useState(initialVal);
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [isPwValid, setIsPwValid] = useState(false)
    const [emailHelper, setEmailHelper] = useState('')
    const [pwHelper, setPwHelper] = useState('')
    const [btnColor, setBtnColor] = useState()
    // const { error } = useFormControl() || {}

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value })
        console.log(formValues)
        if (formValues.email === '') {
            setIsEmailValid(true)
            setEmailHelper('Cannot be empty!')
            setBtnColor('error')
        } else if (formValues.password === '') {
            setIsPwValid(true)
            setPwHelper('Cannot be empty!')
            setBtnColor('error')
        } else {
            setIsPwValid(false)
            setIsEmailValid(false)
            setBtnColor('success')
            setEmailHelper('')
            setPwHelper('')

        }
        // console.log(isValid)

    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <h1>Login Page</h1>
            {/* <Container className='justify-content-center'>
                <Card style={{width: '20rem'}} className=''>
                    <Card.Header>
                        <Card.Title>LOGIN</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form className=''>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                LOGIN
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container> */}

            <div className='formContainer'>
                <Box
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
                        error={isEmailValid}
                        onChange={handleChange}
                        helperText={emailHelper}
                        id="outlined-email-input"
                        type='text'
                        label="Email"
                        name="email"
                        value={formValues.email}
                        />


                        <TextField
                        error={isPwValid}
                        onChange={handleChange}
                        helperText={pwHelper}
                        id="outlined-password-input"
                        label="Password"
                        name="password"
                        type="password"
                        value={formValues.password}
                        />

                </div>
                    <Button onSubmit={handleSubmit} variant="contained" color={btnColor}>LOGIN</Button>

                {/* <div>
                    <TextField
                    required
                    id="standard-required"
                    label="Required"
                    defaultValue="Hello World"
                    variant="standard"
                    />
                    <TextField
                    disabled
                    id="standard-disabled"
                    label="Disabled"
                    defaultValue="Hello World"
                    variant="standard"
                    />
                    <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                    />
                    <TextField
                    id="standard-read-only-input"
                    label="Read Only"
                    defaultValue="Hello World"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="standard"
                    />
                    <TextField
                    id="standard-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="standard"
                    />
                    <TextField
                    id="standard-search"
                    label="Search field"
                    type="search"
                    variant="standard"
                    />
                    <TextField
                    id="standard-helperText"
                    label="Helper text"
                    defaultValue="Default Value"
                    helperText="Some important text"
                    variant="standard"
                    />
                </div> */}
                </Box>
            </div>
        </>
    );
}

export default Login;
