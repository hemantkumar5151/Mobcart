import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='mb-4'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/login'>
            <Nav.Link className="text-dark font-weight-bold ">Sign In</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link className="text-secondary" disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link className="text-dark font-weight-bold ">Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled className="text-secondary">Shipping</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/payment'>
            <Nav.Link className="text-dark font-weight-bold ">Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link className="text-secondary" disabled>Payment</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/placeorder'>
            <Nav.Link className="text-dark font-weight-bold ">Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link className="text-secondary" disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps