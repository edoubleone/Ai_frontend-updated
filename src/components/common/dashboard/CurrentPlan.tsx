import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'

interface CurrentPlanProps {
    border?: boolean
}

const CurrentPlan = (border : CurrentPlanProps) => {
  return (
    <Card className={`flex w-full flex-col justify-between flex-shrink-0 border max-w-[434px] gap-y-5 ${border ? "border-[#E2E8F0] rounded-lg" : "border-transparent"}`}>
        <div className="flex items-center justify-between">
        <div>
            <span className="inline-flex gap-2 items-center">
            <h1 className="text-xl font-bold">Gold Plan</h1>
            <Badge className="bg-[#F2F8F4] text-defaultBlue text-xs font-bold shadow-none rounded-xl">
                Monthly
            </Badge>
            </span>
            <p className="text-sm text-[#8B8B8B]">30 days remaining</p>
        </div>

        <p className="text-3xl font-extrabold text-dark">
            ₦10,000<span className="text-base text-[#8B8B8B]">/month</span>
        </p>
        </div>

        <span>
        <p className="text-sm font-semibold text-[#454545]">
            14 of 40 users
        </p>
        <Progress value={20} />
        </span>

        <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
            <Switch />
            <p className="text-sm text-[#454545]">Enable auto renew</p>
        </div>

        <Button
            // wrapperclass="!w-fit"
            variant="ghost"
            className="!text-defaultBlue !p-0"
        >
            Upgrade Plan
        </Button>
        </div>
    </Card>
  )
}

export default CurrentPlan