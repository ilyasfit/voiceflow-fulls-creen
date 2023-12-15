import { ClassName } from '@/constants';
import { styled } from '@/styles';
import { tagFactory } from '@/hocs';

const tag = tagFactory(ClassName.WIDGET);

export const Container = styled(tag('div', 'sidebar'), {
  background: '$primary',
  width: '40%',
});

export const Content = styled(tag('div', 'content'), {
  padding: '50px',
  height: 'calc(100% - 100px)',
  color: '$white',
  fontSize: '$5',
});

export const Image = styled(tag('div', 'image'), {
  aspectRatio: '1',
  backgroundSize: 'cover',
  borderRadius: '$1',
});

export const RestartButton = styled(tag('div', 'content'), {
  padding: '50px',
  height: 'calc(100% - 100px)',
  color: '$white',
  fontSize: '$5',
});
