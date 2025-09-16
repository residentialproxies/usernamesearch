export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <p className="text-muted-foreground mb-4">Last updated: January 2025</p>
      
      <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing and using UsernameSearch.io ("Service"), you agree to be bound by 
            these Terms of Service ("Terms"). If you disagree with any part of these terms, 
            you may not access the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">2. Description of Service</h2>
          <p>
            UsernameSearch.io provides username availability checking across multiple online 
            platforms. The Service includes both free and paid tiers with different features 
            and limitations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">3. User Accounts</h2>
          <p className="mb-3">When creating an account, you agree to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain the security of your password</li>
            <li>Accept responsibility for all activities under your account</li>
            <li>Notify us immediately of any unauthorized use</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">4. Acceptable Use</h2>
          <p className="mb-3">You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use the Service for any illegal or unauthorized purpose</li>
            <li>Violate any laws in your jurisdiction</li>
            <li>Attempt to bypass any rate limiting or access restrictions</li>
            <li>Interfere with or disrupt the Service or servers</li>
            <li>Attempt to gain unauthorized access to any part of the Service</li>
            <li>Use automated systems or software to extract data (scraping)</li>
            <li>Resell or redistribute the Service without permission</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">5. Payment Terms</h2>
          <p className="mb-3">For paid services:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>All payments are processed securely through NowPayments</li>
            <li>Prices are in USD and subject to change with notice</li>
            <li>API credits do not expire but are non-transferable</li>
            <li>Refunds are available within 30 days of purchase if unused</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">6. API Usage</h2>
          <p className="mb-3">If you use our API, you agree to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Not exceed your allocated rate limits</li>
            <li>Keep your API key confidential</li>
            <li>Not use the API for competing services</li>
            <li>Include proper attribution when displaying our data</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">7. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are owned by 
            UsernameSearch.io and are protected by international copyright, trademark, patent, 
            trade secret, and other intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">8. Third-Party Services</h2>
          <p>
            Our Service checks username availability on third-party platforms. We are not 
            affiliated with these platforms and cannot guarantee the accuracy or availability 
            of their services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">9. Disclaimer of Warranties</h2>
          <p>
            The Service is provided "as is" and "as available" without warranties of any kind, 
            either express or implied, including but not limited to merchantability, fitness 
            for a particular purpose, or non-infringement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">10. Limitation of Liability</h2>
          <p>
            In no event shall UsernameSearch.io, its directors, employees, partners, agents, 
            suppliers, or affiliates be liable for any indirect, incidental, special, 
            consequential, or punitive damages, including without limitation, loss of profits, 
            data, use, goodwill, or other intangible losses.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">11. Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless UsernameSearch.io from and 
            against any claims, damages, obligations, losses, liabilities, costs, or debt 
            arising from your use of the Service or violation of these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">12. Termination</h2>
          <p>
            We may terminate or suspend your account and access to the Service immediately, 
            without prior notice or liability, for any reason, including breach of these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">13. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. If we make material changes, 
            we will notify you via email or by posting a notice on our Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">14. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of 
            the United States, without regard to its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">15. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <ul className="list-none space-y-1 mt-3">
            <li>Email: legal@usernamesearch.io</li>
            <li>Website: https://usernamesearch.io/contact</li>
          </ul>
        </section>
      </div>
    </div>
  )
}