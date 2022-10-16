import { MouseEvent } from 'react';
import { MenuProps } from './Menu';
export declare function useMenu(): readonly [(e: MouseEvent) => void, Omit<MenuProps, "items">];
