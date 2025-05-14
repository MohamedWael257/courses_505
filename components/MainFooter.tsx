/* eslint-disable react-hooks/exhaustive-deps */
import FooterIndex from "@/shared/footer/MainFooter";
export default async function Footer({ settings }: any) {
  return (
    <div className=" overflow-x-hidden">
      {/* {  settings && ( */}
      <FooterIndex settings={settings} />
      {/* )} */}
    </div>
  );
}
