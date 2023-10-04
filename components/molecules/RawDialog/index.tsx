import * as React from 'react';
import { Dialog , Slide} from '@mui/material';

type ConfirmDialogProps = {
  isOpen?: boolean;
  children: React.ReactElement;
};

const Transition = React.forwardRef(function Transition(
  props: any,
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RawDialog({
  isOpen = false,
  children,
}: ConfirmDialogProps) {
  return (
    <div>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={(_, reason) => {
          if (reason !== 'backdropClick') {
            console.log('close')
          }
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        {children}
      </Dialog>
    </div>
  );
}