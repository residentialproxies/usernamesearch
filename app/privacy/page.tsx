import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Username Search',
  description: 'Learn how Username Search collects, uses, and protects your personal information. Our privacy policy explains our data practices and your rights.',
  alternates: {
    canonical: 'https://usernamesearch.io/privacy',
  },
  openGraph: {
    title: 'Privacy Policy - Username Search',
    description: 'Learn how Username Search collects, uses, and protects your personal information.',
    url: 'https://usernamesearch.io/privacy',
    type: 'website',
  },
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-muted-foreground mb-4">Last updated: January 2025</p>
      
      <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
          <p className="mb-3">
            We collect information you provide directly to us, such as when you create an account, 
            make a purchase, or contact us for support.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Account information (email, name, password)</li>
            <li>Payment information (processed securely through NowPayments)</li>
            <li>Username search queries (not linked to personal information)</li>
            <li>Usage data and analytics (anonymous)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">2. How We Use Your Information</h2>
          <p className="mb-3">We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Send technical notices and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Monitor and analyze trends and usage</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">3. Information Sharing</h2>
          <p className="mb-3">
            We do not sell, trade, or rent your personal information to third parties. 
            We may share your information only in the following circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>With your consent</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights and prevent fraud</li>
            <li>With service providers who assist in our operations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your 
            personal information against unauthorized access, alteration, disclosure, or destruction. 
            However, no method of transmission over the Internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">5. Data Retention</h2>
          <p>
            We retain your information for as long as necessary to provide our services and 
            fulfill the purposes outlined in this policy. Search queries are automatically 
            deleted after 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">6. Your Rights</h2>
          <p className="mb-3">You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Export your data in a portable format</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">7. Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our service 
            and hold certain information. You can instruct your browser to refuse all cookies 
            or to indicate when a cookie is being sent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">8. Children's Privacy</h2>
          <p>
            Our service is not directed to individuals under the age of 13. We do not knowingly 
            collect personal information from children under 13.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">9. Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any 
            changes by posting the new Privacy Policy on this page and updating the 
            "Last updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <ul className="list-none space-y-1 mt-3">
            <li>Email: privacy@usernamesearch.io</li>
            <li>Website: https://usernamesearch.io/contact</li>
          </ul>
        </section>
      </div>
    </div>
  )
}