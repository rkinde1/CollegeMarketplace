import React from 'react'
import Button from '@mui/material/StepLabel';

const basicButton = ({children,color,disabled,size,variant,sx}) => {
    return(
        <Button 
            color={color}
            disabled={disabled}/*button disabled until certain conditions are met*/
            size={size}
            variant={variant}/*contained, outlined, default*/
            sx={sx}/*overrides button default style*/
        >

            {children}
        </Button>

    )

}
export default basicButton;