import { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  to: string;
};

const Teleport = ({ children, to }: PropsWithChildren<Props>) => {
  const [mounted, setMounted] = useState(false);
  const [element, setElement] = useState(null);

  useEffect(() => {
    const target: any = document.querySelector(to);
    setElement(target);
    setMounted(true);
  }, [to]);

  return mounted && element ? createPortal(children, element) : null;
};

export default Teleport;
