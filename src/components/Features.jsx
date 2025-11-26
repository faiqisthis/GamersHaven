import { Truck,Headphones, Shield, Zap } from 'lucide-react';
const Features = () => {
      const features = [
   {
    icon: Zap,
    title: "Lightning Fast",
    description: "Quick delivery on all orders",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure transactions",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $50",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated customer service",
  },
  ];
  return (
    <div style={{ backgroundColor: 'rgba(254, 250, 224, 0.5)', borderColor: 'rgba(96, 108, 56, 0.2)' }} >

  <section className=" lg:p-[64px] p-[20px] max-w-[1440px] mx-auto" >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(96, 108, 56, 0.1)' }}>
                  <feature.icon className="h-6 w-6" style={{ color: '#606c38' }} />
                </div>
                <div>
                  <h3 className="mb-1" style={{ color: '#283618' }}>{feature.title}</h3>
                  <p className="text-sm" style={{ color: '#606c38' }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
            </div>
  )
}

export default Features