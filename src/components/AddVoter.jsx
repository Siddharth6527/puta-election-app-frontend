import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./AddVoter.css";

function AddVoter() {
    return (
        <Form id="addVoter" action='/addVoter'>
            <Form.Group className="group mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" />
            </Form.Group>
            <Form.Group className="group mb-3" controlId="designation">
                <Form.Label>Designation</Form.Label>
                <Form.Control type="text" placeholder="Enter designation" />
            </Form.Group>
            <Form.Group className="group mb-3">
                <Form.Label>College</Form.Label>
                <Form.Select>
                    <option>Select College</option>
                    <option value="1">COT</option>
                    <option value="2">COA</option>
                    <option value="3">CBSH</option>
                    <option value="4">VET</option>
                    <option value="5">CABM</option>
                    <option value="6">COF</option>
                    <option value="7">COH</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="group mb-3" controlId="Rno">
                <Form.Label>Recipt No.</Form.Label>
                <Form.Control type="number" />
            </Form.Group>
            <Form.Group className="group mb-3">
                <Form.Label>Membership Category</Form.Label>
                <Form.Select>
                    <option>Select Membership Category</option>
                    <option value="1">General</option>
                    <option value="2">Other</option>
                </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default AddVoter;