import { MakeChoice } from 'components/makeChoice';
import { useState } from 'react';

interface TestPage {
  message: string;
}


const TestPage = ({ message }: TestPage) => {
  const [ choice, setChoice ] = useState('');

  return (
    <div style={{backgroundColor: choice}}>
      <MakeChoice choice={setChoice} message={message} />
    </div>
  );
};

export const getServerSideProps = () => {
  return {
    props: {
      message: 'Make Your choice wisely',
    },
  };
};

export default TestPage;
