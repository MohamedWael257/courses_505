import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

function CustomNavigation({ swiperRef }: any) {
  const onPrev = () => swiperRef.current?.slidePrev();
  const onNext = () => swiperRef.current?.slideNext();

  return (
    <div
      className={`flex rtl:flex-row-reverse flex-row justify-end items-center gap-2 mb-4 custom-arrows`}
    >
      <button
        onClick={onNext}
        className="border rounded-full w-8 h-8 lg:w-12 lg:h-12 shadow-md flex justify-center items-center arrow-btn"
      >
        <MdArrowBackIos size={12} color="#E7B739" />
      </button>

      <button
        onClick={onPrev}
        className="border rounded-full  w-8 h-8 lg:w-12 lg:h-12 shadow-md flex justify-center items-center arrow-btn"
      >
        <MdArrowForwardIos size={12} color="#E7B739" />
      </button>
    </div>
  );
}

export default CustomNavigation;
