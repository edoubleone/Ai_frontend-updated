"use client"

import { ArrowRight, Star, TrendingUp, Users, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

const stats = [
	{
		value: "1k",
		label: "Active users",
		icon: Users,
		color: "text-blue-600",
	},
	{
		value: "500",
		label: "New users per month",
		icon: TrendingUp,
		color: "text-green-600",
	},
	{
		value: "98%",
		label: "Satisfied Customers",
		icon: Heart,
		color: "text-red-600",
	},
]

const userAvatars = [
	{
		src: "/icon/Ellipse 2 (2).png",
		alt: "Sarah Johnson",
		fallback: "SJ",
		name: "Sarah J.",
	},
	{
		src: "/icon/Ellipse 3.png",
		alt: "Mike Chen",
		fallback: "MC",
		name: "Mike C.",
	},
	{
		src: "/icon/Ellipse 4.png",
		alt: "Emma Davis",
		fallback: "ED",
		name: "Emma D.",
	},
]

export function EnhancedTestimonialsSection() {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true)
				}
			},
			{ threshold: 0.1 },
		)

		const element = document.getElementById("testimonials")
		if (element) {
			observer.observe(element)
		}

		return () => {
			if (element) {
				observer.unobserve(element)
			}
		}
	}, [])

	return (
		<section id="testimonials" className="py-4 bg-white sm:py-12">
			<div className="container px-4 mx-auto sm:px-6 lg:px-8">
				<div className="grid items-center grid-cols-1 gap-16 lg:grid-cols-2">
					{/* Left Side - Trust Indicators & Stats */}
					<div
						className={`space-y-12 transition-all duration-1000 ${
							isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
						}`}
					>
						{/* Trust Header */}
						<div>
							<h2 className="mb-8 text-xl font-light">Trusted by many across the world</h2>

							{/* Reviews Section */}
							<div className="flex items-center gap-4 p-4 mb-8 bg-white ">
								<div className="flex -space-x-2">
									{userAvatars.map((user, index) => (
										<Avatar
											key={index}
											className="w-10 h-10 transition-transform border-2 border-white cursor-pointer hover:scale-110"
											title={user.name}
										>
											<AvatarImage src={user.src || "/placeholder.svg"} alt={user.alt} />
											<AvatarFallback className="text-xl font-light text-white bg-gradient-to-br from-blue-500 to-purple-600">
												{user.fallback}
											</AvatarFallback>
										</Avatar>
									))}
								</div>
								<div className="p-0 m-0 ">
									<div className="flex items-center gap-2 mb-1">
										<div className="flex items-center gap-1">
											{[...Array(5)].map((_, i) => (
												<Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
											))}
										</div>
										<span className="text-2xl font-bold text-blue-600">4.8k</span>
										<span className="font-medium text-blue-600">Reviews</span>
									</div>
									<p className="text-sm text-gray-600">Join our digital community</p>
								</div>
							</div>
						</div>

						{/* Statistics */}
						<div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
							{stats.map((stat, index) => (
								<div
									key={index}
									className={`transition-all duration-500 transform ${
										isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
									}`}
									style={{ transitionDelay: `${index * 200}ms` }}
								>
									<div className="flex items-center gap-3 mb-3">
										<div className={`p-2 rounded-lg bg-gray-50 ${stat.color}`}>
											{/* <stat.icon className="w-5 h-5" /> */}
										</div>
									</div>
									<div className="mb-2 text-xl text-3xl font-bold sm:text-4xl">{stat.value}</div>
									<p className="text-sm font-light ">{stat.label}</p>
								</div>
							))}
						</div>
					</div>

					{/* Right Side - Value Proposition */}
					<div
						className={`space-y-8 transition-all duration-1000 delay-300 ${
							isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
						}`}
					>
						<div>
							<h2 className="mb-6 text-xl font-medium leading-tight  sm:text-4xl lg:text-5xl">
								Why Choose Agentic AI ?
							</h2>

							<p className="mb-8 text-sm font-light leading-relaxed">
								Because it works. Because it saves time. It feels like having another teammate who never sleeps,
								never forgets to follow up, and always keeps your sales moving.
							</p>

							<Button
								asChild
								variant="link"
								className="h-auto p-0 text-sm font-light text-blue-600 hover:text-blue-700 group"
							>
								<Link to="/about" className="flex items-center gap-2 text-sm font-light">
									Learn More
									<ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
