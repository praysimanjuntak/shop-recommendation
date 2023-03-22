import { useState } from "react";
import styled, { keyframes } from "styled-components";
import Data from "./shop-items.json";

const Container = styled.div`
  height: 100vh;
`

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
`

const Title = styled.div`
  font-size: 3em;
`

const InputBox = styled.input`
  height: 30px;
  width: 90%;
  font-size: 1.2em;
  padding: 10px;
`

const Button = styled.div`
  padding: 10px;
  height: 80%;
  width: 10%;
  font-size: 1.3em;
  background-color: #19A7CE;
  display: grid;
  place-items: center;
  color: #fff;
  border-radius: 15px;
  cursor: pointer;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  border-radius: 15px;
  gap: 60px;
  width: 200px;
  min-height: 250px;
  padding: 20px;
  justify-content: space-between;
`

const CardTitle = styled.div`
  font-size: 1.7em;
  font-weight: 500;
`

const CardDesc = styled.div`
  font-size: 1.2em;
  word-wrap: break-word;
`

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinningCircle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-top-color: #000;
  animation: ${spin} 1s linear infinite;
  margin: 60px 0;
`;

function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState([]);
  const [showSpin, setShowSpin] = useState(false);

  const handleRecommendation = async () => {
    setShowSpin(true);
    setResult([])
    try {
      const response = await fetch('http://localhost:8080/rec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: text
        })
      })

      const resultResp = await response.json();
      await setShowSpin(false);
      await setResult(resultResp);
    } catch(err) {
      console.log(err)
      setShowSpin(false);
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>{`Enter a prompt (Ex: "I want to listen to music")`}</Title>
        <div style={{width: '50%', display: 'flex', gap: '15px', alignItems: 'center'}}>
          <InputBox onChange={(e) => setText(e?.target?.value)} />
          <Button onClick={handleRecommendation}>{`Find`}</Button>
        </div>
        {showSpin ? <SpinningCircle /> : <></>}
        {result.length > 0 ? 
          <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center'}}>
            {result.map(item => (
              <Card>
                <CardTitle>{item.title}</CardTitle>
                <CardDesc>{Data.filter(obj => obj["name"] === item.title)[0]["description"]}</CardDesc>
              </Card>
            ))}
          </div>
        : <></>}
      </Wrapper>
    </Container>
  );
}

export default App;
