import sectionImage from "/images/how-it-works.png"

const HowItWorksSection = () => {

    const howItWorksList = [
        {
            title: "Create an Account",
            description: "Sign up in a few clicks and get access to everything you need, no tech skills required."
        },
        {
            title: "Build Your Bot",
            description: "Customize your bot to match your goals. From replies to tone, to remain consistent ."
        },
        {
            title: "Connect Your API",
            description: "Link your systems so your bot can send, receive, and act on real-time data"
        },
        {
            title: "Go Live on Social Media & Chat Platforms",
            description: "Launch your bot on platforms like WhatsApp, Instagram, Facebook, or other chat platforms and start conversations that convert."
        }
    ]

  return (
    <section className='w-full flex justify-center'>
        <main className='max-w-screen-2xl px-5 md:px-8 lg:px-20 py-20 flex flex-col gap-y-16'>
            <div className='flex flex-col items-center gap-y-3'>
                <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-center">How it <span className="text-blue-600">Works</span></h2>
                <p className="mx-auto w-[90%] md:w-[75%] text-center lg:w-[65%] font-light text-xl text-gray-600 leading-relaxed">Here&apos;s how Argentic Ai works. Follow each of the steps well and reach out to us if you encounter any difficulty or issues.</p>
            </div>
            <div className="flex items-center gap-x-16">
                <section>
                    <img src={sectionImage} alt="section image" width={1000} height={1000} />
                </section>
                
                <section className="flex flex-col gap-y-6">
                    {howItWorksList.map((listItem, index) => (
                        <div key={index} className="flex items-center gap-x-16">
                            <div className="flex flex-col items-center gap-y-2 text-blue-600"><p className="font-bold text-2xl">0{index+1}</p><div className="w-[2px] h-[50px] bg-blue-600" /></div>
                            <div key={index} className="flex flex-col gap-y-3">
                                <h4 className="text-2xl font-bold">{listItem.title}</h4>
                                <p>{listItem.description}</p>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </main>
    </section>
  )
}

export default HowItWorksSection