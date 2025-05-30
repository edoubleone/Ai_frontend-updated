"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"




const pricingPlans = [
	{
		name: "Starter",
		target: "For individuals",
		description: "Great for small team basic chat, CRM sync, & web/WhatsApp support.",
		monthlyPrice: 99,
		annualPrice: 79,
		icon: "/icon/stater.png",
		features: ["All analytics features", "Up to 250,000 tracked visits", "Normal support", "Up to 3 team members"],
		popular: false,
	},
	{
		name: "Pro",
		target: "For startups",
		description: "For growing brands Instagram, upsell flows, and better analytics.",
		monthlyPrice: 199,
		annualPrice: 159,
		icon: "/icon/pro.png",
		features: ["All analytics features", "Up to 1,000,000 tracked visits", "Premium support", "Up to 10 team members"],
		popular: true,
	},
	{
		name: "Enterprise",
		target: "For big companies",
		description: "Full power voice calls, smart routing, and custom integrations.",
		monthlyPrice: 399,
		annualPrice: 319,
		icon: "/icon/enterprise.png",
		features: [
			"All analytics features",
			"Up to 5,000,000 tracked visits",
			"Dedicated support",
			"Up to 50 team members",
		],
		popular: false,
	},
]

// Move the "Pro" plan to the center by rearranging
const reorderedPlans = [
	pricingPlans[0], // Starter
	pricingPlans[1], // Pro (center)
	pricingPlans[2], // Enterprise
]

export function PricingSection() {
	const [isAnnual, setIsAnnual] = useState(true)

	return (
		<section id="pricing" className="py-6 bg-white sm:py-16 md:py-20"> {/* Increased padding */}
			<div className="container px-4 mx-auto space-y-16 sm:px-6 lg:px-8"> {/* Added space between container elements */}
				{/* Header */}
				<div className="py-8 mb-16 text-center md:py-12"> {/* Increased header spacing */}
					<h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">Choose your plan</h2>
					<p className="mb-12 text-sm font-light text-gray-600">Flexible Plans for Every Business</p>

					{/* Billing Toggle */}
					<div className="flex items-center justify-center gap-4 mb-12">
						<span className={`text-lg font-medium ${!isAnnual ? "text-gray-900" : "text-gray-500"}`}>Monthly</span>
						<Switch checked={isAnnual} onCheckedChange={setIsAnnual} className="data-[state=checked]:bg-blue-600" />
						<span className={`text-lg font-medium ${isAnnual ? "text-gray-900" : "text-gray-500"}`}>Annually</span>
					</div>
				</div>

				{/* Pricing Cards */}
				<div className="grid max-w-6xl grid-cols-1 gap-8 pb-8 mx-auto lg:grid-cols-3 md:pb-12"> {/* Added bottom padding */}
					{reorderedPlans.map((plan) => (
						<div
							key={plan.name}
							className={`relative rounded-3xl p-8 transition-all duration-300 ${
								plan.popular
									? "bg-blue-600 text-white shadow-2xl scale-105 lg:scale-110 transform lg:-translate-y-12"
									: "bg-white border border-gray-200 hover:shadow-lg"
							}`}
						>
							{/* Popular Badge */}
							{plan.popular && (
								<div className="absolute -top-4 right-6">
									<Badge className="px-4 py-1 text-sm font-medium text-blue-600 bg-white shadow-lg">Popular</Badge>
								</div>
							)}

							{/* Plan Header */}
							<div className="mb-8">
								<div className="flex items-center gap-3 mb-4">
									<div
										className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${
											plan.popular ? "bg-white/20" : "bg-blue-50"
										}`}
									>
										 <img 
												src={plan.icon} 
												alt={`${plan.name} icon`}
												className="object-contain w-8 h-8"
											/>
									</div>
									<div>
										<div className={`text-sm ${plan.popular ? "text-blue-100" : "text-gray-500"}`}>{plan.target}</div>
										<div className={`text-xl font-semibold ${plan.popular ? "text-white" : "text-gray-900"}`}>
											{plan.name}
										</div>
									</div>
								</div>

								<p className={`text-sm ${plan.popular ? "text-blue-100" : "text-gray-600"} mb-6`}>
									{plan.description}
								</p>

								{/* Price */}
								<div className="mb-6">
									<div className="flex items-baseline gap-1">
										<span className={`text-4xl font-bold ${plan.popular ? "text-white" : "text-gray-900"}`}>
											${isAnnual ? plan.annualPrice : plan.monthlyPrice}
										</span>
										<span className={`text-lg ${plan.popular ? "text-blue-100" : "text-gray-500"}`}>/monthly</span>
									</div>
								</div>
							</div>

							{/* Features */}
							<div className="mb-8">
								<h4 className={`text-lg font-medium mb-4 ${plan.popular ? "text-white" : "text-gray-900"}`}>
									What's included
								</h4>
								<ul className="space-y-3">
									{plan.features.map((feature, featureIndex) => (
										<li key={featureIndex} className="flex items-center gap-3">
											<div
												className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
													plan.popular ? "bg-white/20" : "bg-blue-100"
												}`}
											>
												<Check className={`w-3 h-3 ${plan.popular ? "text-white" : "text-blue-600"}`} />
											</div>
											<span className={`text-sm ${plan.popular ? "text-blue-100" : "text-gray-600"}`}>{feature}</span>
										</li>
									))}
								</ul>
							</div>

							{/* CTA Button */}
							<Button
								className={`w-full py-3 font-medium transition-all duration-300 ${
									plan.popular
										? "bg-white text-blue-600 hover:bg-gray-100"
										: "bg-blue-600 text-white hover:bg-blue-700"
								}`}
							>
								Get started
							</Button>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
