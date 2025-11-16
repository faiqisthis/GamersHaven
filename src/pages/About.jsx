import { Heart, Users, Shield, Zap, Award, Globe } from 'lucide-react';
function About() {
  const stats = [
    { label: 'Active Users', value: '2M+' },
    { label: 'Games Available', value: '10K+' },
    { label: 'Countries', value: '150+' },
    { label: 'Years in Business', value: '8+' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Gaming',
      description: 'We are gamers ourselves, committed to delivering the best gaming experiences to our community.',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Our community is at the heart of everything we do. Your feedback shapes our future.',
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'Your security is our priority. We ensure safe transactions and protect your data.',
    },
    {
      icon: Zap,
      title: 'Instant Delivery',
      description: 'Get your games instantly. No waiting, no hassle. Just pure gaming enjoyment.',
    },
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of Gaming',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    },
    {
      name: 'Emily Watson',
      role: 'Community Manager',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-[#fefae0]">
        <div className="absolute inset-0 opacity-15">
          <img
            src="https://images.unsplash.com/photo-1549507447-2439ff6656a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRybyUyMGFyY2FkZSUyMGdhbWVzfGVufDF8fHx8MTc2MzIyNzQ5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="About Hero"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl text-[#283618] mb-6">
            About GameVault
          </h1>
          <p className="text-xl text-[#606c38] max-w-3xl mx-auto">
            Building the future of digital gaming distribution, one game at a time. 
            We believe every game tells a story and creates lasting memories.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#606c38] border-y-2 border-[#dda15e]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl text-[#dda15e] mb-2">{stat.value}</div>
                <div className="text-[#fefae0]/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-4xl text-[#283618] mb-6">Our Story</h2>
              <p className="text-[#606c38] mb-4 text-lg leading-relaxed">
                GameVault was born from a simple idea: make gaming accessible to everyone, everywhere. 
                What started in a small apartment in 2020 has grown into a global platform serving 
                millions of gamers worldwide.
              </p>
              <p className="text-[#606c38] mb-4 text-lg leading-relaxed">
                We've partnered with over 500 game developers and publishers to bring you the best 
                selection of games, from indie gems to AAA blockbusters. Our mission is to celebrate 
                gaming culture and connect players across the globe.
              </p>
              <p className="text-[#606c38] text-lg leading-relaxed">
                Today, we're proud to be one of the most trusted names in digital game distribution, 
                but we're just getting started. The future of gaming is bright, and we're excited 
                to build it together with you.
              </p>
            </div>
            
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl border-2 border-[#dda15e]">
              <img
                src="https://images.unsplash.com/photo-1635372730136-06b29022281c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb250cm9sbGVyJTIwZXNwb3J0c3xlbnwxfHx8fDE3NjMxNDU0NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Our Story"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-[#fefae0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-[#283618] mb-4">Our Values</h2>
            <p className="text-[#606c38] text-lg">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-white border-2 border-[#dda15e] hover:border-[#bc6c25] transition-colors shadow-lg"
              >
                <div className="w-16 h-16 bg-[#606c38] rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-[#fefae0]" />
                </div>
                <h3 className="text-xl text-[#283618] mb-3">{value.title}</h3>
                <p className="text-[#606c38]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-[#283618] mb-4">Meet the Team</h2>
            <p className="text-[#606c38] text-lg">
              The passionate people behind Legacy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-[#fefae0] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow border-2 border-[#dda15e]"
              >
                <div className="h-64 bg-[#606c38]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl text-[#283618] mb-1">{member.name}</h3>
                  <p className="text-[#606c38]">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#606c38] border-t-2 border-[#dda15e]">
        <div className="container mx-auto px-4 text-center">
          <Award className="w-16 h-16 text-[#dda15e] mx-auto mb-6" />
          <h2 className="text-4xl text-[#fefae0] mb-6">
            Join Our Gaming Legacy
          </h2>
          <p className="text-[#fefae0]/80 text-lg mb-8 max-w-2xl mx-auto">
            Be part of a community that celebrates gaming culture and connects millions of players worldwide.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-4 bg-[#bc6c25] hover:bg-[#dda15e] text-[#fefae0] rounded-lg transition-colors">
              Browse Games
            </button>
            <button className="px-8 py-4 bg-[#fefae0] hover:bg-white text-[#283618] rounded-lg transition-colors border-2 border-[#fefae0]">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;