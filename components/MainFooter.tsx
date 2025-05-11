/* eslint-disable react-hooks/exhaustive-deps */
import FooterIndex from "@/shared/footer/MainFooter";
export default async function Footer({ categories, settings, error }: any) {
  if (error) {
    return <>{error}</>;
  }
  return (
    <div className=" overflow-x-hidden">
      {categories && settings && (
        <FooterIndex categories={categories} settings={settings} />
      )}
    </div>
  );
}
