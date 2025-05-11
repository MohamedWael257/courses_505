import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

const ResendTheCode = ({
  action,
  available,
  timerStart,
  setAvailableResetCode,
  setTimerStarted,
}: any) => {
  const [remainingTime, setRemainingTime] = useState(30);
  const t = useTranslations('');
  useEffect(() => {
    if (timerStart) {
      const countdownInterval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime > 0) {
            setAvailableResetCode(false);
            return prevTime - 1;
          } else {
            clearInterval(countdownInterval);
            setAvailableResetCode(true);
            setTimerStarted(false);
            return prevTime;
          }
        });
      }, 1000);

      return () => clearInterval(countdownInterval);
    } else {
      setRemainingTime(30);
    }
  }, [setAvailableResetCode, timerStart, setTimerStarted]);

  return (
    <>
      <div className="flex md:w-[435px] justify-between gap-2">
        <button
        disabled={!available}
        type="button"
          className={`font-[futuraMed,sans-serif] hover:underline ${
            !available ? 'text-[#2D2D2D]' : 'text-primaryLight'
          } ${available ? 'cursor-pointer' : 'cursor-not-allowed'}`}
          onClick={action}
        >
          {t('If you don’t receive code')}{' '}
          <span className="text-primary">{t('Resend')}</span>
        </button>

        <span
          className={`text-center font-bold ${
            !available ? 'text-[#777]' : 'text-primaryLight'
          }`}
        >
          {`${Math.floor(remainingTime / 60)}:${
            remainingTime % 60 < 10 ? '0' : ''
          }${remainingTime % 60}`}
        </span>
      </div>
    </>
  );
};

export default ResendTheCode;
