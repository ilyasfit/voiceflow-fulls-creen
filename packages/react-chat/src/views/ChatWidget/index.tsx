import { Trace } from '@voiceflow/base-types';
import React, { useContext, useEffect, useMemo, useState } from 'react';

import { ChatPosition, isObject, useTheme } from '@/common';
import Launcher from '@/components/Launcher';
import Proactive from '@/components/Proactive';
import { RuntimeStateAPIContext, RuntimeStateContext } from '@/contexts';
import { noop } from '@/utils/functional';
import { useResolveAssistantStyleSheet } from '@/utils/stylesheet';
import ChatWindow from '@/views/ChatWindow';
import Sidebar from '@/components/Sidebar';

import { ChatContainer, Container, LauncherContainer } from './styled';
import { ChatAPI } from './types';

interface ChatWidgetProps extends React.PropsWithChildren {
  chatAPI?: ChatAPI | undefined;
  ready?: () => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ chatAPI, ready }) => {
  const { assistant, open, close, interact } = useContext(RuntimeStateAPIContext);
  const { isOpen } = useContext(RuntimeStateContext);
  // const isOpen = true;

  /** initialization */
  const [isHidden, setHidden] = useState(false);
  const [proactiveMessages, setProactiveMessages] = useState<Trace.AnyTrace[]>([]);
  // const isMobile = useMemo(() => window.matchMedia('(max-width: 768px)').matches, []);

  const [isMobile, setIsMobile] = useState(false);

  const theme = useTheme(assistant);

  /** initialize window */
  useEffect(() => {
    if (!isObject(chatAPI)) return undefined;
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Attach the event listener to window resize
    window.addEventListener('resize', handleResize);

    // Initial check on component mount
    handleResize();

    Object.assign(chatAPI, {
      open,
      close,
      hide: () => setHidden(true),
      show: () => setHidden(false),
      interact,
      proactive: {
        clear: () => setProactiveMessages([]),
        push: (...messages: Trace.AnyTrace[]) => setProactiveMessages((prev) => [...prev, ...messages]),
      },
    });

    ready?.();

    return () => {
      window.removeEventListener('resize', handleResize);
      Object.assign(chatAPI, {
        open: noop,
        hide: noop,
        show: noop,
        close: noop,
        interact: noop,
        proactive: {
          clear: noop,
          push: noop,
        },
      });
    };
  }, []);

  const side = assistant?.position ?? ChatPosition.RIGHT;
  const position = { bottom: assistant?.spacing.bottom, [side]: assistant?.spacing.side };

  const isStyleSheetResolved = useResolveAssistantStyleSheet(assistant);

  if (!isStyleSheetResolved) return null;
  return (
    <Container withChat={isOpen} isHidden={isHidden} className={theme}>
      <ChatContainer>
        {isMobile ? null : <Sidebar />}
        <ChatWindow />
      </ChatContainer>
    </Container>

    // <Container withChat={isOpen} isHidden={isHidden} className={theme}>
    //   {!!assistant && (
    //     <LauncherContainer style={position}>
    //       <Proactive side={side} messages={proactiveMessages} />
    //       <Launcher onClick={open} image={assistant.launcher} />
    //     </LauncherContainer>
    //   )}
    //   <ChatContainer style={isMobile ? {} : position}>
    //     <ChatWindow />
    //   </ChatContainer>
    // </Container>
  );
};

export default Object.assign(ChatWidget, {
  Launcher,
  Container,
  ChatContainer,
  LauncherContainer,
});
