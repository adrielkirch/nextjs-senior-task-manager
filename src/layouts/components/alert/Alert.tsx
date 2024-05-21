  import React from 'react';
  import { Alert, AlertTitle, IconButton, Grid, AlertColor } from '@mui/material';
  import Close from 'mdi-material-ui/Close'

  export interface AlertProps {
    severity: string;
    onClose?: () => void;
    text?: string;
    visible?: boolean;
  }

  const DefaultAlert: React.FC<AlertProps> = (props) => {
    const { severity, onClose, text, visible } = props;

    return (
      visible ? (
        <Grid item xs={12} sx={{ mb: 3 }}>
          <Alert
            severity={severity as AlertColor}
            sx={{ '& a': { fontWeight: 400 } }}
            action={
              onClose && (
                <IconButton
                  size='small'
                  color='inherit'
                  aria-label='close'
                  onClick={onClose}
                >
                  <Close fontSize='inherit' />
                </IconButton>
              )
            }
          >
            {text && <AlertTitle>{text}</AlertTitle>}
            {/* <Link href='/' onClick={(e: SyntheticEvent) => e.preventDefault()}>Resend Confirmation</Link> */}
          </Alert>
        </Grid>
      ) : null
    );
  };


  export default DefaultAlert;
