
export type paymentPlan = {
    planType: string;
    targetAudience: string;
    planSubDuration: "per month" | "per year";
    subscriptionStatus: "current plan" | "Switch plan";
    planPrice: string;
    featuresInfo: string;
    planFeatures: string[];
}

export const paymentPlanData: paymentPlan[] = [
    {
        planType: "Silver",
        targetAudience: "Basic access",
        planPrice: "₦10,000",
        planSubDuration: "per month",
        subscriptionStatus: "current plan",
        featuresInfo: "Everything in our free plan plus",
        planFeatures: [
            "Lorem Ipsum",
            "Lorem Ipsum",
            "Lorem Ipsum",
            "Lorem Ipsum"
        ]
    },
    {
        planType: "Gold",
        targetAudience: "Most popular plan",
        planPrice: "₦10,000",
        planSubDuration: "per month",
        subscriptionStatus: "Switch plan",
        featuresInfo: "Everything in our Silver plan plus",
        planFeatures: [
            "Lorem Ipsum",
            "Lorem Ipsum",
            "Lorem Ipsum",
            "Lorem Ipsum"
        ]
    },
    {
        planType: "Platinum",
        targetAudience: "For large businesses",
        planPrice: "₦10,000",
        planSubDuration: "per month",
        subscriptionStatus: "Switch plan",
        featuresInfo: "Everything in our Gold plan plus",
        planFeatures: [
            "Lorem Ipsum",
            "Lorem Ipsum",
            "Lorem Ipsum",
            "Lorem Ipsum"
        ]
    }
]