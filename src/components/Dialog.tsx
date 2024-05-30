import React, { ReactNode } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

import { User } from '../interfaces/user';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
import { Slide } from '@mui/material';

export interface SimpleDialogProps {
    children: ReactNode;
    open: boolean;
    dialogTitle?: string;
    selectedUser: User | null;
    onClose: () => void;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
  
const DialogComponent: React.FC<SimpleDialogProps> = ({children, onClose, selectedUser, open, dialogTitle = ''}) => {
    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog fullScreen onClose={handleClose} open={open} TransitionComponent={Transition}>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                    >
                    <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    {dialogTitle}
                    </Typography>
                </Toolbar>
            </AppBar>
            {children}
        </Dialog>
    );
}

export default DialogComponent;
