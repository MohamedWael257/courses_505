import React, { useEffect } from 'react';
import classes from './CustomModal.module.css';
import { Button } from '../ui/button';
import SecondaryButton from '../buttons/SecondaryButton';
import ResetAll from '@/assets/icons/ResetAll';
import { useTranslations } from 'next-intl';

const Modal = ({ title, handleResetForm, isOpen, onClose, children }: any) => {
  const t = useTranslations('Index');
  useEffect(() => {
    // Toggle the body's overflow style based on the modal's open state
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = isOpen ? 'hidden' : originalStyle;

    // Cleanup function to reset the overflow style
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const stopPropagation = (e: any) => {
    e.stopPropagation();
  };

  return (
    <div className={classes['modal-backdrop']} onClick={onClose}>
      <div className={classes['modal-content']} onClick={stopPropagation}>
        <div className="w-full flex justify-between pe-6">
          <p className="text-[20px] font-bold">{title}</p>
          <button onClick={onClose} className={classes['close-button']}>
            X
          </button>
        </div>
        <div className={classes['modal-content-body']}>{children}</div>
        <div className="pt-6 grid grid-cols-3 gap-6">
          <SecondaryButton
            title="Show All Results"
            type="submit"
            className="!w-full justify-center col-span-2"
          />

          <button
            type="button"
            onClick={handleResetForm}
            className="flex  items-center justify-center gap-2"
          >
            <ResetAll />
            <span>{t('reset all')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
