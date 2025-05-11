import React from "react";
import RequestQuote from "@/components/requestQuote/RequestQuote";
import Subscription from "@/components/Subscription";
import CustomCard from "@/shared/card/CustomCard";
import Contact from "@/components/contact/Contact";

export default function page() {
  return (
    <>
      <CustomCard
        title="تواصل معنا"
        description={`
        اعثر على الإجابات الأكثر شيوعًا حول التسجيل، الدورات، الدفع، الشهادات، والانضمام كمدرّب — كل ما تحتاج معرفته في مكان واحد لتبدأ تجربتك بثقة.
        `}
      />
      <Contact settings={[]} />
      <Subscription />
    </>
  );
}
