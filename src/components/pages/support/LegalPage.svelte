<script lang="ts">
	import PolicySection from './PolicySection.svelte';

	const termsAndConditions = {
		title: 'Terms and Conditions',
		description: 'Please read these terms and conditions carefully before using our service',
		content: [
			{
				heading: '1. Acceptance of Terms',
				text: 'By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
			},
			{
				heading: '2. Use of Service',
				text: "You agree to use this service for lawful purposes only and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the service. Prohibited behavior includes harassing or causing distress or inconvenience to any other user, transmitting obscene or offensive content or disrupting the normal flow of dialogue within our service."
			},
			{
				heading: '3. Modifications to Service',
				text: 'We reserve the right to modify or discontinue, temporarily or permanently, the service (or any part thereof) with or without notice. You agree that we shall not be liable to you or to any third party for any modification, suspension or discontinuance of the service.'
			},
			{
				heading: '4. Termination',
				text: 'We may terminate or suspend your access to the service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the service will immediately cease.'
			},
			{
				heading: '5. Limitation of Liability',
				text: 'In no event shall we, nor our directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.'
			},
			{
				heading: '6. Governing Law',
				text: 'These Terms shall be governed and construed in accordance with the laws of United States of America, without regard to its conflict of law provisions.'
			},
			{
				heading: '7. Changes to Terms',
				text: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion."
			},
			{
				heading: '8. Contact Us',
				text: 'If you have any questions about these Terms, please contact us at mcthaydt@gmail.com.'
			}
		]
	};

	const privacyPolicy = {
		title: 'Privacy Policy',
		description: 'Learn how we collect, use, and protect your personal information',
		content: [
			{
				heading: '1. Information We Collect',
				text: 'We collect information you provide directly to us when you create an account, use our services, or communicate with us. This may include your name, email address, phone number, and any other information you choose to provide.'
			},
			{
				heading: '2. How We Use Your Information',
				text: 'We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect our company and our users. This includes using the data to personalize and improve your experience, to communicate with you about our services, and for internal purposes such as auditing and data analysis.'
			},
			{
				heading: '3. Information Sharing and Disclosure',
				text: 'We do not share personal information with companies, organizations, or individuals outside of our company except in the following cases: with your consent, for legal reasons, or to protect rights, property, or safety.'
			},
			{
				heading: '4. Data Security',
				text: 'We work hard to protect our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold. This includes regular review of our information collection, storage, and processing practices, and restricted access to personal information.'
			},
			{
				heading: '5. Your Choices',
				text: 'You may update, correct, or delete your account information at any time by logging into your online account or by contacting us. You can also opt out of receiving promotional communications from us by following the instructions in those messages.'
			},
			{
				heading: "6. Children's Privacy",
				text: 'Our services are not directed to children under 13, and we do not knowingly collect personal information from children under 13. If we learn we have collected personal information of a child under 13, we will delete such information as quickly as possible.'
			},
			{
				heading: '7. Changes to This Policy',
				text: 'We may change this privacy policy from time to time. We will post any privacy policy changes on this page and, if the changes are significant, we will provide a more prominent notice.'
			},
			{
				heading: '8. Contact Us',
				text: 'If you have any questions or concerns about our privacy policy, please contact us at mcthaydt@gmail.com.'
			}
		]
	};

	const cookiesNotice = {
		title: 'Cookies Notice',
		description: 'Learn how we use cookies and similar technologies on our games asset store',
		content: [
			{
				heading: '1. What are Cookies?',
				text: 'Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience and allow certain features to function properly.'
			},
			{
				heading: '2. How We Use Cookies',
				text: 'We use cookies to remember your preferences, understand how you use our games asset store, and improve our services. This includes personalizing content, providing secure login sessions, and analyzing site traffic.'
			},
			{
				heading: '3. Types of Cookies We Use',
				text: 'We use both session cookies (which expire when you close your browser) and persistent cookies (which stay on your device for a set period). These include essential cookies for site functionality, performance cookies for analytics, and targeting cookies for personalized content.'
			},
			{
				heading: '4. Third-Party Cookies',
				text: 'Some cookies may be set by third-party services we use, such as analytics tools or payment processors. These cookies help us understand user behavior and process transactions securely.'
			},
			{
				heading: '5. Managing Cookies',
				text: 'You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. However, if you do this, you may have to manually adjust some preferences every time you visit our site.'
			},
			{
				heading: '6. Cookies and Game Assets',
				text: 'Cookies help us provide a seamless experience when browsing, downloading, and managing game assets for open source game engines. They allow us to remember your asset library, download history, and preferences.'
			},
			{
				heading: '7. Updates to This Notice',
				text: 'We may update this Cookies Notice from time to time. We will notify you of any significant changes by posting a prominent notice on our website.'
			},
			{
				heading: '8. Contact Us',
				text: 'If you have any questions about our use of cookies, please contact us at mcthaydt@gmail.com.'
			}
		]
	};
</script>

<div class="container mx-auto py-10">
	<PolicySection {...termsAndConditions} />
	<PolicySection {...privacyPolicy} />
	<PolicySection {...cookiesNotice} />
</div>
