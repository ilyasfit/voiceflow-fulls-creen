import React, { useContext } from 'react';
import { RuntimeStateAPIContext, RuntimeStateContext } from '@/contexts/RuntimeContext';
import { Container, Content, Image } from './styled';
import Button from '../Button';

import { ControlProps, createControlled } from '@/utils/controls';

const Sidebar: React.FC = () => {
  const runtime = useContext(RuntimeStateAPIContext);
  const state = useContext(RuntimeStateContext);
  const { assistant } = runtime;

  return (
    <Container>
      <Content>
        <Image css={{ backgroundImage: `url('https://i.ibb.co/0sxbZCK/logo-white.png')`, height: '54px', width: '200px', marginBottom: '140px' }} />
        <p style={{ fontFamily: 'Arial', fontSize: '28px' }}>
          <span style={{ color: 'F0F8FF' }}>We automate.</span> <br></br>
          You focus on work that matters.
        </p>
        <Button style={{ background: '#0F0F0F', position: 'absolute', bottom: '50px' }} onClick={runtime.launch}>
          <p style={{ color: 'white', fontWeight: 500, margin: '0 14px' }}>Restart Chat</p>
        </Button>
      </Content>
    </Container>
  );
};
export default Object.assign(Sidebar, {
  Controlled: createControlled(Sidebar, { defaultValue: '' }),
  Container,
});