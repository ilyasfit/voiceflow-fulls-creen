import { useState } from 'react';

import Button from '@/components/Button';
import ChatInput from '@/components/ChatInput';

import { Container, Watermark } from './styled';

export interface FooterProps {
  /**
   * If true, shows a watermark indicating that the conversation is powered by Voiceflow.
   */
  withWatermark: boolean;

  /**
   * If true, shows a prompt to start a new chat by calling the {@link onStart} handler.
   * If false, renders controls for the user to write a response.
   */
  hasEnded?: boolean | undefined;

  /**
   * A callback to start a new conversation.
   */
  onStart?: (() => Promise<void>) | undefined;

  /**
   * A callback to submit a user response.
   */
  onSend?: ((message: string) => Promise<void>) | undefined;
}

const Footer: React.FC<FooterProps> = ({ withWatermark, hasEnded, onStart, onSend }) => {
  const [message, setMessage] = useState('');
  const [buffering, setBuffering] = useState(false);

  const handleSend = async (): Promise<void> => {
    if (!message || buffering) return;

    setBuffering(true);

    setMessage('');
    await onSend?.(message);

    setBuffering(false);
  };

  return (
    <Container withShadow={!!hasEnded} withWatermark={withWatermark}>
      {hasEnded ? (
        <Button onClick={onStart}>Start New Chat</Button>
      ) : (
        // eslint-disable-next-line jsx-a11y/no-autofocus
        <ChatInput
          value={message}
          placeholder="Message…"
          autoFocus
          onValueChange={setMessage}
          onSend={handleSend}
          onRestart={onStart}
          buffering={buffering}
        />
      )}
      <Watermark />
    </Container>
  );
};

/**
 * Footer for the chat widget; displays input controls or a prompt to restart the conversation.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/docs/components-chat-footer--running}
 */
export default Object.assign(Footer, {
  Container,
  Watermark,
});
