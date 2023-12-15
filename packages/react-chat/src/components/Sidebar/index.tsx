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
        <Image css={{ backgroundImage: `url(${assistant.image})`, width: '50px', marginBottom: '140px' }} />
        You've been invited to have a conversation with {assistant.title}
        <Button style={{ background: '#2b2f32', position: 'absolute', bottom: '50px' }} onClick={runtime.launch}>
          Restart Chat
        </Button>
      </Content>
    </Container>
  );
};
export default Object.assign(Sidebar, {
  Controlled: createControlled(Sidebar, { defaultValue: '' }),
  Container,
});
