import cuid from 'cuid';
import { useMemo, useState, useEffect } from 'react';

import Bubble from '@/components/Bubble';
import Input, { InputProps } from '@/components/Input';
import { createControlled } from '@/utils/controls';

import { ButtonContainer, Container } from './styled';

export interface ChatInputProps extends InputProps {
  /**
   * If true, does not allow the user to submit a response.
   */
  buffering?: boolean;

  /**
   * A callback to submit the user response.
   */
  onSend?: VoidFunction;

  /**
   * A callback to restart the chat.
   */
  onRestart?: VoidFunction;
}

const ChatInput: React.FC<ChatInputProps> = ({ id, onSend, onRestart, buffering, ...props }) => {
  const internalID = useMemo(() => `vf-chat-input--${cuid()}`, []) ?? id;

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    event.stopPropagation();

    if (event.key !== 'Enter') return;

    event.preventDefault();
    onSend?.();
  };
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Attach the event listener to window resize
    window.addEventListener('resize', handleResize);

    // Initial check on component mount
    handleResize();
  }, []);
  return (
    <Container>
      {isMobile ? (
        <ButtonContainer htmlFor={internalID} ready={true} style={{ border: '0px' }}>
          <Bubble size="small" svg="restart" onClick={onRestart} />
        </ButtonContainer>
      ) : null}
      <Input id={internalID} onKeyDown={handleKeyPress} {...props} />
      <ButtonContainer htmlFor={internalID} ready={!!props.value && !buffering}>
        <Bubble size="small" svg="smallArrowUp" onClick={onSend} />
      </ButtonContainer>
    </Container>
  );
};

/**
 * An input control with a built-in submit button.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/components-chat-chatinput--default}
 */
export default Object.assign(ChatInput, {
  Controlled: createControlled(ChatInput, {
    defaultValue: '',
    enrichProps: (props, [, setValue]) => ({
      ...props,
      onSend: (): void => {
        setValue('');
        props.onSend?.();
      },
    }),
  }),
  Container,
  ButtonContainer,
});
