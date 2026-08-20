import{u as j,c as w,j as e,m as p,x as N,F as P}from"./index-DOuJ_ovg.js";import{a as i}from"./vendor-icons-CriASIIv.js";import"./vendor-recharts-CYJC7oJ0.js";import"./vendor-firebase-DmCYps50.js";import"./vendor-motion-D5iXEkfm.js";const W=({pageId:a,onBack:h})=>{var o,l,c,d;const{language:r}=j(),{getLegalPages:s}=w(),[t,x]=i.useState(null),[y,f]=i.useState(!0);if(i.useEffect(()=>{async function v(){try{const u=(await s()).find(_=>_.id===a);u&&x(u)}catch(m){console.error("Failed to load legal page:",m)}finally{f(!1)}}v()},[a,s]),y)return e.jsx("div",{className:"min-h-screen flex items-center justify-center bg-slate-50",children:e.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"})});const n={terms:{title_ar:"الشروط والأحكام",title_en:"Terms & Conditions",content_ar:`أهلاً بكم في متجر شركة نجوم دلتا للتجارة. باستخدامكم لهذا الموقع، فإنكم توافقون على الالتزام بالشروط التالية:
1. المنتجات: جميع الخضروات والفواكه والتمور تخضع للتوافر الموسمي.
2. الأسعار: الأسعار الموضحة بالريال السعودي وشاملة للضريبة حسب أنظمة المملكة.
3. الدفع: متاح عبر مدى، فيزا، ماستركارد، تابي، تمارا، والدفع عند الاستلام.
4. حقوق الملكية: جميع العلامات والشعارات مملوكة لشركة نجوم دلتا.`,content_en:`Welcome to Delta Stars Trading Store. By using this site, you agree to:
1. Products: All fruits, vegetables, and dates are subject to seasonal availability.
2. Prices: All prices are in SAR and VAT inclusive as per KSA regulations.
3. Payment: Available via Mada, Visa, Mastercard, Tabby, Tamara, and Cash on Delivery.
4. Ownership: All logos and content belong to Delta Stars Co.`},privacy:{title_ar:"سياسة الخصوصية",title_en:"Privacy Policy",content_ar:`نحن نلتزم بحماية بياناتكم الخاصة:
1. جمع البيانات: نقوم بجمع الاسم، العنوان، ورقم الهاتف لإتمام عمليات التوصيل.
2. حماية البيانات: نستخدم بروتوكولات أمان متقدمة لحماية معلوماتكم.
3. الجهات الخارجية: لا نشارك بياناتكم مع أي جهة خارجية إلا لغرض الشحن أو بموجب القانون.`,content_en:`We are committed to protecting your data:
1. Data Collection: We collect name, address, and phone number for delivery purposes.
2. Data Protection: We use advanced protocols to protect your information.
3. Third Parties: We do not share your data except for delivery purposes or as required by law.`},returns:{title_ar:"سياسة الاستبدال والاسترجاع",title_en:"Refund & Exchange Policy",content_ar:`بناءً على طبيعة المنتجات الغذائية الطازجة:
1. الفحص عند الاستلام: يجب على العميل فحص الطلب فور وصوله مع المندوب.
2. الاسترجاع: يحق للعميل رفض المنتجات غير المطابقة للمواصفات عند الاستلام فقط.
3. المنتجات التالفة: في حال وجود تلف غير ظاهر عند الاستلام، يرجى التواصل خلال ساعتين من التوصيل مع إرفاق صور.`,content_en:`Due to the fresh nature of produce:
1. Inspection: Customers must inspect the order upon delivery.
2. Returns: Customers can reject non-compliant items only at the time of delivery.
3. Damaged Items: For non-visible damage, contact support within 2 hours with photos.`},shipping:{title_ar:"سياسة الشحن والتوصيل",title_en:"Shipping & Delivery Policy",content_ar:`نحن نضمن وصول منتجاتنا طازجة ومبردة:
1. النطاق الجغرافي: نوصل لجميع مناطق المملكة (جدة، مكة، المدينة، الرياض، الدمام، أبها).
2. وقت التوصيل: خلال 24-48 ساعة من تأكيد الطلب.
3. مركبات مبردة: نستخدم أسطولاً مجهزاً بأحدث أنظمة التبريد العالمية.`,content_en:`We ensure fresh and refrigerated delivery:
1. Coverage: All KSA regions (Jeddah, Makkah, Madinah, Riyadh, Dammam, Abha).
2. Time: Within 24-48 hours of order confirmation.
3. Fleet: We use a refrigerated fleet with international cooling standards.`}},g=r==="ar"?(t==null?void 0:t.title_ar)||((o=n[a])==null?void 0:o.title_ar):(t==null?void 0:t.title_en)||((l=n[a])==null?void 0:l.title_en),b=r==="ar"?(t==null?void 0:t.content_ar)||((c=n[a])==null?void 0:c.content_ar):(t==null?void 0:t.content_en)||((d=n[a])==null?void 0:d.content_en);return e.jsx("div",{className:"min-h-screen bg-slate-50 pt-24 pb-12 font-tajawal",dir:r==="ar"?"rtl":"ltr",children:e.jsxs("div",{className:"container mx-auto px-6 max-w-4xl",children:[e.jsxs(p.button,{initial:{opacity:0,x:-10},animate:{opacity:1,x:0},onClick:h,className:"mb-8 flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all",children:[e.jsx(N,{className:`w-5 h-5 ${r==="ar"?"rotate-180":""}`}),r==="ar"?"العودة للرئيسية":"Back to Home"]}),e.jsxs(p.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:"bg-white p-10 md:p-16 rounded-[3rem] shadow-xl border border-gray-100",children:[e.jsxs("div",{className:"flex items-center gap-6 mb-10 border-b border-gray-100 pb-10",children:[e.jsx("div",{className:"w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary",children:e.jsx(P,{className:"w-8 h-8"})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-4xl font-black text-slate-900",children:g||"Legal Page"}),e.jsx("p",{className:"text-gray-400 font-bold uppercase tracking-widest text-xs mt-1",children:"Delta Stars Sovereign Policies"})]})]}),e.jsx("div",{className:"prose prose-lg max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap font-medium",children:b||(r==="ar"?"المحتوى غير متوفر حالياً.":"Content is not available currently.")})]})]})})};export{W as LegalPageView};
