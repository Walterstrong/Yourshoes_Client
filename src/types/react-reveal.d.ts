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
