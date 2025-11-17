import { ArrowRight, Trophy, Shield, Zap } from 'lucide-react';
const Features = () => {
      const features = [
    {
      icon: Trophy,
      title: 'Curated Collection',
      description: 'Hand-picked games from indie gems to AAA blockbusters',
    },
    {
      icon: Shield,
      title: 'Secure & Trusted',
      description: 'Safe transactions and instant digital delivery',
    },
    {
      icon: Zap,
      title: 'Instant Access',
      description: 'Download and play immediately after purchase',
    },
  ];
  return (
  <section className=" lg:p-[64px] p-[20px] bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3  gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-[#fefae0] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-2 border-[#dda15e]"
              >
                <div className="w-16 h-16 bg-[#606c38] rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-[#fefae0]" />
                </div>
                <h3 className="text-2xl text-[#283618] mb-3">{feature.title}</h3>
                <p className="text-[#606c38]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Features