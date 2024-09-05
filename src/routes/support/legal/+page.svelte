<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
</script>

<div class="container mx-auto py-10">
	<Card>
		<CardHeader>
			<CardTitle class="text-3xl">Terms and Conditions</CardTitle>
			<CardDescription
				>Please read these terms and conditions carefully before using our service</CardDescription
			>
		</CardHeader>
		<CardContent>
			<ScrollArea class="h-[600px] w-full rounded-md border p-4">
				<h2 class="mb-4 text-2xl font-semibold">1. Acceptance of Terms</h2>
				<p class="mb-6">
					By accessing and using this service, you accept and agree to be bound by the terms and
					provision of this agreement. If you do not agree to abide by the above, please do not use
					this service.
				</p>

				<h2 class="mb-4 text-2xl font-semibold">2. Use of Service</h2>
				<p class="mb-6">
					You agree to use this service for lawful purposes only and in a way that does not infringe
					the rights of, restrict or inhibit anyone else's use and enjoyment of the service.
					Prohibited behavior includes harassing or causing distress or inconvenience to any other
					user, transmitting obscene or offensive content or disrupting the normal flow of dialogue
					within our service.
				</p>

				<h2 class="mb-4 text-2xl font-semibold">3. Modifications to Service</h2>
				<p class="mb-6">
					We reserve the right to modify or discontinue, temporarily or permanently, the service (or
					any part thereof) with or without notice. You agree that we shall not be liable to you or
					to any third party for any modification, suspension or discontinuance of the service.
				</p>

				<h2 class="mb-4 text-2xl font-semibold">4. Termination</h2>
				<p class="mb-6">
					We may terminate or suspend your access to the service immediately, without prior notice
					or liability, for any reason whatsoever, including without limitation if you breach the
					Terms. Upon termination, your right to use the service will immediately cease.
				</p>

				<h2 class="mb-4 text-2xl font-semibold">5. Limitation of Liability</h2>
				<p class="mb-6">
					In no event shall we, nor our directors, employees, partners, agents, suppliers, or
					affiliates, be liable for any indirect, incidental, special, consequential or punitive
					damages, including without limitation, loss of profits, data, use, goodwill, or other
					intangible losses, resulting from your access to or use of or inability to access or use
					the service.
				</p>

				<h2 class="mb-4 text-2xl font-semibold">6. Governing Law</h2>
				<p class="mb-6">
					These Terms shall be governed and construed in accordance with the laws of [Your
					Country/State], without regard to its conflict of law provisions.
				</p>

				<h2 class="mb-4 text-2xl font-semibold">7. Changes to Terms</h2>
				<p class="mb-6">
					We reserve the right, at our sole discretion, to modify or replace these Terms at any
					time. If a revision is material we will provide at least 30 days' notice prior to any new
					terms taking effect. What constitutes a material change will be determined at our sole
					discretion.
				</p>

				<h2 class="mb-4 text-2xl font-semibold">8. Contact Us</h2>
				<p>
					If you have any questions about these Terms, please contact us at [Your Contact
					Information].
				</p>
			</ScrollArea>
		</CardContent>
	</Card>
	<Card class="mt-4">
		<CardHeader>
			<CardTitle class="text-3xl">Privacy Policy</CardTitle>
			<CardDescription
				>Learn how we collect, use, and protect your personal information</CardDescription
			>
		</CardHeader>
		<CardContent>
			<ScrollArea class="h-[600px] w-full rounded-md border p-4">
				<h2 class="mb-4 text-2xl font-semibold">1. Information We Collect</h2>
				<p class="mb-6">
					We collect information you provide directly to us when you create an account, use our
					services, or communicate with us. This may include your name, email address, phone number,
					and any other information you choose to provide.
				</p>

				<h2 class="mb-4 text-2xl font-semibold">2. How We Use Your Information</h2>
				<p class="mb-6">
					We use the information we collect to provide, maintain, and improve our services, to
					develop new ones, and to protect our company and our users. This includes using the data
					to personalize and improve your experience, to communicate with you about our services,
					and for internal purposes such as auditing and data analysis.
				</p>

				<h2 class="mb-4 text-2xl font-semibold">3. Information Sharing and Disclosure</h2>
				<p class="mb-6">
					We do not share personal information with companies, organizations, or individuals outside
					of our company except in the following cases: with your consent, for legal reasons, or to
					protect rights, property, or safety.
				</p>

				<h2 class="mb-4 text-2xl font-semibold">4. Data Security</h2>
				<p class="mb-6">
					We work hard to protect our users from unauthorized access to or unauthorized alteration,
					disclosure, or destruction of information we hold. This includes regular review of our
					information collection, storage, and processing practices, and restricted access to
					personal information.
				</p>

				<h2 class="mb-4 text-2xl font-semibold">5. Your Choices</h2>
				<p class="mb-6">
					You may update, correct, or delete your account information at any time by logging into
					your online account or by contacting us. You can also opt out of receiving promotional
					communications from us by following the instructions in those messages.
				</p>

				<h2 class="mb-4 text-2xl font-semibold">6. Children's Privacy</h2>
				<p class="mb-6">
					Our services are not directed to children under 13, and we do not knowingly collect
					personal information from children under 13. If we learn we have collected personal
					information of a child under 13, we will delete such information as quickly as possible.
				</p>

				<h2 class="mb-4 text-2xl font-semibold">7. Changes to This Policy</h2>
				<p class="mb-6">
					We may change this privacy policy from time to time. We will post any privacy policy
					changes on this page and, if the changes are significant, we will provide a more prominent
					notice.
				</p>

				<h2 class="mb-4 text-2xl font-semibold">8. Contact Us</h2>
				<p>
					If you have any questions or concerns about our privacy policy, please contact us at [Your
					Contact Information].
				</p>
			</ScrollArea>
		</CardContent>
	</Card>
</div>
