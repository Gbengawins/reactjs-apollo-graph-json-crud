import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { GET_AllEmployees } from '../graphql/employeesQuery';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DeleteConfirmation from '../components/shared/DeleteConfirmation';

const AllEmployees = () => {
  const [ allEmployeesData, setAllEmployeesData ] = useState([]);
  const { data } = useQuery(GET_AllEmployees, {
    fetchPolicy: 'no-cache',
  });

  const navigate = useNavigate();

  const [ itemIDToDelete, setItemIDToDelete ] = useState(0);
  const [ showModal, setShowModal ] = useState(false);
  
  const [ deleteEmployee ] = useMutation(DELETE_EmployeeById);

  useEffect(() => {
    if (data?.AllEmployees) {
      setAllEmployeesData(data.AllEmployees);
    }
  }, [ data ]);

  const openConfirmDeleteModalHandler = () => { 
    setItemIDToDelete(id);
    showModal(true);
  };

  const closeConfirmDeleteModalHandler = () => { 
    setItemIDToDelete(0);
    showModal(false);
  };

  const confirmDeleteHandler = () => {
    deleteEmployee({
      variables: {
        id: itemIDToDelete,
      }
    }).then(() => {
      setAllEmployeesData((existingData) => {
        return existingData.filter((_) => _.id != itemIDToDelete);
      });
      setItemIDToDelete(0);
      setShowModal(false);
    });
  };


  return (
    <>
      <DeleteConfirmation
        showModal={showModal}
        title="Delete Confirmation"
        body="Are you sure you want to delete item?"
        closeConfirmDeleteModalHandler={closeConfirmDeleteModalHandler}
        confirmDeleteHandler={confirmDeleteHandler}
      ></DeleteConfirmation>
      <Container className="mt-2">
        <Row>
          <Col className="col-md-4 offset-md-4">
            <Button
              variant="primary"
              type="button"
              onClick={() => {
                navigate("/add-employee");
              }}
            >
              Add
            </Button>
          </Col>
        </Row>
        <Row xs={1} md={3} className="g-4">
          {allEmployeesData.map((employee) => (
            <Col key={employee.id}>
              <Card>
                <Card.Img
                  variant="top"
                  src={employee.imageUrl}
                  style={{ height: 400, width: "100%" }}
                />
                <Card.Body>
                  <Card.Text>{employee.imageUrl}</Card.Text>
                  <Card.Title>{employee.name}</Card.Title>
                  <Card.Text>{employee.name}</Card.Text>
                  <Card.Text>{employee.email}</Card.Text>
                  <Card.Text>{employee.phone}</Card.Text>
                  <Card.Text>{employee.department}</Card.Text>
                  <Button
                    variant="primary"
                    type="button"
                    onClick={() => navigate(`/edit-employee/${employee.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    type="button"
                    onClick={() => openConfirmDeleteModalHandler(employee.id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default AllEmployees;