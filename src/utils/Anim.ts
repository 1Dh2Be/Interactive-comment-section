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

export const replyArrowRotation = {
  initial: {
    rotate: 0,
  },
  animate: {
    rotate: 180,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    rotate: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
