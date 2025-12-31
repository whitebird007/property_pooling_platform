import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { RefreshCw, Clock, CreditCard, AlertTriangle, CheckCircle, XCircle, HelpCircle, Mail } from "lucide-react";

export default function RefundPolicy() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 pt-24 pb-16">
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-purple-300 mb-4">
              <RefreshCw className="w-5 h-5" />
              <span className="text-sm font-medium">Legal Document</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {language === "ur" ? "رقم واپسی کی پالیسی" : "Refund Policy"}
            </h1>
            <p className="text-xl text-purple-200">
              {language === "ur" 
                ? "ہماری رقم واپسی اور منسوخی کی پالیسی کو سمجھیں"
                : "Understand our refund and cancellation policies"
              }
            </p>
            <p className="text-purple-300 mt-4 text-sm">
              Last updated: December 31, 2024
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8">
            <p className="text-gray-700 leading-relaxed">
              At PropertyPool, we strive to provide transparent and fair policies regarding refunds and cancellations. 
              This policy outlines the circumstances under which refunds may be issued and the process for requesting them. 
              Please read this policy carefully before making any investments or deposits on our platform.
            </p>
          </div>

          {/* Refund Eligibility Table */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Refund Eligibility Summary
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Scenario</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Refundable</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Timeline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-3 px-4 text-gray-700">Wallet deposit (unused, within 7 days)</td>
                    <td className="py-3 px-4 text-center"><CheckCircle className="w-5 h-5 text-green-600 mx-auto" /></td>
                    <td className="py-3 px-4 text-gray-600">5-7 business days</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-700">Failed property acquisition</td>
                    <td className="py-3 px-4 text-center"><CheckCircle className="w-5 h-5 text-green-600 mx-auto" /></td>
                    <td className="py-3 px-4 text-gray-600">30 business days</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-700">Property funding goal not met</td>
                    <td className="py-3 px-4 text-center"><CheckCircle className="w-5 h-5 text-green-600 mx-auto" /></td>
                    <td className="py-3 px-4 text-gray-600">14 business days</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-700">Technical error (duplicate charge)</td>
                    <td className="py-3 px-4 text-center"><CheckCircle className="w-5 h-5 text-green-600 mx-auto" /></td>
                    <td className="py-3 px-4 text-gray-600">3-5 business days</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-700">Completed investment</td>
                    <td className="py-3 px-4 text-center"><XCircle className="w-5 h-5 text-red-500 mx-auto" /></td>
                    <td className="py-3 px-4 text-gray-600">N/A - Sell on marketplace</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-700">Platform fees</td>
                    <td className="py-3 px-4 text-center"><XCircle className="w-5 h-5 text-red-500 mx-auto" /></td>
                    <td className="py-3 px-4 text-gray-600">Non-refundable</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-700">Change of mind after funding closes</td>
                    <td className="py-3 px-4 text-center"><XCircle className="w-5 h-5 text-red-500 mx-auto" /></td>
                    <td className="py-3 px-4 text-gray-600">N/A</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Wallet Deposits */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">1. Wallet Deposit Refunds</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                Funds deposited into your PropertyPool wallet can be withdrawn under the following conditions:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <span><strong>Within 7 days:</strong> Full refund available if no investments have been made</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <span><strong>After 7 days:</strong> Withdrawal available minus any applicable bank transfer fees</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <span><strong>With active investments:</strong> Only uninvested balance can be withdrawn</span>
                </li>
              </ul>
              <p className="text-sm text-gray-500 mt-4">
                Note: Bank transfer fees (typically PKR 100-500) may apply depending on your bank.
              </p>
            </div>
          </div>

          {/* Investment Refunds */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">2. Investment Refunds</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <h3 className="font-semibold text-gray-800">During Funding Period</h3>
              <p>
                While a property is still in its funding phase, you may cancel your investment commitment and receive 
                a full refund to your wallet. This option is available until the funding period closes.
              </p>
              
              <h3 className="font-semibold text-gray-800 mt-6">After Funding Closes</h3>
              <p>
                Once the funding period closes and the property acquisition process begins, investment commitments 
                become binding and cannot be cancelled. If you wish to exit your investment after this point, 
                you must list your shares for sale on the secondary marketplace.
              </p>
              
              <h3 className="font-semibold text-gray-800 mt-6">Failed Property Acquisition</h3>
              <p>
                In the rare event that a property acquisition fails (due to title issues, seller withdrawal, or 
                regulatory problems), all invested funds will be returned to investors within 30 business days. 
                The platform fee will also be refunded in such cases.
              </p>
            </div>
          </div>

          {/* Processing Times */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">3. Refund Processing Times</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { method: "Bank Transfer", time: "5-7 business days", note: "Standard processing" },
                { method: "JazzCash", time: "1-3 business days", note: "Mobile wallet" },
                { method: "Easypaisa", time: "1-3 business days", note: "Mobile wallet" },
                { method: "Credit Card", time: "7-14 business days", note: "Depends on issuing bank" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="font-semibold text-gray-900">{item.method}</p>
                  <p className="text-purple-600 font-medium">{item.time}</p>
                  <p className="text-sm text-gray-500">{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Non-Refundable Items */}
          <div className="bg-red-50 rounded-2xl p-8 border border-red-200 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="w-6 h-6 text-red-600" />
              <h2 className="text-xl font-bold text-red-800">4. Non-Refundable Items</h2>
            </div>
            <ul className="space-y-3 text-red-900">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                <span><strong>Platform fees (2%):</strong> Charged at the time of investment, non-refundable once investment is confirmed</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                <span><strong>Transaction fees:</strong> Bank charges and payment processing fees</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                <span><strong>Secondary market trading fees:</strong> 1% fee on marketplace transactions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                <span><strong>Completed investments:</strong> Cannot be refunded; must be sold on marketplace</span>
              </li>
            </ul>
          </div>

          {/* How to Request */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-amber-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">5. How to Request a Refund</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold flex-shrink-0">1</span>
                  <div>
                    <p className="font-semibold text-gray-900">Log into your account</p>
                    <p className="text-gray-600">Navigate to Wallet → Transaction History</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold flex-shrink-0">2</span>
                  <div>
                    <p className="font-semibold text-gray-900">Select the transaction</p>
                    <p className="text-gray-600">Click on the transaction you wish to refund</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold flex-shrink-0">3</span>
                  <div>
                    <p className="font-semibold text-gray-900">Submit refund request</p>
                    <p className="text-gray-600">Click "Request Refund" and provide a reason</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold flex-shrink-0">4</span>
                  <div>
                    <p className="font-semibold text-gray-900">Wait for review</p>
                    <p className="text-gray-600">Our team will review and process within 3-5 business days</p>
                  </div>
                </li>
              </ol>
              <p className="text-sm text-gray-500 mt-4">
                Alternatively, you can email refunds@propertypool.pk with your account details and transaction ID.
              </p>
            </div>
          </div>

          {/* Disputes */}
          <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
              <h2 className="text-xl font-bold text-amber-800">6. Dispute Resolution</h2>
            </div>
            <p className="text-amber-900 leading-relaxed mb-4">
              If you disagree with a refund decision, you may escalate the matter through our dispute resolution process:
            </p>
            <ol className="space-y-2 text-amber-900">
              <li>1. Contact our customer support team within 14 days of the decision</li>
              <li>2. Provide additional documentation supporting your claim</li>
              <li>3. A senior manager will review your case within 7 business days</li>
              <li>4. If still unresolved, you may request mediation through SECP's investor grievance mechanism</li>
            </ol>
          </div>

          {/* Contact */}
          <div className="bg-purple-50 rounded-2xl p-8 border border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-bold text-purple-900">Need Help?</h2>
            </div>
            <p className="text-purple-800 leading-relaxed mb-4">
              For refund-related inquiries, please contact our support team:
            </p>
            <div className="space-y-2 text-purple-800">
              <p><strong>Email:</strong> refunds@propertypool.pk</p>
              <p><strong>Phone:</strong> +92 300 123 4567 (Mon-Sat, 9 AM - 6 PM)</p>
              <p><strong>Response Time:</strong> Within 24 hours on business days</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
