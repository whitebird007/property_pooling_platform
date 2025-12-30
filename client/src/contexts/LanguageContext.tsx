import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type Language = "en" | "ur";

interface Translations {
  [key: string]: {
    en: string;
    ur: string;
  };
}

// Core translations
const translations: Translations = {
  // Navigation
  "nav.home": { en: "Home", ur: "ہوم" },
  "nav.properties": { en: "Properties", ur: "جائیدادیں" },
  "nav.education": { en: "Learn", ur: "سیکھیں" },
  "nav.about": { en: "About", ur: "ہمارے بارے میں" },
  "nav.dashboard": { en: "Dashboard", ur: "ڈیش بورڈ" },
  "nav.portfolio": { en: "Portfolio", ur: "پورٹ فولیو" },
  "nav.marketplace": { en: "Marketplace", ur: "مارکیٹ پلیس" },
  "nav.wallet": { en: "Wallet", ur: "والیٹ" },
  "nav.login": { en: "Login", ur: "لاگ ان" },
  "nav.signup": { en: "Sign Up", ur: "سائن اپ" },
  
  // Hero Section
  "hero.title": { en: "Own Property, Together", ur: "مل کر جائیداد کے مالک بنیں" },
  "hero.subtitle": { en: "Invest in premium Pakistani real estate starting from just PKR 50,000. Shariah-compliant, transparent, and professionally managed.", ur: "صرف 50,000 روپے سے پاکستانی رئیل اسٹیٹ میں سرمایہ کاری کریں۔ شریعت کے مطابق، شفاف، اور پیشہ ورانہ طور پر منظم۔" },
  "hero.cta.explore": { en: "Explore Properties", ur: "جائیدادیں دیکھیں" },
  "hero.cta.learn": { en: "How It Works", ur: "یہ کیسے کام کرتا ہے" },
  
  // Property Cards
  "property.shares": { en: "shares available", ur: "حصص دستیاب" },
  "property.yield": { en: "Expected Yield", ur: "متوقع منافع" },
  "property.appreciation": { en: "Est. Appreciation", ur: "متوقع قدر میں اضافہ" },
  "property.minInvestment": { en: "Min. Investment", ur: "کم از کم سرمایہ کاری" },
  "property.invest": { en: "Invest Now", ur: "ابھی سرمایہ کاری کریں" },
  "property.details": { en: "View Details", ur: "تفصیلات دیکھیں" },
  
  // Investment Calculator
  "calculator.title": { en: "Investment Calculator", ur: "سرمایہ کاری کیلکولیٹر" },
  "calculator.amount": { en: "Investment Amount", ur: "سرمایہ کاری کی رقم" },
  "calculator.shares": { en: "Number of Shares", ur: "حصص کی تعداد" },
  "calculator.monthly": { en: "Est. Monthly Income", ur: "متوقع ماہانہ آمدنی" },
  "calculator.annual": { en: "Est. Annual Return", ur: "متوقع سالانہ منافع" },
  "calculator.fiveYear": { en: "5-Year Projection", ur: "5 سالہ تخمینہ" },
  
  // KYC
  "kyc.title": { en: "Verify Your Identity", ur: "اپنی شناخت کی تصدیق کریں" },
  "kyc.cnic": { en: "CNIC (Front & Back)", ur: "شناختی کارڈ (آگے اور پیچھے)" },
  "kyc.passport": { en: "Passport", ur: "پاسپورٹ" },
  "kyc.proofOfAddress": { en: "Proof of Address", ur: "پتے کا ثبوت" },
  "kyc.bankStatement": { en: "Bank Statement", ur: "بینک اسٹیٹمنٹ" },
  "kyc.status.pending": { en: "Pending Review", ur: "جائزہ زیر التوا" },
  "kyc.status.verified": { en: "Verified", ur: "تصدیق شدہ" },
  "kyc.status.rejected": { en: "Rejected", ur: "مسترد" },
  
  // Dashboard
  "dashboard.totalInvested": { en: "Total Invested", ur: "کل سرمایہ کاری" },
  "dashboard.currentValue": { en: "Current Value", ur: "موجودہ قیمت" },
  "dashboard.totalReturns": { en: "Total Returns", ur: "کل منافع" },
  "dashboard.properties": { en: "Properties Owned", ur: "زیر ملکیت جائیدادیں" },
  
  // Education
  "education.shariah.title": { en: "Shariah-Compliant Investing", ur: "شریعت کے مطابق سرمایہ کاری" },
  "education.shariah.desc": { en: "Learn about Diminishing Musharaka and how our platform ensures halal investment.", ur: "ڈمنشنگ مشارکہ کے بارے میں جانیں اور ہمارا پلیٹ فارم حلال سرمایہ کاری کو کیسے یقینی بناتا ہے۔" },
  "education.vs.title": { en: "Platform vs File System", ur: "پلیٹ فارم بمقابلہ فائل سسٹم" },
  "education.vs.desc": { en: "Understand why our formal ownership model is safer than informal plot files.", ur: "سمجھیں کہ ہمارا رسمی ملکیت کا ماڈل غیر رسمی پلاٹ فائلوں سے زیادہ محفوظ کیوں ہے۔" },
  "education.risk.title": { en: "Risk Disclosure", ur: "خطرے کا انکشاف" },
  "education.risk.desc": { en: "Understand the risks involved in real estate investment.", ur: "رئیل اسٹیٹ سرمایہ کاری میں شامل خطرات کو سمجھیں۔" },
  
  // Common
  "common.loading": { en: "Loading...", ur: "لوڈ ہو رہا ہے..." },
  "common.error": { en: "Something went wrong", ur: "کچھ غلط ہو گیا" },
  "common.retry": { en: "Try Again", ur: "دوبارہ کوشش کریں" },
  "common.save": { en: "Save", ur: "محفوظ کریں" },
  "common.cancel": { en: "Cancel", ur: "منسوخ کریں" },
  "common.submit": { en: "Submit", ur: "جمع کرائیں" },
  "common.search": { en: "Search", ur: "تلاش کریں" },
  "common.filter": { en: "Filter", ur: "فلٹر" },
  "common.sort": { en: "Sort", ur: "ترتیب" },
  "common.pkr": { en: "PKR", ur: "روپے" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  
  const t = useCallback((key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Missing translation for key: ${key}`);
      return key;
    }
    return translation[language];
  }, [language]);
  
  const isRTL = language === "ur";
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      <div dir={isRTL ? "rtl" : "ltr"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
