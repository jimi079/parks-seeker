import React from 'react'
import { Button as Btn } from "@material-ui/core";
import './ButtonStyle.css'

/**
 * Custom Button Interface
 */
interface IButton {
    label: string;
    variant: 'contained' | 'outlined' | 'text';
    color: 'default' | 'inherit' | 'primary' | 'secondary';
    size: 'large' | 'medium' | 'small';
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    onClick: () => void;
    align?: 'center' | 'flex-start' | 'flex-end',
    justify?: 'center' | 'flex-start' | 'flex-end',
}

/**
 * Custom Button
 * @param props
 */
const Button = (props: IButton) => {
    return <div className={`buttonContainer`} style={{ justifyContent : props.align, alignItems: props.justify }}>
        <Btn {...props}>
            {props.label}
        </Btn>
    </div>
}

export default Button;
