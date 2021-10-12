import React from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

/**
 * Accordion Interface
 */
interface ICustomAccordion {
    label: string;
    children: React.ReactNode,
}

/**
 * Accordion Component
 * @param label
 * @param children
 */
const CustomAccordion = ({label, children}: ICustomAccordion) => {
    return (
        <Accordion className={'Accordion'}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={'AccordionHeading'}>{label}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div className={'AccordionScrollContainer'}>
                    {children}
                </div>
            </AccordionDetails>
        </Accordion>
    );
}

export default CustomAccordion;
