declare module "react-reveal/Fade" {
  import { ComponentType, CSSProperties, ReactNode } from "react";

  export interface FadeProps {
    children?: ReactNode;
    cascade?: boolean;
    bottom?: boolean;
    top?: boolean;
    left?: boolean;
    right?: boolean;
    opposite?: boolean;
    big?: boolean;
    spy?: any;
    appear?: boolean;
    delay?: number;
    duration?: number;
    distance?: string;
    count?: number;
    force?: boolean;
    forever?: boolean;
    wait?: number;
    style?: CSSProperties;
    ref?: (node: HTMLElement) => void;
    onReveal?: () => void;
    className?: string;
    innerClassName?: string;
    collapse?: boolean;
    mountOnEnter?: boolean;
    unmountOnExit?: boolean;
  }

  const Fade: ComponentType<FadeProps>;
  export default Fade;
}

declare module "react-reveal/Bounce" {
  import { ComponentType, CSSProperties, ReactNode } from "react";

  export interface BounceProps {
    children?: ReactNode;
    cascade?: boolean;
    bottom?: boolean;
    top?: boolean;
    left?: boolean;
    right?: boolean;
    spy?: any;
    appear?: boolean;
    delay?: number;
    duration?: number;
    count?: number;
    force?: boolean;
    forever?: boolean;
    wait?: number;
    style?: CSSProperties;
    ref?: (node: HTMLElement) => void;
    onReveal?: () => void;
    className?: string;
    innerClassName?: string;
    collapse?: boolean;
    mountOnEnter?: boolean;
    unmountOnExit?: boolean;
  }

  const Bounce: ComponentType<BounceProps>;
  export default Bounce;
}

declare module "react-reveal/Zoom" {
  import { ComponentType, CSSProperties, ReactNode } from "react";

  export interface ZoomProps {
    children?: ReactNode;
    cascade?: boolean;
    spy?: any;
    appear?: boolean;
    delay?: number;
    duration?: number;
    count?: number;
    force?: boolean;
    forever?: boolean;
    wait?: number;
    style?: CSSProperties;
    ref?: (node: HTMLElement) => void;
    onReveal?: () => void;
    className?: string;
    innerClassName?: string;
    collapse?: boolean;
    mountOnEnter?: boolean;
    unmountOnExit?: boolean;
  }

  const Zoom: ComponentType<ZoomProps>;
  export default Zoom;
}

declare module "react-reveal/Flip" {
  import { ComponentType, CSSProperties, ReactNode } from "react";

  export interface FlipProps {
    children?: ReactNode;
    cascade?: boolean;
    spy?: any;
    appear?: boolean;
    delay?: number;
    duration?: number;
    count?: number;
    force?: boolean;
    forever?: boolean;
    wait?: number;
    style?: CSSProperties;
    ref?: (node: HTMLElement) => void;
    onReveal?: () => void;
    className?: string;
    innerClassName?: string;
    collapse?: boolean;
    mountOnEnter?: boolean;
    unmountOnExit?: boolean;
    flipDirection?: "horizontal" | "vertical";
    flipEase?: string;
    flipPerspective?: string | number;
  }

  const Flip: ComponentType<FlipProps>;
  export default Flip;
}

declare module "react-reveal/Rotate" {
  import { ComponentType, CSSProperties, ReactNode } from "react";

  export interface RotateProps {
    children?: ReactNode;
    cascade?: boolean;
    spy?: any;
    appear?: boolean;
    delay?: number;
    duration?: number;
    count?: number;
    force?: boolean;
    forever?: boolean;
    wait?: number;
    style?: CSSProperties;
    ref?: (node: HTMLElement) => void;
    onReveal?: () => void;
    className?: string;
    innerClassName?: string;
    collapse?: boolean;
    mountOnEnter?: boolean;
    unmountOnExit?: boolean;
    right?: boolean;
    top?: boolean;
    bottom?: boolean;
    left?: boolean;
    delayRandom?: number;
  }

  const Rotate: ComponentType<RotateProps>;
  export default Rotate;
}
