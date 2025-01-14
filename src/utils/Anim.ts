const ModalVariants = {
  initial: {},
  animate: {},
  exit: {},
};

export const anim = ({ variants }: { variants: typeof ModalVariants }) => {
  return {
    initial: "initial",
    animate: "animate",
    exit: "exit",
    variants,
  };
};
