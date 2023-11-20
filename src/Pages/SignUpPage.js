import React from 'react';
import Base from '../components/Base';
import { useState } from "react";
import { signUp } from '../Utility/UserService';
import { toast } from "react-toastify";
import { Card, CardBody, CardHeader, Container, FormGroup, Label, Input, Form, Button, Col, Row, FormFeedback } from 'reactstrap';

const SignupPage = () => {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState({
        errors: {},
        isError: false,
    });

    // handle change
    const handleChange = (event, property) => {
        //dynamic setting the values
        setData({ ...data, [property]: event.target.value });
    };

    //reseting the form
    const resetData = () => {
        setData({
            name: "",
            email: "",
            password: "",
        });
    };

    //submit the form
    const submitForm = (event) => {
        event.preventDefault();

        //data validate
        console.log(data);

        //call server api for sending data
        signUp(data)
            .then((resp) => {
                console.log(resp);
                console.log("success log");
                toast.success("User is registered successfully !! user id " + resp.id);
                setData({
                    name: "",
                    email: "",
                    password: "",
                    about: "",
                });
            })
            .catch((error) => {
                console.log(error);
                console.log("Error log");
                //handle errors in proper way
                setError({
                    errors: error,
                    isError: true,
                });
            });
    };

    return (
        <Base>
            <Container>
                <Row className="mt-4">
                    {/* { JSON.stringify(data) } */}
                    <Col sm={{ size: 6, offset: 3 }}>
                        <Card color="dark" inverse>
                            <CardHeader>
                                <h3> Fill up the registration details!!!</h3>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={submitForm}>
                                    <FormGroup>
                                        <Label for="name">Enter Name</Label>
                                        <Input
                                            type="text"
                                            placeholder="Enter here"
                                            id="name"
                                            onChange={(e) => handleChange(e, "name")}
                                            value={data.name}
                                            invalid={
                                                error.errors?.response?.data?.name ? true : false
                                            }
                                        />
                                        <FormFeedback>
                                            {error.errors?.response?.data?.name}
                                        </FormFeedback>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="email">Enter Email</Label>
                                        <Input
                                            type="email"
                                            placeholder="Enter here"
                                            id="email"
                                            onChange={(e) => handleChange(e, "email")}
                                            value={data.email}
                                            invalid={
                                                error.errors?.response?.data?.name ? true : false
                                            }
                                        />
                                        <FormFeedback>
                                            {error.errors?.response?.data?.email}
                                        </FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                    <Label for="password">Enter password</Label>
                                    <Input
                                        type="password"
                                        placeholder="Enter here"
                                        id="password"
                                        onChange={(e) => handleChange(e, "password")}
                                        value={data.password}
                                        invalid={
                                            error.errors?.response?.data?.name ? true : false
                                        }
                                    />
                                    <FormFeedback>
                                        {error.errors?.response?.data?.password}
                                    </FormFeedback>
                                </FormGroup>
                                <Container className='text-center'>
                                    <Button outline color="light">
                                        Register
                                    </Button>
                                    <Button
                                        onClick={resetData}
                                        color="secondary"
                                        type="reset"
                                        className="ms-2"
                                    >
                                        Reset
                                    </Button>
                                </Container>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
        </Base >
    );
};

export default SignupPage;
