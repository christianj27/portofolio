import { clsx, type ClassValue } from 'clsx';

// Utility function to concatenate class names conditionally
export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}   