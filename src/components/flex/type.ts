import { ReactNode } from "react";

export default interface PropsType {
    children: ReactNode;
    gap?: string;
    width?: string;
    height?: string;
    alignItems?: string;
}
