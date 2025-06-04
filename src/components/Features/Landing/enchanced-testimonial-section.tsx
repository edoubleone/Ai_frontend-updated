"use client"

import { ArrowRight, TrendingUp, Users, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

const stats = [
	{
		value: "150k",
		label: "Active users",
		icon: Users,
		color: "text-blue-600",
	},
	{
		value: "50k",
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
		<section id="testimonials" className="bg-white py-7 sm:py-12">
			<div className="w-full px-5 md:px-10 lg:px-0">
				<div className="grid grid-cols-1 md:gap-7 lg:items-end lg:gap-x-32 md:grid-cols-2">
					{/* Left Side - Trust Indicators & Stats */}
					<div
						className={`transition-all -mt-[80px] md:mt-0 items-center duration-500 flex flex-col gap-y-6 md:gap-y-0 md:items-start ${
							isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
						}`}
					>
						{/* Trust Header */}
						<div className="shadow-lg rounded-[10px] md:rounded-none md:shadow-none w-full bg-white flex items-center md:items-start flex-col py-3 md:py-0 mt-5 lg:mt-0">
							<h2 className="text-xl font-light lg:font-bold">Trusted by many across the world</h2>

							{/* Reviews Section */}
							<div className="flex items-center gap-4 py-4 md:mb-8 ">
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
									<div className="flex items-center gap-1">
										<span className="text-2xl font-bold text-blue-600">4.8k</span>
										<span className="font-medium text-blue-600">Reviews</span>
									</div>
									<p className="text-sm text-gray-600">Join our digital community</p>
								</div>
							</div>
						</div>

						{/* Statistics */}
						<div className="flex justify-center w-full gap-3 md:justify-between md:gap-x-6">
							{stats.map((stat, index) => (
								<div
									key={index}
									className={`transition-all duration-500 flex flex-col items-center text-center transform ${
										isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
									}`}
									style={{ transitionDelay: `${index * 200}ms` }}
								>
									<h3 className="text-4xl font-bold md:text-5xl lg:text-7xl">{stat.value}</h3>
									<p className="text-sm font-light md:text-md ">{stat.label}</p>
								</div>
							))}
						</div>
					</div>

					{/* Right Side - Value Proposition */}
					<div
						className={`flex flex-col gap-y-6 mt-14 md:mt-0 transition-all duration-1000 delay-300 ${
							isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
						}`}
					>
						<div className="flex flex-col items-start gap-y-4">
							<h2 className="text-3xl font-bold leading-tight  md:text-4xl lg:text-[46px]">
								Why Choose Agentic AI?
							</h2>

							<p className="font-light text-md">
								Because it works. Because it saves time. It feels like having another teammate who never sleeps,
								never forgets to follow up, and always keeps your sales moving.
							</p>

							<Button
								asChild
								variant="link"
								className="h-auto p-0 text-sm font-light text-blue-600 hover:text-blue-700 group"
							>
								<Link to="/about" className="flex gap-2 text-sm font-light">
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
