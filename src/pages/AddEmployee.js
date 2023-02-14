import { Col, Container, Row, FormEvent, Button, Form } from 'react-bootstrap';
import { useRef } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_NewEmployee } from '../graphql/employeeMutation';
import { useNavigate } from 'react-router-dom';


const AddEmployee = () => {
    const name = useRef("");
    const email = useRef("");
    const phone = useRef("");
    const department = useRef("");
    const imageUrl = useRef("");

    const [ addEmployee ] = useMutation(CREATE_NewEmployee);

    const navigate = useNavigate();

    const addEmployeeHandler = () => { 
        addEmployee({
            variables: {
                name: name.current.value,
                email: email.current.value,
                phone: phone.current.value,
                department: department.current.value,
                imageUrl: imageUrl.current.value,
            },
        }).then(() => {
            navigate('/')
        });
    };

  return (
    <>
      <Container className="mt-2">
        <Row>
          <Col className="col-md-8 offset-md-2">
            <legend>Add Employee Form</legend>
            <Form.Group className="mb-3" controlId="formName">
              <FormEvent.Label>Name</FormEvent.Label>,
              <Form.Control type="text" ref={name} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <FormEvent.Label>Email</FormEvent.Label>,
              <Form.Control type="email" ref={email} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhone">
              <FormEvent.Label>Phone</FormEvent.Label>,
              <Form.Control type="phone" ref={phone} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDepartment">
              <FormEvent.Label>Department</FormEvent.Label>,
              <Form.Control type="text" ref={department} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formImageUrl">
              <FormEvent.Label>imageUrl</FormEvent.Label>,
              <Form.Control type="text" ref={imageUrl} />
            </Form.Group>
            <Button
              variant="primary"
              type="button"
              onClick={addEmployeeHandler}
            >
              Add
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AddEmployee;