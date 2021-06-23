import './App.css';
import DAIFaucet from './artifacts/contracts/DAIFaucet.sol/DaiFaucet.json'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'react-bootstrap'
import TokenSend from './components/TokenSend';

function App() {

  const Token = DAIFaucet;

  return (
    <div className="App">
    <Container style={{width:"500px"}}>
    <Row className="justify-content-md-center ">
      <Col >
      <Row>
      <div> Send Dai Faucets </div>
      </Row>
      <Row>
        
      <TokenSend tokenContract={Token}

      
      />
        </Row></Col>
    </Row>
    </Container>

    </div>
  );
}

export default App;