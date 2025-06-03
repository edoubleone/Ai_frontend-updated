
export type paymentPlan = {
    planType: string;
    targetAudience: string;
    planSubDuration: "per month" | "per year";
    subscriptionStatus: "current plan" | "switch plan";
    planPrice: string;
    featuresInfo: string;
    planFeatures: string[];
}

export const payentPlanData: paymentPlan[] = [
    {
        planType: "Silver",
        targetAudience: "Basic access",
        planPrice: "10,000",
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
        planPrice: "10,000",
        planSubDuration: "per month",
        subscriptionStatus: "switch plan",
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
        planPrice: "10,000",
        planSubDuration: "per month",
        subscriptionStatus: "switch plan",
        featuresInfo: "Everything in our Gold plan plus",
        planFeatures: [
            "Lorem Ipsum",
            "Lorem Ipsum",
            "Lorem Ipsum",
            "Lorem Ipsum"
        ]
    }
]