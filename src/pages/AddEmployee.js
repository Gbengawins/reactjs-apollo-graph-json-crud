import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { useRef } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_Employee } from '../graphql/employeeMutation';
import { useNavigate } from 'react-router-dom';


const AddEmployee = () => {
  const name = useRef("");
  const email = useRef("");
  const phone = useRef("");
  const department = useRef("");
  const imageUrl = useRef("");

  const [ addEmployee ] = useMutation(CREATE_Employee);

  const navigate = useNavigate();

  const addEmployeeHandler = () => {
    addEmployee({
      variables: {
        name: name.current.value,
        email: email.current.value,
        phone: Number(phone.current.value),
        department:department.current.value,
        imageUrl: imageUrl.current.value,
      },
      update(cache, { data: { createEmployee } }) {
        cache.modify({
          fields: {
            allToys(existingEmployees = []) {
              const newEmployeeRef = cache.writeFragment({
                data: createEmployee,
                fragment: gql`
                  fragment newEmployee on Todo {
                    id
                    name
                    email
                    phone
                    department
                    imageUrl
                  }
                `,
              });
              return [...existingEmployees, newEmployeeRef];
            },
          },
        });
      },
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <>
      <Container className="mt-2">
        <Row>
          <Col className="col-md-8 offset-md-2">
            <legend>Add Employee Form</legend>
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