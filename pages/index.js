import {useState} from 'react';

export default () => {
  const [counter, updateCounter] = useState(0);

  const increment = () => updateCounter(counter + 1);

  return (
    <div>
      <h1>Welcome to bxjs!</h1>
      <div>{counter}</div>
      <button onClick={increment}>Up the number!</button>
    </div>
  );
};
