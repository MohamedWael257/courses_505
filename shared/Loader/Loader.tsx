// import classes from "./loader.module.scss";
import "@/styles/loader.scss"
export default function Loader() {
  return (
    <div className="h-screen w-screen flex justify-center items-center  fixed top-0 left-0 z-[99999] bg-[#fafafa] ">
      {/* className="screen_loader h-full relative inset-0 bg-transparent dark:bg-[#060818] z-[1] grid place-content-center animate__animated" */}
      {/* <span className={classes.loader}></span> */}
      <div className="loader">
        <div className="loader__balls">
          <div className="loader__balls__group">
            <div className="ball item1" />
            <div className="ball item1" />
            <div className="ball item1" />
          </div>
          <div className="loader__balls__group">
            <div className="ball item2" />
            <div className="ball item2" />
            <div className="ball item2" />
          </div>
          <div className="loader__balls__group">
            <div className="ball item3" />
            <div className="ball item3" />
            <div className="ball item3" />
          </div>
        </div>
      </div>
      {/* <Image src={logo} alt=" w-12 h-12 mx-auto my-4" /> */}
    </div>
  );
}
