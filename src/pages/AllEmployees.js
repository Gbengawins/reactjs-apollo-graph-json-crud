import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { GET_AllEmployees } from '../graphql/employeesQuery';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


const AllEmployees = () => {
  const [ allEmployeesData, setAllEmployeesData ] = useState([]);
  const { data } = useQuery(GET_AllEmployees, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (data?.AllEmployees) {
      setAllEmployeesData(data.AllEmployees);
    }
  }, [ data ]);

  return (
    <>
      <Container className='mt-2'>
        <Row xs={ 1 } md={ 3 } className='g-4'>
          { allEmployeesData.map((employee) => (
            <Col key={ employee.id }>
              <Card>
                <Card.Img
                  variant='top'
                  src={ employee.imageUrl }
                  style={ { height: 400, width: "100%" } }
                />
                <Card.Body>
                  <Card.Title>{ employee.name }</Card.Title>
                  <Card.Text>{ employee.name }</Card.Text>
                  <Card.Text>{ employee.email }</Card.Text>
                  <Card.Text>{ employee.phone }</Card.Text>
                  <Card.Text>{ employee.department }</Card.Text>
                  <Card.Text>{ employee.imageUrl }</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )) }
        </Row>
      </Container>
    </>
  );
};

export default AllEmployees;