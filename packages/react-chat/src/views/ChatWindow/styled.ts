import Chat from '@/components/Chat';
import { styled } from '@/styles';

export const ChatWindowContainer = styled('div', {
  height: '100%',
  flex: '1',

  [`& ${Chat.Container}`]: {
    height: '100%',
  },
});
