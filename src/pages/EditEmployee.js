import { useEffect, useRef } from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { useMutation, useQuery } from "@apollo/client";
import { GET_EmployeeById } from "../graphql/employeesQuery";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_Employee } from "../graphql/employeeMutation";


const EditEmployee = () => {
    const name = useRef("");
    const email = useRef("");
    const phone = useRef("");
    const department = useRef("");
    const imageUrl = useRef("");
    const { id } = useParams();
    const navigate = useNavigate();
    const { data } = useQuery(GET_EmployeeById, {
    variables: { id: Number(id) },
    });

    const [ updateEmployee ] = useMutation(UPDATE_Employee);
    
    useEffect(() => {
        if (data?.Employee) {
            name.current.value = data.Employee.name;
            email.current.value = data.Employee.email;
            phone.current.value = data.Employee.phone;
            department.current.value = data.Employee.department;
            imageUrl.current.value = data.Employee.imageUrl;
        }
    }, [ data ]);

    const updateEmployeeHandler = () => {
        updateEmployee({
            variables: {
                id: Number(id),
                name: name.current.value,
                email: email.current.value,
                phone: Number(phone.current.value),
                department: department.current.value,
                imageUrl: imageUrl.current.value,
            },
        }).then(() => {
            navigate('/');
        });
    };


  return (
    <>
      <Container className="mt-2">
        <Row>
          <Col className="col-md-8 offset-md-2">
            <legend>Update Employee Form</legend>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>,
              <Form.Control type="text" ref={name} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>,
              <Form.Control type="email" ref={email} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Phone</Form.Label>,
              <Form.Control type="phone" ref={phone} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDepartment">
              <Form.Label>Department</Form.Label>,
              <Form.Control type="text" ref={department} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formImageUrl">
              <Form.Label>imageUrl</Form.Label>,
              <Form.Control type="text" ref={imageUrl} />
            </Form.Group>
            <Button
              variant="primary"
              type="button"
              onClick={updateEmployeeHandler}
            >
              Add
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default EditEmployee;