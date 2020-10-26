import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, InputGroup, FormControl, Table, Card, Modal } from 'react-bootstrap';
import { useState, useCallback } from 'react';

const apiURL = process.env.REACT_APP_API_URL;

const App = () => {
  const [organization, setOrganization] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [metadata, setMetadata] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [repository, setRepository] = useState(null);

  const handleOrganizationChange = useCallback((event) => {
    setOrganization(event.target.value);
  }, [setOrganization]);

  const handleSearch = async () => {
    const response = await fetch(`${apiURL}/organization/${organization}`);
    const body = await response.json();
    setMetadata(body);
    getRepositories();
  };

  const getRepositories = async () => {
    const response = await fetch(`${apiURL}/repositories/${organization}`);
    const { repositories, links } = await response.json();
    setRepositories(repositories);
  };

  const handleRepositoryClick = async (repositoryName) => {
    const response = await fetch(`${apiURL}/repositories/${organization}/${repositoryName}`);
    const repository = await response.json();
    setRepository(repository);
    setModalShow(true);
  };

  return (
    <div className="App">
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Organization name"
          aria-label="Organization name"
          aria-describedby="basic-addon2"
          value={organization}
          onChange={handleOrganizationChange}
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={handleSearch}>Search</Button>
        </InputGroup.Append>
      </InputGroup>
      {metadata &&
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="center" style={{ width: "300px", height: "300px" }} src={metadata.avatar_url} />
          <Card.Body>
            <Card.Title>{metadata.name}</Card.Title>
            <Card.Text>
              {metadata.description}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated {metadata.updated_at}</small>
          </Card.Footer>
        </Card>
      }
      {metadata &&
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Last Update</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {repositories.map((aRepository, index) =>
              <tr key={aRepository.id} onClick={() => handleRepositoryClick(aRepository.name)}>
                <td>{index + 1}</td>
                <td>{aRepository.name}</td>
                <td>{aRepository.updated_at}</td>
                <td>{aRepository.html_url}</td>
              </tr>
            )}
          </tbody>
        </Table>
      }
      <MyVerticallyCenteredModal
        repository={repository}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

const MyVerticallyCenteredModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.repository.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {props.repository.description}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default App;
